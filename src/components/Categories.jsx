import PropTypes from "prop-types";

function Categories({
  categories,
  activeCategory,
  searchQuery,
  resultCount,
  chooseCategory,
  onSearchChange,
}) {
  return (
    <section className="menu-toolbar" id="menu" aria-labelledby="menu-title">
      <div className="menu-toolbar__heading">
        <div>
          <p className="menu-toolbar__eyebrow">Feast Sushi · Чернігів</p>
          <h1 id="menu-title">Меню</h1>
          <p className="menu-toolbar__description">
            Оберіть улюблені страви або знайдіть щось нове.
          </p>
        </div>
        <label className="menu-search">
          <span className="visually-hidden">Пошук страв</span>
          <input
            type="search"
            value={searchQuery}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Знайти страву..."
            aria-label="Знайти страву"
          />
          {searchQuery && (
            <button
              type="button"
              className="menu-search__clear"
              onClick={() => onSearchChange("")}
              aria-label="Очистити пошук"
            >
              ×
            </button>
          )}
        </label>
      </div>
      <div className="Categories" role="group" aria-label="Фільтр за категоріями">
        {categories.map((item) => (
          <button
            type="button"
            className={`Categories__items${activeCategory === item.key ? " is-active" : ""}`}
            key={item.key}
            aria-pressed={activeCategory === item.key}
            onClick={() => chooseCategory(item.key)}
          >
            {item.name}
          </button>
        ))}
      </div>
      <p className="menu-toolbar__count" aria-live="polite">
        Знайдено позицій: {resultCount}
      </p>
    </section>
  );
}

Categories.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  activeCategory: PropTypes.string.isRequired,
  searchQuery: PropTypes.string.isRequired,
  resultCount: PropTypes.number.isRequired,
  chooseCategory: PropTypes.func.isRequired,
  onSearchChange: PropTypes.func.isRequired,
};

export default Categories;
