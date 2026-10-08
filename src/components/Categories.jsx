import PropTypes from "prop-types";

function Categories(props) {
  return (
    <div className="Categories">
      {(props.categories || []).map((el) => (
        <div
          className="Categories__items"
          key={el.key}
          onClick={() => props.chooseCategory(el.key)}
        >
          {el.name}
        </div>
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
  ),
  chooseCategory: PropTypes.func.isRequired,
};

export default Categories;
