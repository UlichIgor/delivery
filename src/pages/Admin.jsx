/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect, useState } from "react";
import { Alert, Badge, Button, Card, Col, Container, Form, Row, Spinner, Table } from "react-bootstrap";
import { supabase, getAdminOrders, updateAdminOrderStatus, deleteAdminOrder } from "../lib/supabase";

const STATUSES = {
  new: "Нове", confirmed: "Підтверджено", preparing: "Готується",
  delivering: "Доставляється", completed: "Виконано", cancelled: "Скасовано",
};
const VARIANTS = { new: "warning", confirmed: "info", preparing: "primary", delivering: "secondary", completed: "success", cancelled: "danger" };
const money = (value) => new Intl.NumberFormat("uk-UA", { style: "currency", currency: "UAH" }).format(Number(value) || 0);
const date = (value) => new Intl.DateTimeFormat("uk-UA", { dateStyle: "short", timeStyle: "short" }).format(new Date(value));

export default function Admin() {
  const [session, setSession] = useState(null);
  const [checked, setChecked] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [savingId, setSavingId] = useState(null);
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
      setNotice("");
    });
    return () => { active = false; data.subscription.unsubscribe(); };
  }, []);

  const isAdmin = session?.user?.app_metadata?.role === "admin";
  const refresh = useCallback(async () => {
    if (!isAdmin) return;
    setLoading(true); setError("");
    try { setOrders(await getAdminOrders()); }
    catch (e) { setError(e.message || "Не вдалося завантажити замовлення."); }
    finally { setLoading(false); }
  }, [isAdmin]);

  useEffect(() => { if (isAdmin) refresh(); else setOrders([]); }, [isAdmin, refresh]);

  const login = async (event) => {
    event.preventDefault();
    setLoading(true); setError("");
    const { error: loginError } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    if (loginError) setError(loginError.message);
    setPassword(""); setLoading(false);
  };
  const logout = async () => {
    const { error: logoutError } = await supabase.auth.signOut();
    if (logoutError) setError(logoutError.message);
  };
  const removeOrder = async (order) => {
    if (!window.confirm("Видалити замовлення №" + order.id + "? Цю дію не можна скасувати.")) return;
    setSavingId(order.id); setError(""); setNotice("");
    try {
      await deleteAdminOrder(order.id);
      setOrders((current) => current.filter((item) => item.id !== order.id));
      setNotice("Замовлення №" + order.id + " видалено.");
    } catch (e) { setError(e.message || "Не вдалося видалити замовлення."); }
    finally { setSavingId(null); }
  };

  const changeStatus = async (id, status) => {
    setSavingId(id); setError(""); setNotice("");
    try {
      await updateAdminOrderStatus(id, status);
      setOrders((current) => current.map((order) => order.id === id ? { ...order, status } : order));
      setNotice("Статус замовлення оновлено.");
    } catch (e) { setError(e.message || "Не вдалося оновити статус."); }
    finally { setSavingId(null); }
  };

  if (!checked) return <Container className="admin-page py-5 text-center"><Spinner animation="border" /><p>Перевіряємо авторизацію…</p></Container>;
  if (!supabase) return <Container className="admin-page py-5"><Alert variant="danger">Supabase не налаштовано. Перевірте змінні середовища.</Alert></Container>;

  if (!session) return (
    <Container className="admin-page py-5">
      <Row className="justify-content-center"><Col xs={12} md={7} lg={5}>
        <Card className="admin-login-card"><Card.Body className="p-4 p-md-5">
          <p className="admin-eyebrow">FEAST SUSHI</p><h1 className="h2">Панель адміністратора</h1>
          <p className="text-muted mb-4">Увійдіть, щоб керувати замовленнями.</p>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={login}>
            <Form.Group className="mb-3"><Form.Label>Email</Form.Label><Form.Control type="email" autoComplete="username" required value={email} onChange={(e) => setEmail(e.target.value)} /></Form.Group>
            <Form.Group className="mb-4"><Form.Label>Пароль</Form.Label><Form.Control type="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} /></Form.Group>
            <Button type="submit" variant="dark" className="w-100" disabled={loading}>{loading ? "Входимо…" : "Увійти"}</Button>
          </Form>
        </Card.Body></Card>
      </Col></Row>
    </Container>
  );

  if (!isAdmin) return <Container className="admin-page py-5"><Alert variant="warning">У цього облікового запису немає прав адміністратора.</Alert><Button variant="outline-light" onClick={logout}>Вийти</Button></Container>;

  return (
    <Container fluid className="admin-page py-4 py-md-5">
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
        <div><p className="admin-eyebrow mb-1">FEAST SUSHI</p><h1 className="h2 mb-1">Керування замовленнями</h1><p className="text-muted mb-0">{session.user.email}</p></div>
        <div className="d-flex gap-2"><Button variant="outline-light" onClick={refresh} disabled={loading}>{loading ? "Оновлення…" : "Оновити"}</Button><Button variant="dark" onClick={logout}>Вийти</Button></div>
      </div>
      {error && <Alert variant="danger">{error}</Alert>}{notice && <Alert variant="success">{notice}</Alert>}
      <Row className="g-3 mb-4">
        <Col xs={6} lg={3}><Card className="admin-stat"><Card.Body><span>Замовлень</span><strong>{orders.length}</strong></Card.Body></Card></Col>
        <Col xs={6} lg={3}><Card className="admin-stat"><Card.Body><span>Нових</span><strong>{orders.filter((o) => o.status === "new").length}</strong></Card.Body></Card></Col>
      </Row>
      <Card className="admin-orders-card"><Card.Header><strong>Останні замовлення</strong><span className="text-muted small float-end">До 100 записів</span></Card.Header><Card.Body className="p-0">
        {loading && orders.length === 0 ? <div className="p-4 text-center"><Spinner animation="border" /></div> : orders.length === 0 ? <p className="p-4 mb-0 text-muted">Замовлень поки немає.</p> : (
          <div className="table-responsive"><Table hover className="admin-orders-table mb-0">
            <thead><tr><th>№ / Дата</th><th>Клієнт</th><th>Замовлення</th><th>Доставка</th><th>Сума</th><th>Статус</th></tr></thead>
            <tbody>{orders.map((order) => <tr key={order.id}>
              <td><strong>#{order.id}</strong><div className="small text-muted">{date(order.created_at)}</div></td>
              <td>{order.customer?.name || "—"}<div><a href={"tel:" + (order.customer?.phone || "")}>{order.customer?.phone || "—"}</a></div></td>
              <td><ul className="admin-item-list">{(order.items || []).map((item) => <li key={item.id}>{item.product_title} × {item.quantity} <span>{money(item.line_total)}</span></li>)}</ul></td>
              <td>{order.delivery_address}<div className="small text-muted">{order.notes}</div></td>
              <td><strong>{money(order.total)}</strong></td>
              <td><Badge bg={VARIANTS[order.status] || "secondary"} className="mb-2">{STATUSES[order.status] || order.status}</Badge><Form.Select size="sm" className="mb-2" aria-label={"Статус замовлення " + order.id} value={order.status} disabled={savingId === order.id} onChange={(e) => changeStatus(order.id, e.target.value)}>{Object.entries(STATUSES).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</Form.Select><Button size="sm" variant="outline-danger" disabled={savingId === order.id} onClick={() => removeOrder(order)}>Видалити</Button></td>
            </tr>)}</tbody>
          </Table></div>
        )}
      </Card.Body></Card>
    </Container>
  );
}
