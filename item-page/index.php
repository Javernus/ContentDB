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

<div style='justify-content:left; padding-left: 5%; padding-right: 5%;' class="item-page" id="item-page">
    <div class='title'>
        <h1>Movie Name</h1>
    </div>
    <div id='itemlist' class="item-view">
      <div>

        <script>
          const FSID = <?php echo $FSID?>;
          const UID = <?php echo $UID?>;
  
          const data = { fsid: FSID };

          const data2 = { fsid : FSID, uid: UID};
          let rating = 0;
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

              document.getElementById("itemlist").appendChild(itemElement);
            });
          }
        </script>
      </div>
    </div>
      <div class="comment" id='comment-section'>
        <script>
          if (UID) {
            /* Div containing the user comment input and button. */
            UserCommentElement = document.createElement("div");
            UserCommentElement.classList.add("comment__user");
            document.getElementById("comment-section").appendChild(UserCommentElement);

            /* Textarea in which the user can type. */
            UserInputElement = document.createElement("textarea");
            UserInputElement.classList.add("comment__input");
            UserInputElement.setAttribute("type", "text");
            UserInputElement.setAttribute("placeholder", "Write a comment.");
            UserInputElement.id = "commentInput";
            UserCommentElement.appendChild(UserInputElement);

            /* Button to post the comment. */
            PostButtonElement = document.createElement("button");
            PostButtonElement.classList.add("comment__submit");
            PostButtonElement.setAttribute("type", "submit");
            PostButtonElement.textContent = "Add Comment";
            PostButtonElement.addEventListener("click", function() {addComment(UserInputElement.value, <?php echo $UID ?>, <?php echo $FSID ?>)});
            UserCommentElement.appendChild(PostButtonElement);
          }
        </script>
      </div>

    <!-- <script>
      /* Scrips by Timo. Here the comments are loaded in consecutively. */
      for (let i = 0; i < 5; i++) {
        const comment_element = document.createElement("div");
        comment_element.innerHTML = '<movie-comment content="asd" username="test" timestamp="12-02-2019"></movie-comment>';
        document.getElementById('comment-section').appendChild(comment_element);
      }
      </script> -->
</div>


<?php
  include '../importables/html-footer.php';
?>
