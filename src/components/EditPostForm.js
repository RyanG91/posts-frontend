import React from "react"

export default function EditPostForm({ post, editPosts, removeEdit }) {
  // console.log(`post: ${post}, editPost: ${editPosts}`)
  return (
    <div>
      <form onSubmit={editPosts}>
        <label>
          Title: <input type="text" name="title" defaultValue={post.title} />
        </label>
        <br />
        <label>
          Content: <input type="text" name="content" defaultValue={post.content} />
        </label>
        <br />
        <input type="hidden" name="id" value={post._id} />
        <button type="submit">Update</button>
      </form>
      <form onSubmit={removeEdit}>
        <button>Back</button>
      </form>
    </div>

  )
}