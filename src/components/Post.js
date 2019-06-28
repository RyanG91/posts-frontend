import React from 'react'
import store from '../config/store'
import { setEditingAction } from "../config/actions"
import Comments from "./Comments"
import '../styles/Post.css'

function Post (props) {
  const { _id, title, content, created_by, created_at, likes, comments, dislikes, addLikes, addDislikes, createComment, deletePost} = props
  return (
    <div className="post">

{/* Post details */}

      <p className="createdByAndAt"><strong>{ created_by }</strong> says at <strong>{ created_at }</strong></p>
      <h4 className="postTitle">{ title }</h4>
      <p className="postContent">{ content }</p>
      <br />
      <div className="editAndDeleteButtons">
        <button className="editButton" onClick={() => store.dispatch(setEditingAction(props))}>Edit Post</button>
        <button className="deleteButton" onClick={ () => store.dispatch({ type: 'delete_postings', id: _id }) }>Delete Post</button>
      </div>
      <br />

{/* Post features */}

      <div className="postFeatures">
        <form onSubmit={addLikes}>
          <input type="hidden" name="likes" value={likes} />      
          <input type="hidden" name="id" value={_id} />      
          <button className="postFeaturesButton" type="submit">Like</button>
        </form>
      </div>
      <div className="postFeatures">
        <p className="likeCounter">Likes: { likes }</p>
      </div>
      <div className="postFeatures">
        <form onSubmit={addDislikes}>
          <input type="hidden" name="dislikes" value={dislikes} />      
          <input type="hidden" name="id" value={_id} />      
          <button className="postFeaturesButton" type="submit">Dislike</button>
        </form>
      </div>
      <div className="postFeatures">
        <p className="dislikeCounter">Dislikes: { dislikes }</p>
      </div>
      <div className="postFeaturesRight">
        <p className="commentsCounter">Comments: { comments.length } </p>
        {/* <button onClick={ () => {deletePost(_id)} }>Delete Post</button> */}
      </div>
      <br />
      <br />
      <br />

{/* Comments section */}

      <form onSubmit={createComment}>
        <input type="text" name="comments" />
        <input type="hidden" name="id" value={_id} />
        <button className="postFeaturesButton" type="submit">Create comment</button>
      </form>
      <br />
      <h4 className="commentsTitle">Comments</h4>
      <div className="commentsArea">
        { 
          comments.length === 0 ? <p>There are no comments</p> : comments.map(comment => (
            <Comments key={comment._id} {...comment} />
          ))
        }
      </div>

    </div> 
  )
}



export default Post