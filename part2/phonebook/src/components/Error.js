import React from 'react'
import './Error.css';

const Error = ({ error }) => {
    if (error === null) {
        return null
    }

    return (
        <div className="error">
            {error}
        </div>
    )
}

export default Error;