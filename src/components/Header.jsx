import { useState } from "react";
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
import formatPrice from "../lib/formatPrice";

function getPositionLabel(count) {
  const lastDigit = count % 10;
  const lastTwoDigits = count % 100;

  if (lastDigit === 1 && lastTwoDigits !== 11) return "позиція";
  if ([2, 3, 4].includes(lastDigit) && (lastTwoDigits < 12 || lastTwoDigits > 14)) {
    return "позиції";
  }
  return "позицій";
}

function Header({ orders, onDelete, onChangeAmount, onClear }) {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartClosing, setCartClosing] = useState(false);
  const [menuExpanded, setMenuExpanded] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [customer, setCustomer] = useState({ name: "", phone: "", address: "", notes: "" });
  const [checkoutError, setCheckoutError] = useState("");
  const [checkoutSaving, setCheckoutSaving] = useState(false);
  const [orderCreated, setOrderCreated] = useState(null);

  const cartItemCount = orders.reduce(
    (count, item) => count + Number(item.amount),
    0
  );
  const result = orders.reduce(
    (previousValue, currentItem) =>
      previousValue + Number(currentItem.amount) * Number(currentItem.price),
    0
  );

  const handleDeleteOrder = (id) => {
    if (orders.length === 1) setCartClosing(true);
    onDelete(id);
  };

  const finishCartClosing = (event) => {
    if (event.target !== event.currentTarget || !cartClosing) return;
    setCartOpen(false);
    setCartClosing(false);
  };

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

  const cartSummary = (
    <div className="ResultPanel">
      <div className="ResultPanel__total">
        <span>Разом</span>
        <strong className="value">{formatPrice(result)}</strong>
      </div>
      <Button
        className="lightBtn"
        variant="dark"
        disabled={orders.length === 0 || checkoutSaving || cartClosing}
        onClick={() => {
          setCheckoutError("");
          setCheckoutOpen(true);
        }}
      >
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
              alt="Feast Sushi"
            />
          </Navbar.Brand>
          <div className="site-navbar__controls">
            <Button
              type="button"
              variant="link"
              className="Circle__box"
              aria-label={
                cartItemCount > 0
                  ? `Відкрити кошик, товарів: ${cartItemCount}`
                  : "Відкрити порожній кошик"
              }
              aria-expanded={cartOpen}
              onClick={() => {
                setCartClosing(false);
                setCartOpen((previousValue) => !previousValue);
                setMenuExpanded(false);
              }}
            >
              <FaShoppingCart
                className={`Shop ${cartOpen ? "active" : ""}`}
                aria-hidden="true"
              />
              <span className="Circle" aria-hidden="true">{cartItemCount}</span>
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
      <Modal
        show={checkoutOpen}
        onHide={() => setCheckoutOpen(false)}
        centered
        className="checkout-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Оформлення замовлення</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            У кошику {orders.length} {getPositionLabel(orders.length)} на суму{" "}
            {formatPrice(result)}.
          </p>
          <Form onSubmit={submitCheckout}>
            <Form.Group className="mb-3">
              <Form.Label>Ваше ім’я</Form.Label>
              <Form.Control
                required
                minLength={2}
                autoComplete="name"
                value={customer.name}
                onChange={(event) => setCustomer({ ...customer, name: event.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Телефон</Form.Label>
              <Form.Control
                required
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                minLength={10}
                maxLength={24}
                placeholder="+380..."
                value={customer.phone}
                onChange={(event) => setCustomer({ ...customer, phone: event.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Адреса доставки</Form.Label>
              <Form.Control
                required
                minLength={5}
                autoComplete="street-address"
                value={customer.address}
                onChange={(event) => setCustomer({ ...customer, address: event.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Коментар до замовлення</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                maxLength={500}
                value={customer.notes}
                onChange={(event) => setCustomer({ ...customer, notes: event.target.value })}
              />
            </Form.Group>
            {checkoutError && <div className="alert alert-danger" role="alert">{checkoutError}</div>}
            <Button type="submit" variant="dark" disabled={checkoutSaving || !isSupabaseConfigured}>{checkoutSaving ? "Зберігаємо..." : "Підтвердити замовлення"}</Button>
            {!isSupabaseConfigured && <p className="text-muted small mt-2 mb-0">Потрібно додати ключі Supabase та виконати SQL-скрипт налаштування бази.</p>}
          </Form>
        </Modal.Body>
      </Modal>
      {cartOpen && (
        <section
          className={`Shop__body${cartClosing ? " Shop__body--closing" : ""}`}
          aria-label="Кошик"
          aria-hidden={cartClosing}
          onAnimationEnd={finishCartClosing}
        >
          {orders.length > 0 ? (
            <div className="Shop__items">
            {orders.map((item) => (
              <Order
                key={item.id}
                item={item}
                onDelete={handleDeleteOrder}
                onChangeAmount={onChangeAmount}
              />
            ))}
            </div>
          ) : (
            <div className="CartEmpty">
              <h2>Кошик поки порожній</h2>
              <p>Додайте страви з меню — і вони з’являться тут.</p>
            </div>
          )}
          {orders.length > 0 && (
            <Button
              as={Link}
              to="/"
              variant="outline-light"
              className="Shop__menu-link"
              onClick={() => {
                setCartOpen(false);
                setMenuExpanded(false);
              }}
            >
              Повернутися до вибору страв
            </Button>
          )}
          {cartSummary}
        </section>
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
