import React from "react"
import "../styles/Comments.css"

function Comments(props) {
  console.log('test')
  const { _id, body, createdBy, createdAt } = props
  // console.log(createdBy)
  if (body === null) {
    return (
      <div className="commentsSection">
        <p>There are no comments yet</p>
      </div>
    )
  } else {
    return (
      <div className="commentsSection">
        <p><strong>{createdBy}</strong> commented at: {createdAt} </p>
        <p>{body}</p>
      </div>
    )
  }

}

export default Comments