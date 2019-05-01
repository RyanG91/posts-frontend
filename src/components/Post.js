import React from 'react'

function Post (props) {
  const { _id, title, content, deletePost} = props
  return (
    <div>
      <h4>{ title }</h4>
      <p>{ content }</p> 
      <button onClick={ () => {deletePost(_id)} }>Delete Post</button>
      <br />
      <br />
    </div> 
  )
}



export default Post