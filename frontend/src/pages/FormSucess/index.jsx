// src/FormSucess/FormSucess.js
import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const FormSucess = () => {
    return (
        <div className="container mt-5">
            {/* returns the success screen and a button to go back to the home page */}
            <div className="text-center">
                <h2>Registration successful!</h2>
                <p>The event was successfully registered.</p>
                <Link to="/" className="btn btn-primary">
                Back to home page
                </Link>
            </div>
        </div>
    );
};

export default FormSucess;