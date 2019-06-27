import React from "react"
import "../styles/Comments.css"

function Comments(props) {
  const { _id, body } = props
  if (body === null) {
    return (
      <div className="commentsSection">
        <p>There are no comments yet</p>
      </div>
    )
  } else {
    return (
      <div className="commentsSection">
        <p>{body}</p>
      </div>
    )
  }

}

export default Comments