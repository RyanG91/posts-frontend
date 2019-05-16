import { createStore } from 'redux'

const initialState = {
  posts: [],
  newPostTitle: '',
  newPostBody: ''
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
    default:
      console.log(`Redux reducer: Action ${action.type} does not exist`)
      return state
  }
}

export default createStore(reducer, initialState)