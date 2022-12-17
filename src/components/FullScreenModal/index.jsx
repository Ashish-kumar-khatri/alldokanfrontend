import React from 'react'
import './style.css';

function FullScreenModal({
    children
}) {
  return (
    <div
        className = "full-screen-modal"
    >
        <div className="container">
            {children}
        </div>
        <div className="overlay"></div>
    </div>
  )
}

export default FullScreenModal