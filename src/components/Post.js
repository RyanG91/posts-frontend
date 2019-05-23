import React from 'react'
import store from '../config/store'

function Post (props) {
  const { _id, title, content, deletePost} = props
  return (
    <div>
      <h4>{ title }</h4>
      <p>{ content }</p>
      <button>Edit Post</button>
      <button onClick={ () => store.dispatch({ type: 'delete_postings', id: _id }) }>Delete Post</button>
      {/* <button onClick={ () => {deletePost(_id)} }>Delete Post</button> */}
      <br />
      <br />
    </div> 
  )
}



export default Post