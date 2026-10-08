import PropTypes from "prop-types";

function Item(props) {
  return (
    <div className="item">
      <img src={"../images/" + (props.item.img || "").trim()} alt="foto" />
      <h4>{props.item.title}</h4>
      <p>{props.item.desc}</p>
      <b>{props.item.price}.грн</b>

      <div className="item__btn" onClick={() => props.onAdd(props.item)}>
        +
      </div>
      <em>Добавити в кошик</em>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number,
    img: PropTypes.string,
    title: PropTypes.string,
    desc: PropTypes.string,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }).isRequired,
  onAdd: PropTypes.func.isRequired,
};

export default Item;
