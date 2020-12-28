import React from 'react';

const PersonForm = ({ handleSubmit, handleName, handlePhone, newName, newPhone }) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                name: <input type="text" value={newName} onChange={handleName} />
            </div>
            <div>
                phone: <input type="number" value={newPhone} onChange={handlePhone} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm;