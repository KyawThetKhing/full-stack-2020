import React from 'react';

const CountryList = ({ countryList, handleShowCountry }) => {
    return (
        <div>
            {countryList.map(country => {
                return (
                    <div key={country.name}>
                        <span>{country.name}</span>
                        <button onClick={() => handleShowCountry(country.name)}>show</button>
                    </div>

                )
            })}
        </div>
    )
}

export default CountryList;