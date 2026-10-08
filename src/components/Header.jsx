import PropTypes from "prop-types";
import { useState } from "react";
import {
  Button,
  Container,
  Nav,
  NavLink,
  Navbar,
  NavbarBrand,
} from "react-bootstrap";
import Image from "react-bootstrap/Image";
import NavbarToggle from "react-bootstrap/esm/NavbarToggle";
import NavbarCollapse from "react-bootstrap/esm/NavbarCollapse";
import { FaShoppingCart } from "react-icons/fa";

import Order from "./Order";

function Header(props) {
  const [cartOpen, setCartOpen] = useState(false);

  const result = props.orders.reduce(
    (previousValue, currentItem) =>
      previousValue + Number(currentItem.amount || 1) * Number(currentItem.price || 0),
    0
  );

  const footerSummary = (
    <div className="ResultPanel">
      <span>
        Ітого:<span className="value">{new Intl.NumberFormat().format(result)}.грн</span>
      </span>
      <Button className="lightBtn" variant="dark">
        Купити
      </Button>
    </div>
  );

  const EmptyTemplate = (
    <div className="Empty">
      <h6>Кошик порожній</h6>
      <p>Але це ніколи не пізно виправити :)</p>
    </div>
  );

  function handleIncrease(id) {
    props.onIncrease(id, 1);
  }

  function handleDecrease(id, amount) {
    if (amount > 1) {
      props.onDecrease(id, -1);
    }
  }

  return (
    <>
      <Navbar collapseOnSelect expand="md" bg="black" variant="dark">
        <Container fluid className="d-block">
          <NavbarToggle aria-controls="responsive-navbar-nav" />
          <NavbarCollapse id="responsive-navbar-nav">
            <Nav className="container justify-content-between align-items-center">
              <NavbarBrand href="/">
                <Image
                  src="./images/logo.webp"
                  height={118}
                  width={241}
                  className="d-inline-block aligin-center"
                  alt="Logo"
                />
              </NavbarBrand>
              <NavLink href="/about">Про нас</NavLink>
              <NavLink href="/gallery">Зона доставки</NavLink>
              <NavLink href="/blog">Залишити відгук</NavLink>
              <NavLink href="/contact">Контакти</NavLink>
              <NavLink href="tel:+380688744734" className="Phone">
                +38 (068) 874-47-34
              </NavLink>
              <NavLink className="Circle__box">
                <FaShoppingCart
                  onClick={() => setCartOpen((prev) => !prev)}
                  className={`Shop ${cartOpen ? "active" : ""}`}
                />
                <span className="Circle">{props.orders.length}</span>
              </NavLink>
            </Nav>
          </NavbarCollapse>
        </Container>
      </Navbar>

      {cartOpen && (
        <div className="Shop__body">
          {props.orders.length > 0 ? (
            <div>
              {props.orders.map((el) => (
                <Order
                  items={props.orders}
                  increaCount={handleIncrease}
                  decreaCount={handleDecrease}
                  onDelete={props.onDelete}
                  key={el.id}
                  item={el}
                />
              ))}
            </div>
          ) : (
            EmptyTemplate
          )}
          {!!props.orders.length && footerSummary}
        </div>
      )}
    </>
  );
}

Header.propTypes = {
  orders: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    })
  ).isRequired,
  onDelete: PropTypes.func.isRequired,
  onIncrease: PropTypes.func.isRequired,
  onDecrease: PropTypes.func.isRequired,
};

export default Header;