import React from 'react'
import '../styles/Signin.css'

export default ({ handleSignIn, loginError }) => (
  <div>
    <h1 className="h1">Welcome to Postings</h1>
    <h2>A twitter like styled app</h2>
    <h4>Please sign in below</h4>
    <form onSubmit={handleSignIn}>
      { loginError && <p>{ loginError }</p> }
      <label>Email: </label> <input className="details" type="email" name="email" /><br />
      <label>Password: <input className="details" type="password" name="password" /></label><br />
      <br />
      <button className="button" type="submit">Login</button>
    </form>
    <br />
    <h4>Or register here</h4>
    <form>
      <button className="button">Register</button>
    </form>
  </div>
)