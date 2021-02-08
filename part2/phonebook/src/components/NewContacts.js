const NewContacts = ({
  handleNameChange,
  handleNumberChange,
  newName,
  newNumber,
  addNewContact,
}) => {
  return (
    <>
      <h2>Add a new contact</h2>
      <form>
        <div>
          name:{" "}
          <input
            onChange={handleNameChange}
            value={newName}
            placeholder="Add new contact"
          />
          <br />
          number:{" "}
          <input
            onChange={handleNumberChange}
            value={newNumber}
            placeholder="Add a number"
          />
        </div>
        <div>
          <button onClick={addNewContact} type="submit">
            add
          </button>
        </div>
      </form>
    </>
  );
};

export default NewContacts;
