import React from 'react'
import store from '../config/store'
import { setEditingAction } from "../config/actions"
import Comments from "./Comments"
import '../styles/Post.css'

function Post (props) {
  const { 
    _id, 
    title, 
    content, 
    created_by, 
    created_at, 
    likes, 
    comments, 
    dislikes, 
    addLikes, 
    addDislikes, 
    createComment, 
    addLikesComment,
    deleteComment,
    tokenDetails,
    deletePost
  } = props
  
  let postTime = (new Date(created_at)).toLocaleString('en-GB', { hour12: true })
  
  return (
    <div className="post">

{/* Post details */}

      <p className="createdByAndAt"><strong>{ created_by }</strong> says at <strong>{ postTime }</strong></p>
      <h4 className="postTitle">{ title }</h4>
      <p className="postContent">{ content }</p>
      { tokenDetails === created_by ?
        <div className="editAndDeleteButtons">
          <button className="editButton" onClick={() => store.dispatch(setEditingAction(props))}>Edit Post</button>
          <button className="deleteButton" onClick={ () => store.dispatch({ type: 'delete_postings', id: _id }) }>Delete Post</button>
          {/* <button onClick={ () => {deletePost(_id)} }>Delete Post</button> */}
        </div> :
        <p></p>
      }
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
      </div>
      <br />
      <br />
      <br />

{/* Comments section */}

      <form onSubmit={createComment}>
        <input type="text" name="comments" placeholder="150 characters max" maxLength="150" />
        <input type="hidden" name="id" value={_id} />
        <button className="postFeaturesButton" type="submit">Create comment</button>
      </form>
      <br />
      <h4 className="commentsTitle">Comments</h4>
      <div className="commentsArea">
        { 
          comments.length === 0 ? <p>There are no comments</p> : comments.map(comment => (
            <Comments 
              key={comment._id} 
              {...comment} 
              postId={_id} 
              deleteComment={deleteComment} 
              addLikesComment={addLikesComment}
              tokenDetails={tokenDetails}
            />
          ))
        }
      </div>

    </div> 
  )
}



export default Post