const Numbers = ({ persons, showFiltered, filtered, handleDelete }) => {
  return (
    <>
      <h2>Numbers</h2>
      {showFiltered ? (
        <>
          {filtered.map((person, i) => {
            return (
              <>
                <p key={person.id}>
                  {person.name} {person.number}
                </p>
                <button onClick={() => handleDelete(person.id, person.name)}>
                  delete
                </button>
              </>
            );
          })}
        </>
      ) : (
        persons.map((person, i) => {
          let { name, number, id } = person;
          return (
            <>
              <p key={id}>
                {name} {number}
              </p>{" "}
              <button key={i} onClick={() => handleDelete(id, name)}>
                delete
              </button>
            </>
          );
        })
      )}
    </>
  );
};

export default Numbers;
