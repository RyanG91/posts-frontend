import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/Signin.css'

export default ({ handleSignIn, loginError, goToRegister }) => (
  <div className="background">
    <div className="login">
      <h1 className="mainTitle">Welcome to Postings</h1>
      <h2 className="mainTitle">A twitter like styled app</h2>
      <h4 className="mainTitle">Please sign in below</h4>
      
      {/* Logins a User in */}
      <form className="form" onSubmit={handleSignIn}>
        { loginError && <p>{ loginError }</p> }
        <label className="info">Email: </label> <input className="details" type="email" name="email" /><br />
        <br />
        <label className="info">Password: </label><input className="details" type="password" name="password" /><br />
        <br />
        <button className="button" type="submit">Login</button>
      </form>
      <br />
      <h4 className="mainTitle">Or register here</h4>

      {/* Navigates to the Register page */}
      <Link to="/register">
        <button className="button" type="button" onClick={goToRegister}>
          Register          
        </button>
      </Link>
    </div>
  </div>
)