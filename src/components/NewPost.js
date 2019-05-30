import React from 'react'

export default function NewPost({ addPosts, updateNewPostTitle, updateNewPostBody }) {
  return (
    <div>
      <h2>New Post</h2>
      <form onSubmit={addPosts}>
        <label>Title:</label><br /><input type="text" name="title" onChange={updateNewPostTitle} /><br />
        <label>Content:</label><br /><input type="text" name="content" onChange={updateNewPostBody} /><br />
        <button type="submit">Create</button>
      </form>
    </div>
  )
}