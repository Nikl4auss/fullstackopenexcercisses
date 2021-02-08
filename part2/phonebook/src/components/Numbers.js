const Numbers = ({ persons, showFiltered, filtered }) => {
  return (
    <>
      <h2>Numbers</h2>
      {showFiltered ? (
        <>
          <p>
            {filtered[0].name} {filtered[0].number}
          </p>
        </>
      ) : (
        persons.map((person) => {
          let { name, number } = person;
          return (
            <p key={name}>
              {name} {number}
            </p>
          );
        })
      )}
    </>
  );
};

export default Numbers;
