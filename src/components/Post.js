import React from 'react'
import store from '../config/store'
import { setEditingAction } from "../config/actions"
import '../styles/Post.css'

function Post (props) {
  const { _id, title, content, created_at, likes, dislikes, addLikes, deletePost} = props
  return (
    <div className="post">
      <h4 className="postTitle">{ title }</h4>
      <p>{ content }</p>
      <form onSubmit={addLikes}>
        <input type="hidden" name="likes" value={likes} />      
        <input type="hidden" name="id" value={_id} />      
        <button type="submit">Like</button>
      </form>
      <p>Likes: { likes }</p>
      <p>Dislikes: { dislikes }</p>
      <p>Created at: { created_at }</p>
      <button className="editButton" onClick={() => store.dispatch(setEditingAction(props))}>Edit Post</button>
      <button className="deleteButton" onClick={ () => store.dispatch({ type: 'delete_postings', id: _id }) }>Delete Post</button>
      {/* <button onClick={ () => {deletePost(_id)} }>Delete Post</button> */}
      <br />
      <br />
    </div> 
  )
}



export default Post