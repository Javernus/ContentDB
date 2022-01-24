<?php
  include '../importables/html-header.php';
?>


<div style='justify-content:left; padding-left: 5%; padding-right: 5%;' id="item-page">
    <div class='title'>
        <h1>Movie Name</h1>
    </div>
    <div class='container'>
        <div id='itemlist' class="item-view"></div>
        <script>
            /* Scripts by Timo */

            const item_element = document.createElement('div');
            item_element.innerHTML = '<item-view title="Spoder" src="./image/Spiderman.png" public-rating="" private-rating="3" id="private-rating">test</item-view>';
            document.getElementById('itemlist').appendChild(item_element);

        </script>
    </div>
</div>

<?php
  include '../importables/html-footer.php';
?>
