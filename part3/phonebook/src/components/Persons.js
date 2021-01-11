import React from 'react';

const Persons = ({ searchList, handleDelete }) => {
    return (
        <div>
            {searchList.map(person => {
                return (
                    <div key={person.name}>
                        <p >{person.name} {person.phoneNo}</p>
                        <button onClick={() => handleDelete(person)}>delete</button>
                    </div>
                )
            })}

        </div>
    )
}

export default Persons;