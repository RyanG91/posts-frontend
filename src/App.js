import React, { Component } from 'react';
import './App.css';
import api from './api/init'
import NewPost from './components/NewPost'
import Signin from './components/Signin'
import Notfound from './components/Notfound'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import Post from './components/Post'


class App extends Component {
  state = {
    newPostTitle: '',
    newPostBody: '',
    posts: []
  }

  componentDidMount() {
    api.get('/posts')
      .then((response) => {
        this.setState({ posts: response.data })
      }).catch((err) => {
        console.log(`Something went wrong trying to fetch the
        postings. Error: ${err}`)
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
    api.post('/posts', { title: this.state.newPostTitle, content: this.state.newPostBody })
      .then((response) => {
        const posts = [...this.state.posts, response.data]
        this.setState({ posts, newPostTitle: '', newPostBody: '' })
    }).catch(function (error) {
      console.log(error)
    })
  }

  deletePost = (id) => {
    api.delete(`/posts/${id}`)
    const index = this.state.posts.findIndex(post => post._id === id)
    if (index >= 0) {
      const posts = [...this.state.posts]
      posts.splice(index, 1)
      this.setState({ posts })
    }
  }

  render() {
    return (
      <div>
        <Router>
          {/* <Route exact path="/login" component={Signin} /> */}

          {/* <Route component={Notfound} /> */}

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
            <Post key={post._id} {...post} deletePost={this.deletePost} />
          )}
        </Router>
      </div>
    )
  }
}

export default App;
