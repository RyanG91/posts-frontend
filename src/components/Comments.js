import React from "react"
import api from '../api/init'

import "../styles/Comments.css"



function Comments(props) {

  const { 
    _id,
    postId,
    body,
    tokenDetails,
    createdBy,
    createdAt,
    likes,
    dislikes,
    deleteComment,
    addLikesComment,
    addDislikesComment
  } = props

  let commentTime = (new Date(createdAt)).toLocaleString('en-GB', { hour12: true })

  // console.log(postId)

  if (body === null) {
    return (
      <div className="commentsSection">
        <p>There are no comments yet</p>
      </div>
    )
  } else {
    return (
      <div className="commentsSection">
        <p><strong>{createdBy}</strong> commented at: {commentTime} </p>
        <p>{body}</p>
        <br />
        { 
          tokenDetails === createdBy ?
            <div>
              <button className="editComment">Edit Comment</button>
              <button className="deleteComment" onClick={ () => {deleteComment(_id, postId)} } >Delete Comment</button>
            </div>
          :
            <p></p>
        }
        <br />
        <div className="commentFeatures">
          <form onSubmit={addLikesComment}>
            <input type="hidden" name="likes" value={likes} />
            <input type="hidden" name="id" value={_id} />
            <input type="hidden" name="postId" value={postId} />
            <button className="postFeaturesButton" type="submit">Like</button>
          </form>
        </div>
        <div className="commentFeatures">
          <p className="likeCommentCounter">Likes: {likes}</p>
        </div>
        <div className="commentFeatures">
          <form onSubmit={addDislikesComment}>
            <input type="hidden" name="dislikes" value={dislikes} />
            <input type="hidden" name="id" value={_id} />
            <input type="hidden" name="postId" value={postId} />
            <button className="postFeaturesButton" type="submit">Dislike</button>
          </form>
        </div>
        <div className="commentFeatures">
          <p className="dislikeCommentCounter">Dislikes: {dislikes}</p>
        </div>
      </div>
    )
  }

}

export default Comments