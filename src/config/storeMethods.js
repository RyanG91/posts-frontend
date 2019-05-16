import { api } from '../api/init'

const deletePosts = (state, action) => {
  api.delete(`/posts/${action.id}`)
  const index = state.posts.findIndex(post => post._id === action.id)
  if (index >= 0) {
    const newPosts = [...state.posts]
    newPosts.splice(index, 1)
    return { ...state, posts: newPosts }
  }
  return state
}

export default deletePosts