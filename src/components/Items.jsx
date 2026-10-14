import PropTypes from "prop-types";
import Item from "./Item";

function Items({ items, onAdd }) {
  return (
    <main className="main">
      {items.map((item) => (
        <Item key={item.id} item={item} onAdd={onAdd} />
      ))}
    </main>
  );
}

Items.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
      title: PropTypes.string,
      img: PropTypes.string,
      desc: PropTypes.string,
      price: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      category: PropTypes.string,
      amount: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    })
  ).isRequired,
  onAdd: PropTypes.func.isRequired,
};

export default Items;
