import React from 'react'
import '../styles/NewPost.css'

export default function NewPost({ addPosts, updateNewPostTitle, updateNewPostBody }) {
  return (
    <div className="newPost">
      <h2 className="mainTitle">New Post</h2>
      <form onSubmit={addPosts}>
        <label>Title: </label><br /><input className="titleBox" type="text" name="title" onChange={updateNewPostTitle} /><br />
        <br />
        <label>Content: </label><br /><textarea maxLength="500" className="contentBox" type="text" name="content" onChange={updateNewPostBody} /><br />
        <br />
        <button className="createPost" type="submit">Create</button>
      </form>
    </div>
  )
}