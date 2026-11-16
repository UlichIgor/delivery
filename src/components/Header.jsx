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

  const submitCheckout = async (event) => {\n    event.preventDefault();\n    setCheckoutError("");\n    setCheckoutSaving(true);\n    try {\n      if (!isSupabaseConfigured) throw new Error("База даних ще не підключена. Налаштуйте Supabase, щоб оформлювати замовлення на сайті.");\n      const orderId = await createOrder({ ...customer, items: orders });\n      setOrderCreated(orderId);\n      setCheckoutOpen(false);\n      setCartOpen(false);\n      onClear();\n      setCustomer({ name: "", phone: "", address: "", notes: "" });\n    } catch (error) {\n      setCheckoutError(error.message || "Не вдалося оформити замовлення.");\n    } finally {\n      setCheckoutSaving(false);\n    }\n  };\n\n  const Footer = (
    <div className="ResultPanel">
      <span>
        Ітого:<span className="value">{new Intl.NumberFormat().format(result)}.грн</span>
      </span>
      <Button className="lightBtn " variant="dark">
        Купити
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
      {orderCreated && (\n        <div className="alert alert-success mx-auto" role="status" style={{ maxWidth: 520 }}>Замовлення №{orderCreated} збережено. Менеджер зв’яжеться з вами для підтвердження.</div>\n      )}\n      <Modal show={checkoutOpen} onHide={() => setCheckoutOpen(false)} centered>\n        <Modal.Header closeButton><Modal.Title>Оформлення замовлення</Modal.Title></Modal.Header>\n        <Modal.Body>\n          <p>У кошику {orders.length} позицій на суму {new Intl.NumberFormat("uk-UA").format(result)} грн.</p>\n          <Form onSubmit={submitCheckout}>\n            <Form.Group className="mb-3"><Form.Label>Ваше ім’я</Form.Label><Form.Control required minLength={2} value={customer.name} onChange={(e) => setCustomer({ ...customer, name: e.target.value })} /></Form.Group>\n            <Form.Group className="mb-3"><Form.Label>Телефон</Form.Label><Form.Control required type="tel" minLength={10} placeholder="+380..." value={customer.phone} onChange={(e) => setCustomer({ ...customer, phone: e.target.value })} /></Form.Group>\n            <Form.Group className="mb-3"><Form.Label>Адреса доставки</Form.Label><Form.Control required minLength={5} value={customer.address} onChange={(e) => setCustomer({ ...customer, address: e.target.value })} /></Form.Group>\n            <Form.Group className="mb-3"><Form.Label>Коментар до замовлення</Form.Label><Form.Control as="textarea" rows={2} value={customer.notes} onChange={(e) => setCustomer({ ...customer, notes: e.target.value })} /></Form.Group>\n            {checkoutError && <div className="alert alert-danger" role="alert">{checkoutError}</div>}\n            <Button type="submit" variant="dark" disabled={checkoutSaving || !isSupabaseConfigured}>{checkoutSaving ? "Зберігаємо..." : "Підтвердити замовлення"}</Button>\n            {!isSupabaseConfigured && <p className="text-muted small mt-2 mb-0">Потрібно додати ключі Supabase та виконати SQL-скрипт налаштування бази.</p>}\n          </Form>\n        </Modal.Body>\n      </Modal>\n      {cartOpen && orders.length > 0 && (
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
  onChangeAmount: PropTypes.func.isRequired,\n  onClear: PropTypes.func.isRequired,
};

export default Header;
