import React from 'react'
import store from '../config/store'
import { setEditingAction } from "../config/actions"
import '../styles/Post.css'

function Post (props) {
  const { _id, title, content, deletePost} = props
  return (
    <div className="post">
      <h4>{ title }</h4>
      <p>{ content }</p>
      <button className="editButton" onClick={() => store.dispatch(setEditingAction(props))}>Edit Post</button>
      <button className="deleteButton" onClick={ () => store.dispatch({ type: 'delete_postings', id: _id }) }>Delete Post</button>
      {/* <button onClick={ () => {deletePost(_id)} }>Delete Post</button> */}
      <br />
      <br />
    </div> 
  )
}



export default Post