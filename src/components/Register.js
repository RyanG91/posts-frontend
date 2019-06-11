import React from "react"
import { Link } from 'react-router-dom'
import '../styles/Register.css'

export default ({ handleRegister, registerSuccess, registerError, backToLogin }) => (
      <div className="registerBackground">
        <h1 className="registerTitle">Register</h1>
        <h4 className="registerTitle">Please enter your email and password below.</h4>
        <br />

        {/* Registers a new user with the handleRegister function */}
        <form className="registerForm" onSubmit={handleRegister}>
          { registerSuccess && <p>{ registerSuccess }</p> }
          { registerError && <p>{ registerError }</p> }
          <label className="info">Email: </label> 
          <input className="registerInformation" type="email" name="email" />
          <br />
          <br />
          <label className="info">Password: </label>
          <input className="registerInformation" type="password" name="password" />
          <br />
          <br />
          <button className="registerButton" type="submit">Register</button>
        </form>
        <br />

        {/* Navigates back to the Login page */}
        <h4 className="registerTitle">Return to login screen</h4>
        <Link to="/login">
          <button className="registerButton" type="button" onClick={backToLogin}>
            Return to login
          </button>
        </Link>
      </div>
)