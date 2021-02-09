const Filter = ({ filter, handleChange, handleClick }) => {
  return (
    <div className="filter">
      <label htmlFor="filter">Filter Contries: </label>
      <input
        type="text"
        id="filter"
        name="filter"
        onChange={handleChange}
        value={filter}
      />
      <button onClick={handleClick}>Filter</button>
    </div>
  );
};

export default Filter;
