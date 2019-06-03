import React from "react"
import '../styles/EditPostForm.css'

export default function EditPostForm({ post, editPosts, removeEdit }) {
  // console.log(`post: ${post}, editPost: ${editPosts}`)
  return (
    <div className="editBackground">
      <div className="editPostForm">
        <h2>Edit Posting</h2>
        <form onSubmit={editPosts}>
          <label>Title: </label>
          <br />
          <input className="titleBox" type="text" name="title" defaultValue={post.title} />
          <br />
          <br />

          <label>Content: </label>
          <br />
          <textarea className="contentBox" type="text" name="content" defaultValue={post.content} />
          <br />
          <input type="hidden" name="id" value={post._id} />
          <button className="createPost" type="submit">Update</button>
        </form>
        <br />
        <form onSubmit={removeEdit}>
          <button className="createPost">Back</button>
        </form>
      </div>
    </div>
  )
}