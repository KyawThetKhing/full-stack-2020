import React, { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import personService from './services/person';
import Notification from './components/Notification';
import Error from './components/Error';

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [searchList, setSearchList] = useState(persons);
  const [message, setMessage] = useState(null);
  const [error, setErrorMsg] = useState(null);

  useEffect(() => {
    personService
      .getAll()
      .then(data => {
        setPersons(data);
        setSearchList(data)
      })
  }, []);

  const handleName = event => {
    setNewName(event.target.value);
  }

  const handlePhone = event => {
    event.preventDefault();
    setNewPhone(event.target.value);
  }

  const handleSearch = event => {
    const filterList = persons.filter(person => person.name.toLowerCase().includes(event.target.value));
    setSearchList(filterList);
  }
  const handleSubmit = event => {

    event.preventDefault();
    const phObj = {
      name: newName,
      number: newPhone
    }

    if (persons.find(person => person.name === newName)) {
      const confirm = window.confirm(`${newName} is already added to phonebook, replace the old number with new one`)
      if (confirm) {
        const existingPerson = persons.filter(person => person.name === newName);
        personService
          .updatePhone(existingPerson[0].id, phObj)
          .then(data => {
            setPersons(persons.map(person => person.id !== existingPerson[0].id ? person : data))
            setSearchList(searchList.map(person => person.id !== existingPerson[0].id ? person : data))

            setMessage(`Added ${data.name}`);
            setTimeout(
              () => {
                setMessage(null)
              }, 5000
            )
          })
      }
    } else {
      personService
        .createPhone(phObj)
        .then(data => {
          setPersons([
            ...persons,
            data
          ]);
          setSearchList([
            ...searchList,
            data
          ]);
          setMessage(`Added ${data.name}`);
          setTimeout(
            () => {
              setMessage(null)
            }, 5000
          )
        })
    }
    setNewName('');
    setNewPhone('');
  }

  const handleDelete = (person) => {
    const deletePhone = window.confirm(`Delete ${person.name}?`)
    if (deletePhone) {
      personService
        .deletePhone(person.id)
        .then(data => {
          const list = persons.filter(data => data.id !== person.id);
          setPersons(list);
          setSearchList(list);
        })
        .catch(error => {
          setErrorMsg(`Infomartion of ${person.name} is already remove from the server`)
          setTimeout(() => {
            setErrorMsg(null)
          }, 5000)
        })

    }

  }

  return (
    <div>
      <h2>Phonebook</h2>
      {message && <Notification message={message} />}
      {error && <Error error={error} />}
      <Filter handleSearch={handleSearch} />
      <h2>add a new</h2>
      <PersonForm
        handleSubmit={handleSubmit}
        handleName={handleName}
        handlePhone={handlePhone}
        newName={newName}
        newPhone={newPhone}
      />
      <h2>Numbers</h2>
      <Persons searchList={searchList} handleDelete={handleDelete} />
    </div>
  )
}

export default App