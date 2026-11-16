import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export async function getProducts() {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from("products")
    .select("id,title,description,category,price,image")
    .eq("is_active", true)
    .order("id");
  if (error) throw error;
  return data.map((product) => ({
    ...product,
    desc: product.description,
    img: product.image,
    amount: 1,
    price: String(product.price),
  }));
}

export async function createReview({ name, rating, message }) {
  if (!supabase) throw new Error("Supabase ще не налаштовано.");
  const { error } = await supabase.from("reviews").insert({
    customer_name: name.trim() || "Гість",
    rating,
    message: message.trim(),
  });
  if (error) throw error;
}

export async function createOrder({ name, phone, address, notes, items }) {
  if (!supabase) throw new Error("Supabase ще не налаштовано.");
  const payload = items.map((item) => ({
    product_id: Number(item.id),
    quantity: Number(item.amount),
  }));
  const { data, error } = await supabase.rpc("submit_order", {
    p_name: name,
    p_phone: phone,
    p_address: address,
    p_notes: notes || "",
    p_items: payload,
  });
  if (error) throw error;
  return data;
}
