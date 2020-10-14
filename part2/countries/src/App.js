import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import CountryList from './components/CountryList';
import CountryDetail from './components/CountryDetail';

function App() {
  const [countries, setCountries] = useState([]);
  // const [search, setSearch] = useState('');
  const [filterList, setFilterList] = useState([]);

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('Response', response);
        setCountries(response.data);
        setFilterList(response.data);
      })
  }, []);

  const handleSearch = event => {
    console.log('event.target.value', event.target.value)
    const filterList = countries.filter(country => country.name.toLowerCase().includes(event.target.value));
    console.log('filterList', filterList);
    setFilterList(filterList);
  }

  const handleShowCountry = (name) => {
    console.log('name', name);
    const filterList = countries.filter(country => country.name === name);
    console.log('Name', filterList);
    setFilterList(filterList);
  }
  return (
    <div>
      find countries: <input type="text" onChange={handleSearch} />
      {filterList.length > 10 && <p>Too many matches, specify another filter</p>}
      {filterList.length > 1 && filterList.length <= 10 && < CountryList countryList={filterList} handleShowCountry={handleShowCountry} />}
      {filterList.length === 1 && < CountryDetail country={filterList[0]} />}
    </div>
  );
}

export default App;
