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
            item_element.innerHTML = '<item-view title="Spoder" scr="./image/Spiderman.png" public-rating="" private-rating="">test</item-view>';
            document.getElementById('itemlist').appendChild(item_element);
            // for (let i = 0; i < 10; i++) {
            //     const list_element = document.createElement('div');
            //     list_element.innerHTML = '<watch-item title="Spiderman" src="./image/Spiderman.png" rating="3"><p>What is that? A spider?!</p></watch-list>';
            //     document.getElementById('towatchlist').appendChild(list_element);
            // }
        </script>
    </div>
</div>

<?php
  include '../importables/html-footer.php';
?>
