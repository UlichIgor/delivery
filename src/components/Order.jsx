import PropTypes from "prop-types";
import Image from "react-bootstrap/Image";
import { FaTrash } from "react-icons/fa";

function Order(props) {
  const itemPrice = Number(props.item.price || 0);
  const itemAmount = Number(props.item.amount || 1);

  return (
    <div className="Item">
      <Image
        src={"../images/" + (props.item.img || "").trim()}
        style={{ width: "80px", height: "120px" }}
        alt={props.item.title || "product"}
      />
      <h4>{props.item.title}</h4>
      <div className="shopCounter">
        <button
          className="minus"
          id="minus"
          onClick={() => props.decreaCount(props.item.id, itemAmount)}
        >
          -
        </button>
        <div className="counter">{itemAmount}</div>
        <button
          className="plus"
          id="plus"
          onClick={() => props.increaCount(props.item.id)}
        >
          +
        </button>
      </div>
      <b>{new Intl.NumberFormat().format(itemPrice * itemAmount)}.грн</b>
      <FaTrash className="Delete" onClick={() => props.onDelete(props.item.id)} />
    </div>
  );
}

Order.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    img: PropTypes.string,
    title: PropTypes.string,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }).isRequired,
  increaCount: PropTypes.func.isRequired,
  decreaCount: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default Order;