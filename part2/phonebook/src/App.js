import React, { useState, useEffect } from "react";
import axios from "axios";
import NewContacts from "./components/NewContacts";
import Numbers from "./components/Numbers";
import Filtered from "./components/Filtered";
import personService from "./services/persons";
import Notification from "./components/Notificationbox";
const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [filter, setFilter] = useState("");
  const [showFiltered, setShowFiltered] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [notificationType, setNotificationType] = useState(null);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const setMessage = (type, message) => {
    setNotificationType(type);
    setNotificationMessage(message);
    setTimeout(() => {
      setNotificationMessage(null);
      setNotificationType(null);
    }, 5000);
  };

  const addNewContact = (event) => {
    event.preventDefault();
    const contact = {
      name: newName,
      number: newNumber,
    };
    if (persons.some((person) => person.name === contact.name)) {
      let result = window.confirm(
        `${contact.name} is already added to the phonebook, do you wish to change the current number?`
      );
      if (result) {
        let oldContact = persons.filter(
          (person) => person.name === contact.name
        )[0];
        personService
          .updateContact(oldContact.id, contact)
          .then((returnedContact) => {
            setPersons(
              persons.map((person) => {
                return person.id !== returnedContact.id
                  ? person
                  : returnedContact;
              })
            );
          });
        setNewName("");
        setNewNumber("");
        setMessage("updated", `Updated ${contact.name}`);
      } else {
        alert("Nothing was changed");
        setNewName("");
      }
    } else {
      personService.createContact(contact).then((response) => {
        setPersons(persons.concat(response));
        setNewName("");
        setNewNumber("");
        setMessage("added", `Added ${contact.name}`);
      });
    }
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const changeFiltered = () => {
    let filtered = persons.filter((person) => {
      return person.name.includes(filter);
    });
    setFilter("");
    setShowFiltered(true);
    setFiltered(filtered);
    console.log(filtered);
  };

  const showAll = () => {
    setShowFiltered(false);
  };

  const handleDelete = (id, name) => {
    const result = window.confirm(`Are you sure you want to delete ${name}?`);
    if (result) {
      personService
        .deleteContact(id)
        .then(() => {
          personService.getContacts().then((response) => {
            setPersons(response);
          });
        })
        .catch((error) => {
          setMessage("deleted", `${name} has already been deleted`);
          setPersons(persons.filter((person) => person.id !== id));
        });
      console.log(name);
      setMessage("deleted", `${name} has been deleted`);
    } else {
      alert("Delete aborted");
    }
  };

  useEffect(() => {
    personService.getContacts().then((response) => {
      setPersons(response);
    });
  }, []);

  useEffect(() => {
    console.log(persons);
  }, [persons]);

  return (
    <div className="container">
      <h1 className="title">Phonebook</h1>
      <Notification type={notificationType} message={notificationMessage} />
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
          handleDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default App;
