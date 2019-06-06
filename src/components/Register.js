import React from "react"
import { Link } from 'react-router-dom'

export default ({ handleRegister, registerSuccess, registerError, backToLogin }) => (
      <div>
        <h2>Register</h2>

        {/* Registers a new user with the handleRegister function */}
        <form onSubmit={handleRegister}>
          { registerSuccess && <p>{ registerSuccess }</p> }
          { registerError && <p>{ registerError }</p> }
          <label className="info">Email: </label> 
          <input type="email" name="email" />
          <br />
          <br />
          <label className="info">Password: </label>
          <input type="password" name="password" />
          <br />
          <br />
          <button type="submit">Register</button>
        </form>
        <br />
        <br />

        {/* Navigates back to the Login page */}
        <Link to="/login">
          <button type="button" onClick={backToLogin}>
            Return to login
          </button>
        </Link>
      </div>
)