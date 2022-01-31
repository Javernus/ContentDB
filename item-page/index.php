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
          $url = $_SERVER['REQUEST_URI'];

          // Use parse_url() function to parse the URL
          // and return an associative array which
          // contains its various components
          $url_components = parse_url($url);

          // Use parse_str() function to parse the
          // st ring passed via URL
          parse_str($url_components['query'], $web_params);
          $FSID = $web_params["FSID"];
          // const data = { 'FSID': $web_params["FSID"] };
          
          include_once("../php/databaseLogin.php");
          $sql = 'CALL fsGetContentByFSID(:p0)';
          $stmt = $db->prepare($sql);
          $stmt->bindValue(":p0", $FSID, PDO::PARAM_STR);
          $stmt->execute();
          $results = $stmt->fetch();

          // echo "$results[1]";
          // for ($i = 0; $i <= count($results); $i++) {
          //   echo "$results[$i]";
          //   echo "  b   ";
          // }
          if ($results) {
            echo "<item-view title='$results[1]' src='$results[2]' description='$results[3]' public-rating='4' duration=$results[5] year=$results[6] private-rating=''></item-view>";
          } else {
            echo "Hm, looks like something went wrong!";
          }

          



          // if (in_array('FSID', $web_params)) {
          //   $stmt = "{ CALL GetContent(?,?)}";
          //   $params = $web_params["FSID"]
          //   $result = sqlrsv_query($conn,$stmt,$params);
          //   sqlrsv_close($conn);
          // }
          // else {
          //   echo "Oops. Something went wrong!";            
          // }
        ?>
      </div>
    </div>
<!-- 
    <div class="comment" id='comment-section'>
      <div class="comment__user">
        <textarea type="text" class="comment__input" placeholder="Write a comment." id="commentInput"></textarea><button v-on:click="addComment()" class='comment__submit' type="submit">Add Comment</button>
      </div>
      
      

    </div> -->
<!-- 
    <script>
        /* Scripts by Timo. Here we load the movie item and display it. */
        const item_element = document.createElement('div');
        item_element.innerHTML = '<item-view title="Spoder" src="./image/Spiderman.png" public-rating="" private-rating="3" id="private-rating" duration="146" year="2012" description="test"></item-view>';
        document.getElementById('itemlist').appendChild(item_element);
    </script> -->

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
