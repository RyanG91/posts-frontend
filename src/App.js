import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'

const postsApi = 'http://localhost:3001/api/posts'

class App extends Component {
  state = {
    posts: []
  }

  componentDidMount() {
    axios.get(postsApi)
      .then((response) => {
        this.setState({ posts: response.data })
      })
  }

  render() {
    return (
      <div>
        <h1>Posting</h1>
        { this.state.posts.map((post) => 
          <div>
            <h4>{ post.title }</h4>
            <p>{ post.content }</p> 
            <br /> 
          </div> 
        )}
      </div>
    )
  }
}

export default App;
