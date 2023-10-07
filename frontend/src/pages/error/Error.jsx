import React from 'react'
import './error.css';
import { useNavigate } from "react-router-dom";
const Error = () => {
    const Navigate = useNavigate();
    return (
        <>
            <div className='errorPage'>
                <p>Oops Page Not Found.</p>
                <h1>404</h1>
                <h2>Error!</h2>
                <button onClick={() => { Navigate(-1) }} className='submitBtn'>Go Back</button>
            </div>
        </>
    )
}

export default Error