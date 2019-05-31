import React from 'react'
import '../styles/Signin.css'

export default ({ handleSignIn, loginError }) => (
  <div className="login">
    <h1 className="mainTitle">Welcome to Postings</h1>
    <h2 className="minorTitle">A twitter like styled app</h2>
    <h4 className="minorTitle">Please sign in below</h4>
    <form className="form" onSubmit={handleSignIn}>
      { loginError && <p>{ loginError }</p> }
      <label className="info">Email: </label> <input className="details" type="email" name="email" /><br />
      <br />
      <label className="info">Password: </label><input className="details" type="password" name="password" /><br />
      <br />
      <button className="button" type="submit">Login</button>
    </form>
    <br />
    <h4 className="minorTitle">Or register here</h4>
    <form>
      <button className="button">Register</button>
    </form>
  </div>
)