import PropTypes from "prop-types";
import Image from "react-bootstrap/Image";
import { FaTrash } from "react-icons/fa";

function Order({ item, onDelete, onChangeAmount }) {
  const imageSrc = `${process.env.PUBLIC_URL}/images/${item.img.trim()}`;

  return (
    <div className="Item">
      <Image src={imageSrc} style={{ width: "80px", height: "120px" }} alt="react logo" />
      <h4>{item.title}</h4>
      <div className="shopCounter">
        <button
          type="button"
          className="minus"
          id="minus"
          onClick={() => onChangeAmount(item.id, -1)}
        >
          -
        </button>
        <div className="counter">{item.amount}</div>
        <button
          type="button"
          className="plus"
          id="plus"
          onClick={() => onChangeAmount(item.id, 1)}
        >
          +
        </button>
      </div>
      <b>{new Intl.NumberFormat().format(Number(item.price) * Number(item.amount))}.грн</b>
      <FaTrash className="Delete" onClick={() => onDelete(item.id)} />
    </div>
  );
}

Order.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    title: PropTypes.string,
    img: PropTypes.string,
    amount: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    price: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  onChangeAmount: PropTypes.func.isRequired,
};

export default Order;
