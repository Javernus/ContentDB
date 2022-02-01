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
    $UID = $_COOKIE;
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


<script>
  const FSID = <?php echo $FSID?>;
  const UID = <?php echo $UID?>;
  
 // CHECK IF FSID EXISTS 
 data = { FSID : FSID};
  postFetch("../php/checkFSID.php", data, false, (res) => {
    alert(res);
  });
</script>

<div style='justify-content:left; padding-left: 5%; padding-right: 5%;' class="item-page" id="item-page">
    <div class='title'>
        <h1>Movie Name</h1>
    </div>
    <div id='itemlist' class="item-view">
      <div>

        <script>
          const data = { FSID: FSID };

          const data2 = { FSID:FSID, UID:UID};
          let rating = 0;
          if (UID) {
            postFetch("../php/getRating.php", data2, false, (res) => {
              console.log(res);
              rating = res;
            });
          }
          else {
            rating = 0;
          }

          if (FSID) {
            postFetch("../php/getContent.php", data, true, (res) => {
              console.log(res);
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
      <?php 
        $HTML = '<div class="comment__user">';
        $HTML .= '<textarea type="text" class="comment__input"';
        $HTML .= 'placeholder="Write a comment." id="commentInput"></textarea>';
        $HTML .= '<button onclick="addComment(' . strval($UID) . ' , ';
        $HTML .= 'document.getElementById(`commentInput`).value)"';
        $HTML .= 'class=`comment__submit` type="submit">Add Comment';
        $HTML .= '</button></div>';
        echo $HTML;
        ?>  
              
        <!-- // if ($UID) {
        //   echo `<div class="comment__user">
        //   <textarea type="text" class="comment__input" placeholder="Write a comment." id="commentInput"></textarea><button onclick="addComment(, document.getElementById('commentInput').value)" class='comment__submit' type="submit">Add Comment</button>
        // </div>`;
        // } -->
      
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
