import PropTypes from "prop-types";

function Categories({ categories, chooseCategory }) {
  return (
    <div className="Categories">
      {categories.map((item) => (
        <button
          type="button"
          className="Categories__items"
          key={item.key}
          onClick={() => chooseCategory(item.key)}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
}

Categories.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  chooseCategory: PropTypes.func.isRequired,
};

export default Categories;
