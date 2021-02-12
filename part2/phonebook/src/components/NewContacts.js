const NewContacts = ({
  handleNameChange,
  handleNumberChange,
  newName,
  newNumber,
  addNewContact,
}) => {
  return (
    <div className="newContacts-container">
      <h2>Add a new contact</h2>
      <form>
        <div>
          <label for="name">name: </label>
          <input
            className="field"
            id="name"
            name="name"
            onChange={handleNameChange}
            value={newName}
            placeholder="example: Ana Carla"
          />
          <br />
          <label for="number">number: </label>
          <input
            id="number"
            name="number"
            className="field"
            onChange={handleNumberChange}
            value={newNumber}
            placeholder="example: 111111"
          />
        </div>
        <div>
          <button className="btn add" onClick={addNewContact} type="submit">
            add
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewContacts;
