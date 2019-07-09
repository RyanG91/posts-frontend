import React from "react"

export default function EditPostForm({ comment, editComment, removeEdit }) {
  console.log(`comment: ${comment} and ${comment.postId}`)
  return (
    <div>
      <div>
        <h2>Edit Comment</h2>
        <form onSubmit={editComment}>
          <label>Comment: </label>
          <br />
          <input type="text" name="comment" defaultValue={comment.body} />
          <br />
          <input type="hidden" name="id" value={comment._id} />
          <input type="hidden" name="postId" value={comment.postId} />
          {/* <input type="hidden" name="postId" value={post._id} /> */}
          <button type="submit">Update</button>
        </form>
        <br />
        <form>
          <button>Back</button>
        </form>
      </div>
    </div>
  )
}