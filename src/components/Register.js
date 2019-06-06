import React from "react"

export default ({ handleRegister, registerSuccess, registerError }) => (
      <div>
        <h2>Register</h2>
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
      </div>
)