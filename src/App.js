import React, { Component, Fragment } from 'react';
import './App.css';
import { api, setJwt} from './api/init'
import decodeJWT from 'jwt-decode'
import NewPost from './components/NewPost'
import Signin from './components/Signin'
import Notfound from './components/Notfound'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import Post from './components/Post'
import store from './config/store'
import EditPostForm from './components/EditPostForm';


class App extends Component {

  get token() {
    return localStorage.getItem('token')
  }

  set token(value) {
    localStorage.setItem('token', value)
  }

  updateNewPostTitle = (event) => {
    store.dispatch({
      type: 'set_newPostTitle',
      newPostTitle: event.target.value
    })
  }

  updateNewPostBody = (event) => {
    store.dispatch({
      type: 'set_newPostBody',
      newPostBody: event.target.value
    })
  }

  // Handles signin function
  handleSignIn = async (event) => {
    try {
      event.preventDefault()
      const form = event.target
      const response = await api.post('/users/login', {
        email: form.elements.email.value,
        password: form.elements.password.value
      })
      // Returns token from backend
      this.token = response.data.token
      setJwt(response.data.token)
      store.dispatch({ type: 'set_loggedIn', loggedIn: true})
      this.fetchPostings()
    } catch (error) {
      store.dispatch({ type: 'set_loginError', loginError: 'Invalid email or password' }) // error.message
    }
  }

  handleSignOut = (event) => {
    api.get('/users/logout').then(() => {
      localStorage.removeItem('token')
      store.dispatch({ type: 'set_loggedIn', loggedIn: false})
      store.dispatch({ type: 'set_posts', posts: [] })
    })
  }

  addPosts = (event) => {
    event.preventDefault()
    // api.post('/posts', { title: this.state.newPostTitle, content: this.state.newPostBody })
    api.post('/posts', { title: store.getState().newPostTitle, content: store.getState().newPostBody })
      .then((response) => {
        // const posts = [...this.state.posts, response.data]
        const posts = [...store.getState().posts, response.data]
        // this.setState({ posts, newPostTitle: '', newPostBody: '' })
        store.dispatch({ type: 'set_posts', posts, newPostTitle: '', newPostBody: '' })
    }).catch(function (error) {
      console.log(error)
    })
  }

  // Moved to storeMethods
  // deletePost = (id) => {
  //   api.delete(`/posts/${id}`)
  //   const index = store.getState().posts.findIndex(post => post._id === id)
  //   if (index >= 0) {
  //     const posts = [...store.getState().posts]
  //     posts.splice(index, 1)
  //     store.dispatch({ type: 'set_posts', posts: posts })
  //   }
  // }

  render() {
    console.log(store.getState())
    const tokenDetails = this.token && decodeJWT(this.token)
    const { posts, loggedIn } = store.getState()
    return (
      <div className="App">
        <Router>
          <Fragment>
            <Route exact path="/" render={(props) => (
              <Redirect to="/login" />
            )} />

            <Route exact path="/login" render={(props) => {
              if (this.token) {
                return (<Redirect to="/postings" />)
              } else {
                return (<Signin loginError={store.getState().loginError} handleSignIn={this.handleSignIn} />)
              }
            }} />

            <Route exact path="/postings" render={() =>  {
              if (this.token) {
                if (store.getState().editing) {
                  let post = store.getState().editing
                  return (
                    <EditPostForm key={post._id} post={post} />
                  )
                } else {
                  return (
                    <Fragment>
                      <h4>Welcome {tokenDetails.email}!</h4>
                      <p>You logged in at: {new Date(tokenDetails.iat * 1000).toLocaleString()}</p>
                      <p>Your token expires at: {new Date(tokenDetails.exp * 1000).toLocaleString()}</p>
                      <button onClick={this.handleSignOut}>Logout</button>
                      <h1>Posting</h1>
                      <h2>New Post</h2>
                      <form onSubmit={this.addPosts}>
                        <label>Title:</label><br /><input onChange={this.updateNewPostTitle} /><br />
                        <label>Content:</label><br /><input onChange={this.updateNewPostBody} /><br />
                        <input type="submit" value="Submit" />
                      </form>
                      <br />
                      <h2>Previous Posts</h2>
                      { posts.map((post) => 
                        <Post key={post._id} {...post} />
                      ).reverse()}
                    </Fragment>
                  )
                }
              } else {
                return <Redirect to="/login" />
              }
            }} 
          />
          </Fragment>

          {/* <Route component={Notfound} /> */}
        </Router>
      </div>
    )
  }

  componentDidMount() {
    if (this.token) {
      setJwt(this.token)
      this.fetchPostings()
    }
  }

  async fetchPostings() {
    try {
      const posts = await api.get('/posts')
      // this.setState({ posts: posts.data})
      // Dispatch a set_posts action to Redux
      store.dispatch({ 
        type: 'set_posts',
        posts: posts.data
      })
    } catch(error) {
      alert("Can't get postings!")
    }
  }
}

export default App;
