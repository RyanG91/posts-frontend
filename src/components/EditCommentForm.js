import React from "react"

export default function EditPostForm({ comment, editComment, removeEditComment }) {
  // console.log(`comment: ${comment} and ${comment.postId}`)
  return (
    <div>
      <div>
        <h2>Edit Comment</h2>

{/* Form to update a particualr comment */}

        <form onSubmit={editComment}>
          <label>Comment: </label>
          <br />
          <input type="text" name="comment" defaultValue={comment.body} />
          <br />
          <input type="hidden" name="id" value={comment._id} />
          <input type="hidden" name="postId" value={comment.postId} />
          <button type="submit">Update</button>
        </form>
        <br />

{/* Goes back without making changes */}

        <form onSubmit={removeEditComment}>
          <button type="submit">Back</button>
        </form>
      </div>
    </div>
  )
}