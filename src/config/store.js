import { createStore } from 'redux'
// import { api } from '../api/init'
import deletePosts from './storeMethods'

// const deletePosts = (state, action) => {
//   api.delete(`/posts/${action.id}`)
//   const index = state.posts.findIndex(post => post._id === action.id)
//   if (index >= 0) {
//     const newPosts = [...state.posts]
//     newPosts.splice(index, 1)
//     return { ...state, posts: newPosts }
//   }
//   return state
// }

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