import React from 'react';

const Persons = ({ searchList }) => {
    return (
        <div>
            {searchList.map(person => <p key={person.name}>{person.name} {person.number}</p>)}

        </div>
    )
}

export default Persons;