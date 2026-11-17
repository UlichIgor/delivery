import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Button,
  Container,
  Nav,
  NavLink,
  Navbar,
  Modal,
  Form,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import Image from "react-bootstrap/Image";
import { FaShoppingCart } from "react-icons/fa";

import Order from "./Order";
import { createOrder, isSupabaseConfigured } from "../lib/supabase";

function Header({ orders, onDelete, onChangeAmount, onClear }) {
  const [cartOpen, setCartOpen] = useState(false);
  const [menuExpanded, setMenuExpanded] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [customer, setCustomer] = useState({ name: "", phone: "", address: "", notes: "" });
  const [checkoutError, setCheckoutError] = useState("");
  const [checkoutSaving, setCheckoutSaving] = useState(false);
  const [orderCreated, setOrderCreated] = useState(null);

  useEffect(() => {
    if (orders.length === 0) {
      setCartOpen(false);
    }
  }, [orders.length]);

  const result = orders.reduce(
    (previousValue, currentItem) =>
      previousValue + Number(currentItem.amount) * Number(currentItem.price),
    0
  );

  const submitCheckout = async (event) => {
    event.preventDefault();
    setCheckoutError("");
    setCheckoutSaving(true);
    try {
      if (!isSupabaseConfigured) throw new Error("База даних ще не підключена. Налаштуйте Supabase, щоб оформлювати замовлення на сайті.");
      const orderId = await createOrder({ ...customer, items: orders });
      setOrderCreated(orderId);
      setCheckoutOpen(false);
      setCartOpen(false);
      onClear();
      setCustomer({ name: "", phone: "", address: "", notes: "" });
    } catch (error) {
      setCheckoutError(error.message || "Не вдалося оформити замовлення.");
    } finally {
      setCheckoutSaving(false);
    }
  };

  const Footer = (
    <div className="ResultPanel">
      <span>
        Ітого:<span className="value">{new Intl.NumberFormat().format(result)}.грн</span>
      </span>
      <Button className="lightBtn " variant="dark" onClick={() => { setCheckoutError(""); setCheckoutOpen(true); }}>
        Оформити замовлення
      </Button>
    </div>
  );

  return (
    <>
      <Navbar
        expanded={menuExpanded}
        onToggle={setMenuExpanded}
        collapseOnSelect
        expand="md"
        bg="black"
        variant="dark"
        className="site-navbar"
      >
        <Container fluid className="site-navbar__container">
          <Navbar.Brand href="#/" className="site-navbar__brand">
            <Image
              src={`${process.env.PUBLIC_URL}/images/logo.webp`}
              height={118}
              width={241}
              className="d-inline-block align-center"
              alt="Logo"
            />
          </Navbar.Brand>
          <div className="site-navbar__controls">
            <Button
              type="button"
              variant="link"
              className="Circle__box"
              aria-label={
                orders.length > 0
                  ? `Відкрити кошик, товарів: ${orders.length}`
                  : "Кошик порожній"
              }
              aria-expanded={cartOpen && orders.length > 0}
              disabled={orders.length === 0}
              onClick={() => {
                setCartOpen((previousValue) =>
                  orders.length > 0 ? !previousValue : false
                );
                setMenuExpanded(false);
              }}
            >
              <FaShoppingCart
                className={`Shop ${cartOpen ? "active" : ""}`}
                aria-hidden="true"
              />
              <span className="Circle">{orders.length}</span>
            </Button>
            <Navbar.Toggle
              aria-controls="responsive-navbar-nav"
              aria-label={menuExpanded ? "Закрити меню" : "Відкрити меню"}
              onClick={() => setCartOpen(false)}
            />
          </div>
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="site-navbar__links">
              <NavLink href="#/about">Про нас</NavLink>
              <NavLink href="#/gallery">Зона доставки</NavLink>
              <NavLink href="#/blog">Залишити відгук</NavLink>
              <NavLink href="#/contact">Контакти</NavLink>
              <NavLink href="tel:+380688744734" className="Phone">
                +38 (068) 874-47-34
              </NavLink>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {orderCreated && (
        <div className="alert alert-success mx-auto" role="status" style={{ maxWidth: 520 }}>Замовлення №{orderCreated} збережено. Менеджер зв’яжеться з вами для підтвердження.</div>
      )}
      <Modal show={checkoutOpen} onHide={() => setCheckoutOpen(false)} centered>
        <Modal.Header closeButton><Modal.Title>Оформлення замовлення</Modal.Title></Modal.Header>
        <Modal.Body>
          <p>У кошику {orders.length} позицій на суму {new Intl.NumberFormat("uk-UA").format(result)} грн.</p>
          <Form onSubmit={submitCheckout}>
            <Form.Group className="mb-3"><Form.Label>Ваше ім’я</Form.Label><Form.Control required minLength={2} value={customer.name} onChange={(e) => setCustomer({ ...customer, name: e.target.value })} /></Form.Group>
            <Form.Group className="mb-3"><Form.Label>Телефон</Form.Label><Form.Control required type="tel" minLength={10} placeholder="+380..." value={customer.phone} onChange={(e) => setCustomer({ ...customer, phone: e.target.value })} /></Form.Group>
            <Form.Group className="mb-3"><Form.Label>Адреса доставки</Form.Label><Form.Control required minLength={5} value={customer.address} onChange={(e) => setCustomer({ ...customer, address: e.target.value })} /></Form.Group>
            <Form.Group className="mb-3"><Form.Label>Коментар до замовлення</Form.Label><Form.Control as="textarea" rows={2} value={customer.notes} onChange={(e) => setCustomer({ ...customer, notes: e.target.value })} /></Form.Group>
            {checkoutError && <div className="alert alert-danger" role="alert">{checkoutError}</div>}
            <Button type="submit" variant="dark" disabled={checkoutSaving || !isSupabaseConfigured}>{checkoutSaving ? "Зберігаємо..." : "Підтвердити замовлення"}</Button>
            {!isSupabaseConfigured && <p className="text-muted small mt-2 mb-0">Потрібно додати ключі Supabase та виконати SQL-скрипт налаштування бази.</p>}
          </Form>
        </Modal.Body>
      </Modal>
      {cartOpen && orders.length > 0 && (
        <div className="Shop__body">
          <div>
            {orders.map((item) => (
              <Order
                key={item.id}
                item={item}
                onDelete={onDelete}
                onChangeAmount={onChangeAmount}
              />
            ))}
          </div>
          <Button
            as={Link}
            to="/"
            variant="outline-light"
            className="w-100 mb-2"
            onClick={() => {
              setCartOpen(false);
              setMenuExpanded(false);
            }}
          >
            Повернутися до вибору страв
          </Button>
          {Footer}
        </div>
      )}
    </>
  );
}

Header.propTypes = {
  orders: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
      amount: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      price: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      title: PropTypes.string,
      img: PropTypes.string,
    })
  ).isRequired,
  onDelete: PropTypes.func.isRequired,
  onChangeAmount: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
};

export default Header;
