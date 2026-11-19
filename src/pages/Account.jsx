// eslint-disable-next-line no-unused-vars
import React, { useCallback, useEffect, useState } from "react";
import { Alert, Badge, Button, Card, Col, Container, Form, Row, Spinner, Table } from "react-bootstrap";
import { supabase, getBuyerOrderHistory } from "../lib/supabase";

const STATUS = { new: "Нове", confirmed: "Підтверджено", preparing: "Готується", delivering: "Доставляється", completed: "Виконано", cancelled: "Скасовано" };
const VARIANT = { new: "warning", confirmed: "info", preparing: "primary", delivering: "secondary", completed: "success", cancelled: "danger" };
const money = (value) => new Intl.NumberFormat("uk-UA", { style: "currency", currency: "UAH" }).format(Number(value) || 0);
const date = (value) => new Intl.DateTimeFormat("uk-UA", { dateStyle: "short", timeStyle: "short" }).format(new Date(value));

export default function Account() {
  const [session, setSession] = useState(null);
  const [checked, setChecked] = useState(false);
  const [mode, setMode] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    if (!supabase) { setChecked(true); return undefined; }
    let active = true;
    supabase.auth.getSession().then(({ data, error: authError }) => {
      if (!active) return;
      if (authError) setError(authError.message);
      setSession(data.session);
      setChecked(true);
    });
    const { data } = supabase.auth.onAuthStateChange((_event, next) => {
      setSession(next);
      setError("");
    });
    return () => { active = false; data.subscription.unsubscribe(); };
  }, []);

  const refreshOrders = useCallback(async () => {
    if (!session) return;
    setLoading(true); setError("");
    try { setOrders(await getBuyerOrderHistory()); }
    catch (e) { setError(e.message || "Не вдалося завантажити історію замовлень."); }
    finally { setLoading(false); }
  }, [session]);

  useEffect(() => { if (session) refreshOrders(); else setOrders([]); }, [session, refreshOrders]);

  const submit = async (event) => {
    event.preventDefault();
    setLoading(true); setError(""); setNotice("");
    try {
      if (mode === "signup") {
        const { data, error: signupError } = await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: { data: { full_name: name.trim() } },
        });
        if (signupError) throw signupError;
        if (!data.session) setNotice("Реєстрацію створено. Перевірте пошту та підтвердьте email, після чого увійдіть.");
        else setNotice("Обліковий запис покупця створено.");
      } else {
        const { error: loginError } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
        if (loginError) throw loginError;
      }
      setPassword("");
    } catch (e) { setError(e.message || "Не вдалося виконати запит."); }
    finally { setLoading(false); }
  };

  const logout = async () => {
    const { error: logoutError } = await supabase.auth.signOut();
    if (logoutError) setError(logoutError.message);
    else setNotice("Ви вийшли з облікового запису.");
  };

  if (!checked) return <Container className="py-5 text-center"><Spinner animation="border" /><p>Завантаження…</p></Container>;
  if (!supabase) return <Container className="py-5"><Alert variant="danger">Supabase не налаштовано.</Alert></Container>;

  if (!session) return (
    <Container className="py-5">
      <Row className="justify-content-center"><Col xs={12} md={7} lg={5}>
        <Card><Card.Body className="p-4 p-md-5">
          <h1 className="h2 mb-2">Кабінет покупця</h1>
          <p className="text-muted">Увійдіть або створіть обліковий запис, щоб бачити історію замовлень.</p>
          <div className="d-flex gap-2 mb-4">
            <Button variant={mode === "login" ? "dark" : "outline-dark"} onClick={() => { setMode("login"); setError(""); setNotice(""); }}>Вхід</Button>
            <Button variant={mode === "signup" ? "dark" : "outline-dark"} onClick={() => { setMode("signup"); setError(""); setNotice(""); }}>Реєстрація</Button>
          </div>
          {error && <Alert variant="danger">{error}</Alert>}
          {notice && <Alert variant="success">{notice}</Alert>}
          <Form onSubmit={submit}>
            {mode === "signup" && <Form.Group className="mb-3"><Form.Label>Ваше ім’я</Form.Label><Form.Control required minLength={2} value={name} onChange={(e) => setName(e.target.value)} /></Form.Group>}
            <Form.Group className="mb-3"><Form.Label>Email</Form.Label><Form.Control type="email" autoComplete="username" required value={email} onChange={(e) => setEmail(e.target.value)} /></Form.Group>
            <Form.Group className="mb-4"><Form.Label>Пароль</Form.Label><Form.Control type="password" autoComplete={mode === "signup" ? "new-password" : "current-password"} minLength={6} required value={password} onChange={(e) => setPassword(e.target.value)} /></Form.Group>
            <Button type="submit" variant="dark" className="w-100" disabled={loading}>{loading ? "Зачекайте…" : mode === "signup" ? "Створити акаунт" : "Увійти"}</Button>
          </Form>
          <p className="small text-muted mt-3 mb-0">Можна оформлювати замовлення і без реєстрації — кошик та гостьове оформлення залишаються доступними.</p>
        </Card.Body></Card>
      </Col></Row>
    </Container>
  );

  return (
    <Container className="py-5">
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
        <div><h1 className="h2 mb-1">Мої замовлення</h1><p className="text-muted mb-0">{session.user.email} · покупець</p></div>
        <div className="d-flex gap-2"><Button variant="outline-dark" onClick={refreshOrders} disabled={loading}>Оновити</Button><Button variant="dark" onClick={logout}>Вийти</Button></div>
      </div>
      {error && <Alert variant="danger">{error}</Alert>}
      {notice && <Alert variant="success">{notice}</Alert>}
      {loading && orders.length === 0 ? <div className="text-center py-4"><Spinner animation="border" /></div> : orders.length === 0 ? <Alert variant="info">У вашому обліковому записі ще немає замовлень. Наступне замовлення можна оформити з меню — авторизованим покупцям воно автоматично потрапить до історії.</Alert> : (
        <div className="d-grid gap-3">
          {orders.map((order) => <Card key={order.id}>
            <Card.Header className="d-flex flex-wrap justify-content-between align-items-center gap-2">
              <strong>Замовлення №{order.id}</strong><span className="text-muted small">{date(order.created_at)}</span><Badge bg={VARIANT[order.status] || "secondary"}>{STATUS[order.status] || order.status}</Badge>
            </Card.Header>
            <Card.Body>
              <div className="table-responsive"><Table size="sm" className="mb-3">
                <thead><tr><th>Страва</th><th>Кількість</th><th>Сума</th></tr></thead>
                <tbody>{(order.items || []).map((item) => <tr key={item.id}><td>{item.product_title}</td><td>{item.quantity}</td><td>{money(item.line_total)}</td></tr>)}</tbody>
              </Table></div>
              <Row className="g-2">
                <Col md={6}><span className="text-muted small">Адреса доставки</span><div>{order.delivery_address}</div></Col>
                <Col md={6}><span className="text-muted small">Контакт</span><div>{order.customer_name} · {order.customer_phone}</div></Col>
              </Row>
              {order.notes && <p className="small text-muted mt-2 mb-0">Коментар: {order.notes}</p>}
              <div className="text-end mt-3"><strong>Разом: {money(order.total)}</strong></div>
            </Card.Body>
          </Card>)}
        </div>
      )}
    </Container>
  );
}
