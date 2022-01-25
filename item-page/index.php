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
      <div>
        <textarea type="text" class="comment__input" placeholder="Write a comment" @keyup.enter="addComment()"></textarea>
        <button v-on:click="addItem()" class='comment__submit' type="submit">Add Comment</button>
      </div>
    </div>
    <script>
        /* Scripts by Timo */
        const item_element = document.createElement('div');
        item_element.innerHTML = '<item-view title="Spoder" src="./image/Spiderman.png" public-rating="" private-rating="3" id="private-rating" duration="146" year="2012" description="test"></item-view>';
        document.getElementById('itemlist').appendChild(item_element);
    </script>
</div>

<?php
  include '../importables/html-footer.php';
?>
