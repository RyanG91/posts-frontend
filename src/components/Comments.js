import React from "react"
import "../styles/Comments.css"

function Comments(props) {
  const { _id, body } = props
  return (
    <div className="commentsSection">
      <p>{body}</p>
    </div>
  )
}

export default Comments