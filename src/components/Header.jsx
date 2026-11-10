import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Button,
  Container,
  Nav,
  NavLink,
  Navbar,
} from "react-bootstrap";
import Image from "react-bootstrap/Image";
import { FaShoppingCart } from "react-icons/fa";

import Order from "./Order";

function Header({ orders, onDelete, onChangeAmount }) {
  const [cartOpen, setCartOpen] = useState(false);
  const [menuExpanded, setMenuExpanded] = useState(false);

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

  const Footer = (
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
};

export default Header;
