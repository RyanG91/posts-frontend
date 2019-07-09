import React, { Component, Fragment } from 'react';
import './styles/App.css';
import { api, setJwt} from './api/init'
import decodeJWT from 'jwt-decode'
import NewPost from './components/NewPost'
import Signin from './components/Signin'
import Register from './components/Register'
import Notfound from './components/Notfound'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import Post from './components/Post'
import store from './config/store'
import EditPostForm from './components/EditPostForm';
import EditCommentForm from './components/EditCommentForm'
import { setEditingAction, setEditCommentAction } from './config/actions'

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

  handleRegister = async (event) => {
      event.preventDefault()
      const form = event.target
      api
        .post('/users/register', {
          email: form.elements.email.value,
          password: form.elements.password.value
        })
        .then(res => {
          store.dispatch({ type: 'set_registerSuccess', registerSuccess: 'Success, you have registered. Please return to the login screen and login' })
        })
        .catch(error => {
          console.log(`Something went wrong`)
          store.dispatch({ type: 'set_registerError', registerError: 'Sorry, that email is already taken or you entered an invalid email'})
        })
        
  }

  removeEdit = () => {
    this.fetchPostings()
    store.dispatch(setEditingAction(null))
  }

  backToLogin = () => {
    store.dispatch({ type: 'set_registerError', registerError: null})
  }

  goToRegister = () => {
    store.dispatch({ type: 'set_loginError', loginError: null})
  }

  editPosts = (event) => {
    event.preventDefault()
    const form = event.target
    api
      .put(`/posts/${form.elements.id.value}`, {
        _id: form.elements.id.value,
        title: form.elements.title.value,
        content: form.elements.content.value
      })
      .then(res => {
        this.fetchPostings()
        store.dispatch(setEditingAction(null))
      })
      .catch(error => {
        console.error(`Error updating post: ${error}`)
      })
  }

  addPosts = (event) => {
    const tokenDetails = this.token && decodeJWT(this.token)
    event.preventDefault()
    const form = event.target

    // api.post('/posts', { title: this.state.newPostTitle, content: this.state.newPostBody })
    api
      .post('/posts', { 
        title: store.getState().newPostTitle,
        content: store.getState().newPostBody,
        created_at: Date.now(),
        created_by: tokenDetails.email,
        likes: 0,
        dislikes: 0
      })
      .then((response) => {
          // const posts = [...this.state.posts, response.data]
          const posts = [...store.getState().posts, response.data]
          // this.setState({ posts, newPostTitle: '', newPostBody: '' })
          store.dispatch({ type: 'set_posts', posts, newPostTitle: '', newPostBody: '' })
          this.fetchPostings()
          form.elements.title.value = ""
          form.elements.content.value = ""
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  addLikes = (event) => {
    event.preventDefault()
    const form = event.target
    // Needs to be converted from a string to a number
    const likeNumber = Number(form.elements.likes.value)

    api
      .put(`/posts/${form.elements.id.value}`, {
        // _id: form.elements.id.value,
        likes: likeNumber + 1
      })
      .then(res => {
        this.fetchPostings()
      })
      .catch(error => {
        console.error(`Error adding likes to post: ${error}`)
      })
  }

  addDislikes = (event) => {
    event.preventDefault()
    const form = event.target
    // Needs to be converted from a string to a number
    const dislikeNumber = Number(form.elements.dislikes.value)

    api
      .put(`/posts/${form.elements.id.value}`, {
        dislikes: dislikeNumber + 1
      })
      .then(res => {
        this.fetchPostings()
      })
      .catch(error => {
        console.error(`Error adding dislikes to post: ${error}`)
    })
  }

  // POST request for comments on individual posts
  createComment = (event) => {
    const tokenDetails = this.token && decodeJWT(this.token)
    event.preventDefault()
    const form = event.target
    console.log(tokenDetails.email)

    api
      .post(`/posts/${form.elements.id.value}/comments`, {
        _id: form.elements.id.value,
        comments: { 
          body: form.elements.comments.value,
          createdAt: Date.now(),
          createdBy: tokenDetails.email,
          likes: 0,
          dislikes: 0
        }
      })
      .then(res => {
        form.elements.comments.value = ''
        this.fetchPostings()
      })
      .catch(error => {
        console.error(`Error updating post: ${error}`)
      })
  }

  // Deletes a Comment based on its id and the post ID
  deleteComment = (id, postId) => {
    // console.log('this is a delete button')
    // console.log(postId)
    // console.log(id)
    api
      .delete(`/posts/${postId}/comments/${id}`)
    const index = store.getState().posts.findIndex(comment => comment._id === id)

    if (index >= 0) {
      const posts = [...store.getState().posts]
      posts.splice(index, 1)
      store.dispatch({ type: 'set_posts', posts: posts })
    }
    
    this.fetchPostings()

  }

  addLikesComment = (event) => {
    event.preventDefault()
    // console.log('test')

    const form = event.target

    // console.log(form)

    const likeNumber = Number(form.elements.likes.value)
    // console.log(likeNumber)

    api
      .put(`/posts/${form.elements.postId.value}/comments/${form.elements.id.value}`, {
        likes: likeNumber + 1
      })
      .then(res => {
        this.fetchPostings()
      })
      .catch(error => {
        console.log(`Error adding likes to comment: ${error}`)
      })
  }

  addDislikesComment = (event) => {
    event.preventDefault()
    // console.log('test')
    const form = event.target
    // console.log(form)

    const dislikeNumber = Number(form.elements.dislikes.value)
    // console.log(likeNumber)

    api
      .put(`/posts/${form.elements.postId.value}/comments/${form.elements.id.value}`, {
        dislikes: dislikeNumber + 1
      })
      .then(res => {
        this.fetchPostings()
      })
      .catch(error => {
        console.log(`Error adding likes to comment: ${error}`)
      })
  }

  editComment = (event, postId) => {
    event.preventDefault()

    const form = event.target

    console.log(form)
    // console.log(id)
    // console.log(postId)

    api
      .put(`/posts/${form.elements.postId.value}/comments/${form.elements.id.value}`, {
        _id: form.elements.id.value,
        comment: form.elements.comment.value
    })
    .then(res => {
      this.fetchPostings()
      store.dispatch(setEditCommentAction(null))
    })
    .catch(error => {
      console.error(`Error updating post: ${error}`)
    })

  }

  // editPosts = (event) => {
  //   event.preventDefault()
  //   const form = event.target
  //   api
  //     .put(`/posts/${form.elements.id.value}`, {
  //       _id: form.elements.id.value,
  //       title: form.elements.title.value,
  //       content: form.elements.content.value
  //     })
  //     .then(res => {
  //       this.fetchPostings()
  //       store.dispatch(setEditingAction(null))
  //     })
  //     .catch(error => {
  //       console.error(`Error updating post: ${error}`)
  //     })
  // }

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
        <div className="Posting">
          <Router>
            <Fragment>
              <Route exact path="/" render={(props) => (
                <Redirect to="/login" />
              )} />

              <Route exact path="/login" render={(props) => {
                if (this.token) {
                  return (<Redirect to="/postings" />)
                } else {
                  return (
                    <Signin loginError={store.getState().loginError} 
                            goToRegister={this.goToRegister} 
                            handleSignIn={this.handleSignIn} 
                    />
                  )
                }
              }} />

              <Route exact path="/register" render={(props) => {
                return (
                  <Register backToLogin={this.backToLogin} 
                            registerError={store.getState().registerError} 
                            registerSuccess={store.getState().registerSuccess} 
                            handleRegister={this.handleRegister} 
                  />
                )
              }} />

              <Route exact path="/postings" render={() =>  {
                if (this.token) {
                  if (store.getState().editing) {
                    let post = store.getState().editing
                    return (
                      <EditPostForm key={post._id} post={post} editPosts={this.editPosts} removeEdit={this.removeEdit} />
                    )
                  } else if (store.getState().editComment) {
                    let comment = store.getState().editComment
                    console.log(comment)
                    return (
                      <EditCommentForm key={comment._id} comment={comment} editComment={this.editComment} />
                    )                    
                  } else {
                    return (
                      <Fragment>
                        <button className="logoutButton" onClick={this.handleSignOut}>Logout</button>
                        <h4 className="tokenEmail">Currently logged in as {tokenDetails.email}!</h4>
                          {/* <p>You logged in at: {new Date(tokenDetails.iat * 1000).toLocaleString()}</p> */}
                          {/* <p>Your token expires at: {new Date(tokenDetails.exp * 1000).toLocaleString()}</p> */}
                        <br />
                        <br />
                        <br />
                        <h1 className="mainTitle">Posting</h1>
                        <NewPost 
                          addPosts={this.addPosts} updateNewPostTitle={this.updateNewPostTitle} updateNewPostBody={this.updateNewPostBody}
                        />
                        <br />
                        <h2 className="mainTitle">Previous Posts</h2>
                        { posts.map((post) => 
                          <Post 
                            key={post._id} 
                            {...post} 
                            addLikes={this.addLikes} 
                            addDislikes={this.addDislikes} 
                            createComment={this.createComment}
                            addLikesComment={this.addLikesComment}
                            addDislikesComment={this.addDislikesComment}
                            deleteComment={this.deleteComment}
                            editComment={this.editComment}
                            tokenDetails={tokenDetails.email}
                          />
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
