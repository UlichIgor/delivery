import PropTypes from "prop-types";
import { FaPlus, FaShoppingCart } from "react-icons/fa";
import formatPrice from "../lib/formatPrice";

function Item({ item, onAdd }) {
  const imageName = typeof item.img === "string" ? item.img.trim() : "";
  const imageSrc = imageName
    ? `${process.env.PUBLIC_URL}/images/${imageName}`
    : null;

  return (
    <article className="item">
      {imageSrc && (
        <img
          className="item__image"
          src={imageSrc}
          alt={item.title || "Страва з меню"}
          loading="lazy"
          decoding="async"
        />
      )}
      <div className="item__content">
        <h2>{item.title}</h2>
        <p>{item.desc || item.description}</p>
        <div className="item__footer">
          <strong>{formatPrice(item.price)}</strong>
          <button
            type="button"
            className="item__btn"
            aria-label={`Додати до кошика: ${item.title}`}
            onClick={() => onAdd(item)}
          >
            <FaPlus aria-hidden="true" />
            <span>До кошика</span>
            <FaShoppingCart aria-hidden="true" />
          </button>
        </div>
      </div>
    </article>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    title: PropTypes.string,
    img: PropTypes.string,
    desc: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  }).isRequired,
  onAdd: PropTypes.func.isRequired,
};

export default Item;
