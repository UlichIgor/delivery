import PropTypes from "prop-types";
import Image from "react-bootstrap/Image";
import { FaTrash } from "react-icons/fa";
import formatPrice from "../lib/formatPrice";

function Order({ item, onDelete, onChangeAmount }) {
  const imageName = typeof item.img === "string" ? item.img.trim() : "";
  const imageSrc = imageName
    ? `${process.env.PUBLIC_URL}/images/${imageName}`
    : null;

  return (
    <article className="cart-item">
      {imageSrc && (
        <Image
          className="cart-item__image"
          src={imageSrc}
          alt={item.title || "Страва з меню"}
        />
      )}
      <div className="cart-item__details">
        <h3>{item.title}</h3>
        <span>{formatPrice(item.price)} за шт.</span>
      </div>
      <div className="cart-item__actions">
        <div className="shopCounter" aria-label={`Кількість: ${item.amount}`}>
          <button
            type="button"
            className="shopCounter__button"
            aria-label={`Зменшити кількість: ${item.title}`}
            disabled={Number(item.amount) <= 1}
            onClick={() => onChangeAmount(item.id, -1)}
          >
            −
          </button>
          <output className="shopCounter__value">{item.amount}</output>
          <button
            type="button"
            className="shopCounter__button"
            aria-label={`Збільшити кількість: ${item.title}`}
            onClick={() => onChangeAmount(item.id, 1)}
          >
            +
          </button>
        </div>
        <strong className="cart-item__total">
          {formatPrice(Number(item.price) * Number(item.amount))}
        </strong>
        <button
          type="button"
          className="cart-item__remove"
          aria-label={`Видалити з кошика: ${item.title}`}
          onClick={() => onDelete(item.id)}
        >
          <FaTrash aria-hidden="true" />
        </button>
      </div>
    </article>
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
