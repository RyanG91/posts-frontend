import { createStore } from 'redux'
import deletePosts from './storeMethods'

const initialState = {
  posts: [],
  newPostTitle: '',
  newPostBody: '',
  loggedIn: false,
  loginError: null
}

// Define reducers
// Redux will invoke the reducers whenever an action
// is dispatched
const reducer = (state, action) => {
// Accepts the current state and an action
// Returns the new state
  switch (action.type) {
    case 'set_posts':
      return { ...state, posts: action.posts }
    case 'set_loginError':
      return { ...state, loginError: action.loginError }
    case 'set_loggedIn':
      return { ...state, loggedIn: action.loggedIn }

    case 'set_newPostTitle':
      return { ...state, newPostTitle: action.newPostTitle }
    case 'set_newPostBody':
      return { ...state, newPostBody: action.newPostBody }
    case 'delete_postings':
      return deletePosts(state, action)
    default:
      console.log(`Redux reducer: Action ${action.type} does not exist`)
      return state
  }
}

export default createStore(reducer, initialState)