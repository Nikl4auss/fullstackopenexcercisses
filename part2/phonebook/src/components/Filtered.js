const Filtered = ({
  filter,
  showFiltered,
  handleFilterChange,
  changeFiltered,
  showAll,
}) => {
  return (
    <>
      Filter by name:{" "}
      <input type="text" onChange={handleFilterChange} value={filter} />
      <button onClick={changeFiltered}>Show Filtered</button>
      {showFiltered ? <button onClick={showAll}>Show All</button> : null}
    </>
  );
};

export default Filtered;
