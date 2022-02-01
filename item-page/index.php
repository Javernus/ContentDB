<?php
  include '../importables/html-header.php';
?>


<div style='justify-content:left; padding-left: 5%; padding-right: 5%;' class="item-page" id="item-page">
    <div class='title'>
        <h1>Movie Name</h1>
    </div>
    <div id='itemlist' class="item-view">
      <div>
        <?php
          
          ini_set( 'error_reporting', E_ALL );
          ini_set( 'display_errors', true );

          if (isset($_COOKIE["UserID"])) {
            $UID = $_COOKIE;
          }
          else {
            // SET THIS TO FALSE
            // 
            // 
            // 
            // 
            // 
            $UID = 1;
          }

          $url = $_SERVER['REQUEST_URI'];

          // Use parse_url() function to parse the URL
          // and return an associative array which
          // contains its various components
          if (parse_url($url, PHP_URL_QUERY)) {
            $url_components = parse_url($url);
            // Use parse_str() function to parse the
            // st ring passed via URL
            parse_str($url_components['query'], $web_params);
            $FSID = $web_params["FSID"];
            
            include_once("../php/databaseLogin.php");
            $sql = 'CALL GetContentByFSID(:p0)';
            $stmt = $db->prepare($sql);
            $stmt->bindValue(":p0", $FSID, PDO::PARAM_INT);
            $stmt->execute();
            $results = $stmt->fetch();

            if ($UID) {
              $sql = 'CALL GetRating(:p0, :p1)';
              $stmt = $db->prepare($sql);
              $stmt->bindValue(":p0", $FSID, PDO::PARAM_INT);
              $stmt->bindValue(":p1", $UID, PDO::PARAM_INT);
              $stmt->execute();
              $rating=$stmt->fetch();
            }
            else {
              $rating=0;
            }
           

            if ($results) {
              echo "<item-view title='$results[1]' src='$results[2]' description='$results[3]' public_rating=$results[4] duration=$results[5] year=$results[6] private_rating=$rating></item-view>";
            } else {
              echo "Hm, looks like something went wrong!";
            }
          } else {
            echo 'Hm, looks like something went wrong!';
          }
          
        ?>
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
