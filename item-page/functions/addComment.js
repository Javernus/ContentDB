/* 
 * Create a comment client side, and send the comment data to the database. 
 * Written by Timo.
 */


function addComment(comment, uid, fsid) {
    commentElement = document.createElement('movie-comment');
    commentElement.setAttribute("content", comment);
    /* Get username by UID. */
    const data = {uid : uid};
    postFetch("../php/getUserNameByUID.php", data, false, (res) => {
        commentElement.setAttribute("username", res);
    });
    document.getElementById("comment-section").appendChild(commentElement);
    /* Send comment data to the database. */

    const data2 = {content:comment, uid:uid, fsid:fsid};
    postFetch("../php/postComment.php", data2, false, (res) => {
    });
}