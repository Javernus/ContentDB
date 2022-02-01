function addComment(UID, Comment) {
    COMMENT = document.createElement('div');
    COMMENT.textContent = Comment;
    document.body.appendChild(COMMENT);
}