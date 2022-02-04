<?php
/*
 * This is the main file associated with the page shown when a movie or series is clicked.
 * It makes use of custom web components in order to provide scalability and portability.
 * Eventlisteners are used to catch events dispatched in these components, so that the changes
 * can be reflected in the database.
 *
 * Written by Timo.
 * 
 */

  $url = $_SERVER['REQUEST_URI'];

  // Use parse_url() function to parse the URL
  // and return an associative array which
  // contains its various components
  if (parse_url($url, PHP_URL_QUERY)) {
    $url_components = parse_url($url);

    // Use parse_str() function to parse the
    // st ring passed via URL
    parse_str($url_components['query'], $web_params);

    $FSID = (int) $web_params["FSID"];
  }

  if (isset($_COOKIE["UserID"])) {
    $UID = $_COOKIE["UserID"];
  }
  else {
    $UID = "null";
  }

  include("../php/FSIDExists.php");

  if (!$fsid_exists) {
    include ("../error/404.php");
    exit();
  }

  include '../importables/html-header.php';
?>

<div class="item-page" id="item-page">
    <div id='itemlist' class="item-view">
    </div>
    <h2 class="commentheading">Comments</h2>


        <script>
          const FSID = <?php echo $FSID; ?>;
          const UID = <?php echo $UID; ?>;
          const dataUF = {fsid: FSID, uid : UID};


          /* This function handles watch list changes. */

          function handleWatchlistChange(event) {
            let watchlist = 0;

            switch (event.detail.value) {
              case "To Watch":
                watchlist = 1;
                break;
              case "Watching":
                watchlist = 2;
                break;
              case "Watched":
                watchlist = 3;
                break;
              default:
                watchlist = 4;
            }

            const dataUFW = { fsid: FSID, uid: UID, watchlist: watchlist };

            postFetch("../php/FSIDinWatchlist.php", dataUF, false, (res) => {
              /* Check if user already has this item in this watch list. */
              if ((res == watchlist) || (res == "" && watchlist == 4)) {
                return;
              }

              /* Add an item to a watch list. */
              if (res == "") {
                postFetch("../php/addFSIDtoWatchlist.php", dataUFW, false, (result) => {});
                return;
              }

              /* Remove from watchlist. */
              if (watchlist == 4) {
                postFetch("../php/removeFSIDfromWatchlist.php", dataUF, false, (result) => {});
                return;
              }

              /* Move an item from one watch list to another. */
              postFetch("../php/removeFSIDfromWatchlist.php", dataUF, false, (result) => {});
              postFetch("../php/addFSIDtoWatchlist.php", dataUFW, false, (result) => {});
              return;
            });
            }


          if (<?php echo $UID ?>) {
            /* Div containing the user comment input and button. */
            const userCommentElement = document.createElement("div");
            userCommentElement.classList.add("comment__user");
            document.getElementById("item-page").appendChild(userCommentElement);

            /* Textarea in which the user can type. */
            const commentInput = document.createElement("cdb-input");
            commentInput.setAttribute("type", "text");
            commentInput.setAttribute("placeholder", "Write a comment...");
            commentInput.id = "commentInput";
            userCommentElement.appendChild(commentInput);

            /* Button to post the comment. */
            const postButtonElement = document.createElement("cdb-button");
            postButtonElement.setAttribute("label", "Submit!");

            /* Comment on enter. */
            commentInput.addEventListener("keypress", function(event) {
              if (event.keyCode == 13) {
                addComment(commentInput.value, UID, FSID);
                commentInput.setAttribute("value", "");
              }
            });

            /* Comment on enter. */
            postButtonElement.addEventListener("click", function() {
              addComment(commentInput.value, UID, FSID);
              commentInput.setAttribute("value", "");
            });

            userCommentElement.appendChild(postButtonElement);
          }

            /* This function handles rating changes. */
            function handleRatingChange(event) {
              postFetch("../php/getRating.php", dataUF, false, (result) => {
                const ratingData = { fsid: FSID, uid: UID, rating: event.detail.value };

                if (result === "" || result === "false") {
                  postFetch("../php/setRating.php", ratingData, false, (result) => {
                    return;
                  });
                } else {
                  postFetch("../php/updateRating.php", ratingData, false, (result) => {
                    return;
                  });
                }
              });
            }


            /* Handles a favourites change. */
            function handleFavouritesChange(event) {
              postFetch("../php/checkFavourite.php", dataUF, false, (res) => {
                if (res) {
                  postFetch("../php/removeFavourite.php", dataUF, false, (res) => {
                    return;
                  });
                }
                else {
                  postFetch("../php/addFavourite.php", dataUF, false, (res) => {
                    return;
                  });
                }
              });
            }

          if (FSID) {
            postFetch("../php/getContent.php", dataUF, true, (res) => {
              const itemElement = document.createElement("cdb-content-card");
              itemElement.setAttribute("title", res[1]);
              itemElement.setAttribute("src", res[2]);
              itemElement.setAttribute("description", res[3]);
              itemElement.setAttribute("public_rating", res[4]);

              UID && postFetch("../php/getRating.php", dataUF, false, (res) => {
                itemElement.setAttribute("private_rating", rating = res ? res : 0);
              });

              UID && postFetch("../php/getWatchlistState.php", dataUF, false, (res) => {
                itemElement.setAttribute("watchlist", res ? res : 2);
              });

              itemElement.setAttribute("duration", res[5]);
              itemElement.setAttribute("year", res[6]);
              itemElement.setAttribute("logged_in", UID ? true : false);

              postFetch("../php/checkFavourite.php", dataUF, false, (res) => {
                itemElement.setAttribute("favourite", res);
              });

              itemElement.addEventListener("watchlistchange", handleWatchlistChange);
              itemElement.addEventListener("ratingchange", handleRatingChange);
              itemElement.addEventListener("favouriteschange", handleFavouritesChange);
              document.getElementById("itemlist").appendChild(itemElement);
            });

          }

            /*
            * Create a comment client side, and send the comment data to the database.
            * Written by Timo.
            */

          function addComment(comment, uid, fsid) {
            commentElement = document.createElement('cdb-comment');
            commentElement.setAttribute("content", comment);
            commentElement.setAttribute("timestamp", "now");

            postFetch("../php/getUserNameByUID.php", { uid: uid }, false, (res) => {
                commentElement.setAttribute("username", res);
            });

            document.getElementById("comment-section").appendChild(commentElement);
            /* Send comment data to the database. */

            postFetch("../php/postComment.php", { content: comment, uid: uid, fsid: fsid }, false, () => {});
          }

            let count = 0;
            postFetch("../php/getCommentAmount.php", dataUF, false, (res) => {
              count = res ? res : 0;
            });

            postFetch("../php/getComments.php", dataUF, true, (res) => {
              if (res != "false") {
                for (let i = 0; i < Math.min(20, count); i++) {
                  const commentElement = document.createElement("cdb-comment");
                  commentElement.setAttribute("content", res[i]["Comment"]);
                  commentElement.setAttribute("timestamp", res[i]["Date"]);
                  (res[i]["UID"] === UID || isAdmin) && commentElement.setAttribute("cid", res[i]["CID"]);

                  postFetch("../php/getUserNameByUID.php", { uid: res[i]["UID"] }, false, (result) => {
                    commentElement.setAttribute("username", result);
                    document.getElementById('comment-section').appendChild(commentElement);
                  });
                }
              }
            });
        </script>

        <div id="comment-section">
    </div>
  </div>
<?php
  include '../importables/html-footer.php';
?>
