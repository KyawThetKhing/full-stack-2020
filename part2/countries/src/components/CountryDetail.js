import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CountryDetail = ({ country }) => {
    const [weather, setWeather] = useState({
        temperature: '',
        wind: ''
    });
    useEffect(() => {
        axios
            .get(`https://api.openweathermap.org/data/2.5/weather?q=${country.name}&appid=${process.env.REACT_APP_API_KEY}`)
            .then(response => {
                console.log('Response', response.data)
                setWeather({
                    temperature: response.data.main.temp,
                    wind: response.data.wind.deg
                });
            })
    }, [])
    return (
        <div>
            <h2>{country.name} </h2>

            <p>capital {country.capital}</p>
            <p>population {country.translations.br}</p>

            <h4>languages</h4>
            <ul>
                {country.languages.map((language) => <li key={language.name}>{language.name}</li>)}
            </ul>

            <img src={country.flag} alt="country-flag" className="country-flag" width="200" height="200" />

            <h4>Weather in {country.capital}</h4>
            <p>temperature: {weather.temperature}</p>
            <p>wind: {weather.wind}</p>
        </div>
    )
}

export default CountryDetail;