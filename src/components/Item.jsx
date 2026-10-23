import PropTypes from "prop-types";

function Item({ item, onAdd }) {
  const imageSrc = `${process.env.PUBLIC_URL}/images/${item.img.trim()}`;

  return (
    <div className="item">
      <img src={imageSrc} alt="foto" />
      <h4>{item.title}</h4>
      <p>{item.desc}</p>
      <b>{item.price}.грн</b>

      <div className="item__btn" onClick={() => onAdd(item)}>
        +
      </div>
      <em>Добавити в кошик</em>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    title: PropTypes.string,
    img: PropTypes.string,
    desc: PropTypes.string,
    price: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  }).isRequired,
  onAdd: PropTypes.func.isRequired,
};

export default Item;
