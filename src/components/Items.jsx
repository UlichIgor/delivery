import PropTypes from "prop-types";
import Item from "./Item";

function Items(props) {
  return (
    <main className="main">
      {props.items.map((el) => (
        <Item key={el.id} item={el} onAdd={props.onAdd} />
      ))}
    </main>
  );
}

Items.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ).isRequired,
  onAdd: PropTypes.func.isRequired,
};

export default Items;
