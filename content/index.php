<?php
  ini_set( 'error_reporting', E_ALL );
  ini_set( 'display_errors', true );



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

        <script>
          const FSID = <?php echo $FSID?>;
          const UID = <?php echo $UID?>;

          /* This function handles watch list changes. */

          function handleWatchlistChange(event) {
            const data5 = {fsid: FSID, uid : UID};
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
            const data6 = {fsid: FSID, uid : UID, watchlist : watchlist};


            postFetch("../php/FSIDinWatchlist.php", data5, false, (res) => {

              /* Check if user already has this item in this watch list. */
              if ((res == watchlist) || (res == "" && watchlist == 4)) {
                return;
              }

              /* Add an item to a watch list. */

              if (res == "") {
                postFetch("../php/addFSIDtoWatchlist.php", data6, false, (result) => {
                });
                return;
              }

              /* Remove from watchlist. */
              if (watchlist == 4) {
                postFetch("../php/removeFSIDfromWatchlist.php", data5, false, (result) => {
                  consolelog(result);
                });
                return;
              }

              /* Move an item from one watch list to another. */
              postFetch("../php/removeFSIDfromWatchlist.php", data5, false, (result) => {
              });
              postFetch("../php/addFSIDtoWatchlist.php", data6, false, (result) => {
              });
              return;
            });
            }

            /* This function handles rating changes. */
            function handleRatingChange(event) {
              const data7 = {fsid:<?php echo $FSID; ?>, uid:<?php echo $UID; ?>};
              postFetch("../php/getRating.php", data7, false, (result) => {
                const data6 = {fsid:FSID, uid:UID, rating: event.detail.value};
                if (result=="") {
                  postFetch("../php/setRating.php", data6, false, (result) => {
                    return;
                  });
                }
                else {
                  postFetch("../php/updateRating.php", data6, false, (result) => {
                    return;
                  });
                }
              });
            }


            /* Handles a favourites change. */
            function handleFavouritesChange(event) {
              const data = {fsid: FSID, uid:UID};
              postFetch("../php/checkFavourite.php", data, false, (res) => {
                if (res) {
                  postFetch("../php/removeFavourite.php", data, false, (res) => {
                    return;
                  });
                }
                else {
                  postFetch("../php/addFavourite.php", data, false, (res) => {
                    return;
                  });
                }
              });
            }

          const data = { fsid: FSID };

          const data2 = { fsid : FSID, uid: UID};

          let rating = 1;
          if (UID) {
            postFetch("../php/getRating.php", data2, false, (res) => {
              rating = res;
            });
          }
          else {
            rating = 0;
          }
          if (FSID) {
            postFetch("../php/getContent.php", data, true, (res) => {
              const itemElement = document.createElement("item-view");
              itemElement.setAttribute("title", res[1]);
              itemElement.setAttribute("src", res[2]);
              itemElement.setAttribute("description", res[3]);
              itemElement.setAttribute("public_rating", res[4]);
              itemElement.setAttribute("private_rating", rating);
              itemElement.setAttribute("duration", res[5]);
              itemElement.setAttribute("year", res[6]);
              itemElement.setAttribute("logged_in", <?php echo $UID ? "true" : "false" ?>);
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
          </script>

    </div>
    <h2 class="commentheading">Comments</h2>
          <script>

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

            postButtonElement.addEventListener("click", function() {
              addComment(commentInput.value, <?php echo $UID ?>, <?php echo $FSID ?>)
            });

            userCommentElement.appendChild(postButtonElement);
          }
        </script>
        <div id="comment-section">
      </div>
      </div>


    <script>
    /* Scripts by Timo. */
      let count = 0;
      const data3 = { fsid : <?php echo $FSID ? $FSID : -1; ?>};
      postFetch("../php/getCommentAmount.php", data3, false, (res) => {
        count = res;
      });

      postFetch("../php/getComments.php", data3, true, (res) => {
        if (res != "false") {
          for (let i = 0; i < Math.min(20, count); i++) {

            const commentElement = document.createElement("cdb-comment");
            commentElement.setAttribute("content", res[i]["Comment"]);
            commentElement.setAttribute("timestamp", res[i]["Date"]);

            let data4 = {"uid" : res[i]["UID"]};
            postFetch("../php/getUserNameByUID.php", data4, false, (result) => {
              commentElement.setAttribute("username", result);
              document.getElementById('comment-section').appendChild(commentElement);
            });
          }
        }
      });
      </script>
<?php
  include '../importables/html-footer.php';
?>
