type JsonRecord = Record<string, unknown>;

type OrderRow = {
  id: number;
  customer_id: number;
  delivery_address: string;
  notes: string;
  total: number | string;
  created_at: string;
};

type CustomerRow = {
  name: string;
  phone: string;
};

type OrderItemRow = {
  product_title: string;
  quantity: number;
  line_total: number | string;
};

function isRecord(value: unknown): value is JsonRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function jsonResponse(status: number, body: JsonRecord): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

function escapeHtml(value: unknown): string {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function formatPrice(value: number | string): string {
  const amount = Number(value);
  if (!Number.isFinite(amount)) throw new Error("Invalid amount in order.");

  return new Intl.NumberFormat("uk-UA", {
    style: "currency",
    currency: "UAH",
    maximumFractionDigits: 2,
  }).format(amount);
}

async function getRows<T>(
  baseUrl: string,
  serviceRoleKey: string,
  table: string,
  select: string,
  filters: Record<string, string>,
): Promise<T[]> {
  const url = new URL(`${baseUrl.replace(/\/+$/, "")}/rest/v1/${table}`);
  url.searchParams.set("select", select);
  for (const [key, value] of Object.entries(filters)) {
    url.searchParams.set(key, value);
  }

  const response = await fetch(url, {
    headers: {
      apikey: serviceRoleKey,
      authorization: `Bearer ${serviceRoleKey}`,
    },
    signal: AbortSignal.timeout(10_000),
  });

  if (!response.ok) {
    console.error("Supabase lookup failed:", table, response.status);
    throw new Error("Could not load the order.");
  }

  const data: unknown = await response.json();
  if (!Array.isArray(data) || data.some((row) => !isRecord(row))) {
    throw new Error("Supabase returned an invalid response.");
  }
  return data as T[];
}

Deno.serve(async (request) => {
  if (request.method !== "POST") {
    return jsonResponse(405, { error: "Method not allowed." });
  }

  const webhookSecret = Deno.env.get("ORDER_WEBHOOK_SECRET")?.trim();
  if (!webhookSecret) {
    console.error("ORDER_WEBHOOK_SECRET is not configured.");
    return jsonResponse(500, { error: "Notification service is not configured." });
  }
  if (request.headers.get("x-order-webhook-secret") !== webhookSecret) {
    return jsonResponse(401, { error: "Unauthorized." });
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return jsonResponse(400, { error: "Invalid webhook payload." });
  }

  if (
    !isRecord(payload) ||
    payload.type !== "INSERT" ||
    payload.schema !== "public" ||
    payload.table !== "orders" ||
    !isRecord(payload.record)
  ) {
    return jsonResponse(400, { error: "Unsupported webhook event." });
  }

  const orderId = Number(payload.record.id);
  if (!Number.isSafeInteger(orderId) || orderId < 1) {
    return jsonResponse(400, { error: "Invalid order ID." });
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL")?.trim();
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")?.trim();
  const botToken = Deno.env.get("TELEGRAM_BOT_TOKEN")?.trim();
  const chatId = Deno.env.get("TELEGRAM_CHAT_ID")?.trim();
  if (!supabaseUrl || !serviceRoleKey || !botToken || !chatId) {
    console.error("Required Supabase or Telegram secrets are missing.");
    return jsonResponse(500, { error: "Notification service is not configured." });
  }

  try {
    const orders = await getRows<OrderRow>(
      supabaseUrl,
      serviceRoleKey,
      "orders",
      "id,customer_id,delivery_address,notes,total,created_at",
      { id: `eq.${orderId}` },
    );
    const order = orders[0];
    if (!order) return jsonResponse(404, { error: "Order not found." });

    const [customers, items] = await Promise.all([
      getRows<CustomerRow>(
        supabaseUrl,
        serviceRoleKey,
        "customers",
        "name,phone",
        { id: `eq.${order.customer_id}` },
      ),
      getRows<OrderItemRow>(
        supabaseUrl,
        serviceRoleKey,
        "order_items",
        "product_title,quantity,line_total",
        { order_id: `eq.${order.id}`, order: "id.asc" },
      ),
    ]);

    const customer = customers[0];
    if (!customer || items.length === 0) {
      throw new Error("Order details are incomplete.");
    }

    const itemLines = items.map((item) => {
      if (!Number.isInteger(item.quantity) || item.quantity < 1) {
        throw new Error("Invalid item quantity.");
      }
      return `• ${escapeHtml(item.product_title)} × ${item.quantity} — ${formatPrice(item.line_total)}`;
    });

    const notes = order.notes.trim();
    const message = [
      `🍣 <b>Нове замовлення №${order.id}</b>`,
      `👤 <b>Клієнт:</b> ${escapeHtml(customer.name)}`,
      `📞 <b>Телефон:</b> ${escapeHtml(customer.phone)}`,
      `📍 <b>Адреса:</b> ${escapeHtml(order.delivery_address)}`,
      ...(notes ? [`📝 <b>Коментар:</b> ${escapeHtml(notes)}`] : []),
      "",
      "<b>Склад замовлення:</b>",
      ...itemLines,
      "",
      `💰 <b>Разом:</b> ${formatPrice(order.total)}`,
      `🕒 ${escapeHtml(new Date(order.created_at).toLocaleString("uk-UA", { timeZone: "Europe/Kyiv" }))}`,
    ].join("\n");

    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: "HTML",
          disable_web_page_preview: true,
        }),
        signal: AbortSignal.timeout(10_000),
      },
    );
    const telegramResult: unknown = await telegramResponse.json().catch(() => null);
    if (!telegramResponse.ok || !isRecord(telegramResult) || telegramResult.ok !== true) {
      console.error("Telegram rejected the order notification:", telegramResponse.status);
      return jsonResponse(502, { error: "Telegram did not accept the notification." });
    }

    return jsonResponse(200, { ok: true });
  } catch (error) {
    console.error(
      "Order notification failed:",
      error instanceof Error ? error.message : "Unknown error.",
    );
    return jsonResponse(500, { error: "Could not send the order notification." });
  }
});