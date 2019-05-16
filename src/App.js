import React, { Component, Fragment } from 'react';
import './App.css';
import { api, setJwt} from './api/init'
import NewPost from './components/NewPost'
import Signin from './components/Signin'
import Notfound from './components/Notfound'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import Post from './components/Post'
import store from './config/store'


class App extends Component {
  // state = {
  //   newPostTitle: '',
  //   newPostBody: '',
  //   posts: []
  // }

  // componentDidMount() {
  //   api.get('/posts')
  //     .then((response) => {
  //       this.setState({ posts: response.data })
  //     }).catch((err) => {
  //       console.log(`Something went wrong trying to fetch the
  //       postings. Error: ${err}`)
  //     })
  // }

  updateNewPostTitle = (event) => {
    // this.setState({
    store.dispatch({
      type: 'set_newPostTitle',
      newPostTitle: event.target.value
    })
  }

  updateNewPostBody = (event) => {
    // this.setState({
    store.dispatch({
      type: 'set_newPostBody',
      newPostBody: event.target.value
    })
  }

  handleSignIn = async (event) => {
    // try {
    //   event.preventDefault()
    //   const form = event.target
    //   const response = await api.post('/auth/login', {
    //     email: form.elements.email.value,
    //     password: form.elements.password.value
    //   })
    //   this.token = response.data.token
    //   setJwt(response.data.token)
    //   store.dispatch(setLoggedInAction(true))
    //   this.fetchBookmarks()
    // } catch (error) {
    //   store.dispatch(setLoginErrorAction(error.message))
    // }
  }

  handleSignOut = (event) => {
    // api.get('/auth/logout').then(() => {
    //   localStorage.removeItem('token')
    //   store.dispatch(setLoggedInAction(false))
    //   store.dispatch(setBookmarksAction([]))
    // })
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

  deletePost = (id) => {
    api.delete(`/posts/${id}`)
    // const index = this.state.posts.findIndex(post => post._id === id)
    const index = store.getState().posts.findIndex(post => post._id === id)
    if (index >= 0) {
      // const posts = [...this.state.posts]
      const posts = [...store.getState().posts]
      posts.splice(index, 1)
      // this.setState({ posts })
      store.dispatch({ type: 'set_posts', posts: posts })
    }
  }

  render() {
    console.log(store.getState())
    const { posts } = store.getState()
    return (
      <div>
        <Router>
          <Fragment>
            <Route exact path="/" render={(props) => (
              <Redirect to="/login" />
            )} />

            <Route exact path="/login" component={Signin} />

            <Route exact path="/postings" render={() =>  (
              <Fragment>
                <h1>Posting</h1>
                <h2>New Post</h2>
                <form onSubmit={this.addPosts}>
                  <label>Title:</label><br /><input onChange={this.updateNewPostTitle} /><br />
                  <label>Content:</label><br /><input onChange={this.updateNewPostBody} /><br />
                  <input type="submit" value="Submit" />
                </form>
                <br />
                <h2>Previous Posts</h2>
                {/* { this.state.posts.map((post) =>  */}
                { posts.map((post) => 
                  <Post key={post._id} {...post} deletePost={this.deletePost} />
                )}
              </Fragment>
            )} />

          </Fragment>

          {/* <Route component={Notfound} /> */}
        </Router>
      </div>
    )
  }

  componentDidMount() {
    this.fetchPostings()
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
