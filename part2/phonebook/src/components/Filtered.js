const Filtered = ({
  filter,
  showFiltered,
  handleFilterChange,
  changeFiltered,
  showAll,
}) => {
  return (
    <div className="filter-container">
      <label for="filter"> Filter by name: </label>
      <input
        id="filter"
        name="filter"
        className="field"
        type="text"
        onChange={handleFilterChange}
        value={filter}
      />
      <button className="btn filter" onClick={changeFiltered}>
        Show Filtered
      </button>
      {showFiltered ? (
        <button className="btn show" onClick={showAll}>
          Show All
        </button>
      ) : null}
    </div>
  );
};

export default Filtered;
