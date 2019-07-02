import React from "react"
import "../styles/Comments.css"

function Comments(props) {

  const { _id, body, createdBy, createdAt } = props

  let commentTime = (new Date(createdAt)).toLocaleString('en-GB', { hour12: true })

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
      </div>
    )
  }

}

export default Comments