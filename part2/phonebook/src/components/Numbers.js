const Numbers = ({ persons, showFiltered, filtered, handleDelete }) => {
  return (
    <div className="contacts-container">
      <h2>Contacts</h2>
      {showFiltered ? (
        <>
          {filtered.map((person, i) => {
            const { name, number, id } = person;
            return (
              <>
                <p key={id}>
                  {name} {number}
                </p>
                <button
                  className="btn delete"
                  onClick={() => handleDelete(id, name)}
                >
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
              <button
                className="btn delete"
                key={i}
                onClick={() => handleDelete(id, name)}
              >
                delete
              </button>
            </>
          );
        })
      )}
    </div>
  );
};

export default Numbers;
