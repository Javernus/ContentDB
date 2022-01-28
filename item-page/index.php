<?php
  include '../importables/html-header.php';
?>


<div style='justify-content:left; padding-left: 5%; padding-right: 5%;' class="item-page" id="item-page">
    <div class='title'>
        <h1>Movie Name</h1>
    </div>
    <div id='itemlist' class="item-view">
    </div>

    <div class="comment" id='comment-section'>
      <div class="comment__user">
        <textarea type="text" class="comment__input" placeholder="Write a comment." id="commentInput"></textarea><button v-on:click="addComment()" class='comment__submit' type="submit">Add Comment</button>
      </div>
      
      

    </div>

    <script>
        /* Scripts by Timo. Here we load the movie item and display it. */
        const item_element = document.createElement('div');
        item_element.innerHTML = '<item-view title="Spoder" src="./image/Spiderman.png" public-rating="" private-rating="3" id="private-rating" duration="146" year="2012" description="test"></item-view>';
        document.getElementById('itemlist').appendChild(item_element);
    </script>

    <script>
      /* Scrips by Timo. Here the comments are loaded in consecutively. */
      for (let i = 0; i < 5; i++) {
        const comment_element = document.createElement("div");
        comment_element.innerHTML = '<movie-comment content="asd" username="test" timestamp="12-02-2019"></movie-comment>';
        document.getElementById('comment-section').appendChild(comment_element);
      }
      </script>
</div>


<?php
  include '../importables/html-footer.php';
?>
