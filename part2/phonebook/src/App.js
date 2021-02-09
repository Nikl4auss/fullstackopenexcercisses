import React, { useState, useEffect } from "react";
import axios from "axios";
import NewContacts from "./components/NewContacts";
import Numbers from "./components/Numbers";
import Filtered from "./components/Filtered";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [filter, setFilter] = useState("");
  const [showFiltered, setShowFiltered] = useState(false);

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

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const changeFiltered = () => {
    let filtered = persons.filter((person) => person.name === filter);
    setFilter("");
    setShowFiltered(true);
    setFiltered(filtered);
  };

  const showAll = () => {
    setShowFiltered(false);
  };

  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then((response) => {
        let contacts = response.data;
        return contacts;
      })
      .then((contacts) => setPersons(persons.concat(contacts)));
  }, []);

  return (
    <div>
      <h1>Phonebook</h1>
      {persons.length === 0 ? null : (
        <Filtered
          filter={filter}
          showFiltered={showFiltered}
          handleFilterChange={handleFilterChange}
          changeFiltered={changeFiltered}
          showAll={showAll}
        />
      )}

      <NewContacts
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        newName={newName}
        newNumber={newNumber}
        addNewContact={addNewContact}
      />
      {persons.length === 0 ? null : (
        <Numbers
          persons={persons}
          showFiltered={showFiltered}
          filtered={filtered}
        />
      )}
    </div>
  );
};

export default App;
