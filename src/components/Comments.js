import React from "react"
import api from '../api/init'

import "../styles/Comments.css"



function Comments(props) {

  const { _id, postId, body, createdBy, createdAt, likes, dislikes, deleteComment, addLikesComment } = props

  let commentTime = (new Date(createdAt)).toLocaleString('en-GB', { hour12: true })

  console.log(postId)

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
        <div>
          <button >Edit Comment</button>
          <button onClick={ () => {deleteComment(_id, postId)} } >Delete Comment</button>
          {/* <button onClick={deleteComment} >Delete Post</button> */}
        </div>

        <br />
      </div>
    )
  }

}

export default Comments