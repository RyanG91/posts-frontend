import React from 'react'
import store from '../config/store'
import { setEditingAction } from "../config/actions"
import '../styles/Post.css'

function Post (props) {
  const { _id, title, content, created_by, created_at, likes, dislikes, addLikes, addDislikes, deletePost} = props
  return (
    <div className="post">
      <p className="createdByAndAt"><strong>{ created_by }</strong> says at <strong>{ created_at }</strong></p>
      <br />
      <h4 className="postTitle">{ title }</h4>
      <br />
      <br />
      <br />

      <p className="postContent">{ content }</p>
      <br />
      <button className="editButton" onClick={() => store.dispatch(setEditingAction(props))}>Edit Post</button>
      <button className="deleteButton" onClick={ () => store.dispatch({ type: 'delete_postings', id: _id }) }>Delete Post</button>
      <br />
      <br />
      <br />
      <br />
      <div className="postBottom">
        <form onSubmit={addLikes}>
            <input type="hidden" name="likes" value={likes} />      
            <input type="hidden" name="id" value={_id} />      
            <button className="likeButton" type="submit">Like</button>
          </form>
          <p className="likeCounter">Likes: { likes }</p>
          <form onSubmit={addDislikes}>
            <input type="hidden" name="dislikes" value={dislikes} />      
            <input type="hidden" name="id" value={_id} />      
            <button className="dislikeButton" type="submit">Dislike</button>
          </form>
          <p className="dislikeCounter">Dislikes: { dislikes }</p>
          {/* <button onClick={ () => {deletePost(_id)} }>Delete Post</button> */}
      </div>
    </div> 
  )
}



export default Post