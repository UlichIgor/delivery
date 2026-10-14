import { useState } from "react";
import PropTypes from "prop-types";
import {
  Button,
  Container,
  Nav,
  NavLink,
  Navbar,
  NavbarBrand,
} from "react-bootstrap";
import Image from "react-bootstrap/Image";
import { FaShoppingCart } from "react-icons/fa";

import Order from "./Order";

function Header({ orders, onDelete, onChangeAmount }) {
  const [cartOpen, setCartOpen] = useState(false);

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

  const EmptyTemplate = (
    <div className="Empty">
      <h6>Кошик порожній</h6>
      <p>Але це ніколи не пізно виправити :)</p>
    </div>
  );

  return (
    <>
      <Navbar collapseOnSelect expand="md" bg="black" variant="dark">
        <Container fluid className="d-block">
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
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
                  onClick={() => setCartOpen((previousValue) => !previousValue)}
                  className={`Shop ${cartOpen && "active"}`}
                />
                <span className="Circle">{orders.length}</span>
              </NavLink>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {cartOpen && (
        <div className="Shop__body">
          {orders.length > 0 ? (
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
          ) : (
            EmptyTemplate
          )}
          {!!orders.length && Footer}
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