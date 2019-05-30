import React from 'react'

export default function NewPost({ addPosts, updateNewPostTitle, updateNewPostBody }) {
  return (
    <div>
      <h2>New Post</h2>
      <form onSubmit={addPosts}>
        <label>Title:</label><br /><input onChange={updateNewPostTitle} /><br />
        <label>Content:</label><br /><input onChange={updateNewPostBody} /><br />
        <input type="submit" value="Submit" />
      </form>
    </div>
  )
}