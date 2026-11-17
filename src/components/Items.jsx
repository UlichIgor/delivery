import PropTypes from "prop-types";
import Item from "./Item";

function Items({ items, onAdd, onResetFilters }) {
  if (items.length === 0) {
    return (
      <section className="menu-empty" aria-live="polite">
        <h2>Нічого не знайдено</h2>
        <p>Спробуйте змінити пошуковий запит або вибрати іншу категорію.</p>
        <button type="button" className="menu-empty__button" onClick={onResetFilters}>
          Показати все меню
        </button>
      </section>
    );
  }

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
  onResetFilters: PropTypes.func.isRequired,
};

export default Items;
