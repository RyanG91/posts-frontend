import React, { Component } from 'react';
import './App.css';
import axios from 'axios'

const postsApi = 'http://localhost:3001/api/posts'

class App extends Component {
  state = {
    newPostTitle: '',
    newPostBody: '',
    posts: []
  }

  componentDidMount() {
    axios.get(postsApi)
      .then((response) => {
        this.setState({ posts: response.data })
      })
  }

  updateNewPostTitle = (event) => {
    this.setState({
      newPostTitle: event.target.value
    })
  }

  updateNewPostBody = (event) => {
    this.setState({
      newPostBody: event.target.value
    })
  }

  addPosts = (event) => {
    event.preventDefault()
    axios.post(postsApi, { title: this.state.newPostTitle, content: this.state.newPostBody })
      .then((response) => {
        const posts = [...this.state.posts, response.data]
        this.setState({ posts, newPostTitle: '', newPostBody: '' })
    }).catch(function (error) {
      console.log(error)
    })
  }

  render() {
    return (
      <div>
        <h1>Posting</h1>
        <h2>New Post</h2>
        <form onSubmit={this.addPosts}>
          <label>Title:</label><br /><input onChange={this.updateNewPostTitle} /><br />
          <label>Content:</label><br /><input onChange={this.updateNewPostBody} /><br />
          <input type="submit" value="Submit" />
        </form>
        <br />
        <h2>Previous Posts</h2>
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
