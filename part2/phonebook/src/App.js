import React, { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };
  const addNewContact = (event) => {
    event.preventDefault();
    const contact = {
      name: newName,
      number: newNumber,
    };
    if (persons.some((person) => person.name === contact.name)) {
      console.log(contact);
      alert(`${contact.name} is already added to the phonebook`);
      setNewName("");
    } else {
      setPersons(persons.concat(contact));
      setNewName("");
      setNewNumber("");
    }
  };
  return (
    <div>
      <h2>Phonebook</h2>
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
          <input type="text" onChange={handleNumberChange} value={newNumber} />
        </div>
        <div>
          <button onClick={addNewContact} type="submit">
            add
          </button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.length === 0 ? (
        <p>No contacts have been added yet</p>
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
    </div>
  );
};

export default App;
