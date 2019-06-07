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
          <input className="editTitle" type="text" name="title" defaultValue={post.title} />
          <br />
          <br />

          <label>Content: </label>
          <br />
          <textarea className="editContent" type="text" name="content" defaultValue={post.content} />
          <br />
          <input type="hidden" name="id" value={post._id} />
          <button className="editPost" type="submit">Update</button>
        </form>
        <br />
        <form onSubmit={removeEdit}>
          <button className="editPost">Back</button>
        </form>
      </div>
    </div>
  )
}