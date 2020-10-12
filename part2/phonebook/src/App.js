import React, { useState } from 'react'
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [searchList, setSearchList] = useState(persons);

  const handleName = event => {
    console.log('handlename', event.target.value)
    setNewName(event.target.value);
  }

  const handlePhone = event => {
    event.preventDefault();
    setNewPhone(event.target.value);
  }

  const handleSearch = event => {
    console.log('evetn', event.target.value);
    const filterList = persons.filter(person => person.name.toLowerCase().includes(event.target.value));
    console.log('Filter', filterList);
    setSearchList(filterList);
  }
  const handleSubmit = event => {
    console.log('handlusbmi', newName, newPhone)
    event.preventDefault();
    if (persons.find(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
    } else {

      setPersons([
        ...persons,
        { name: newName, number: newPhone }
      ]);
      setSearchList([
        ...searchList,
        { name: newName, number: newPhone }
      ]);
    }
    setNewName('');
    setNewPhone('');
  }

  return (
    <div>
      <h2>Phonebook</h2>
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
      <Persons searchList={searchList} />
    </div>
  )
}

export default App