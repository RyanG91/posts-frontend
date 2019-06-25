import React from "react"

function Comments(props) {
  const { _id, body } = props
  return (
    <div>
      <p>
        {body}
      </p>
    </div>
  )
}

export default Comments