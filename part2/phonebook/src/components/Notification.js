import React from 'react'
import './Notification.css';

const Notification = (props) => {
    if (props === null) {
        return null
    }

    return (
        <div className="info">
            {props.message}
        </div>
    )
}

export default Notification;