export function setEditingAction(editing) {
  return {
    type: "set_editing",
    editing
  }
}

export function setEditCommentAction(editComment) {
  return {
    type: "set_editComment",
    editComment
  }
}
