    <?php
        include '../importables/html-header.php';
    ?>
    <link href="genres.css" rel="stylesheet">
    <link href="../components/item-card/itemcard.css" rel="stylesheet">

    <script type="text/javascript" src="scripts.js"></script>

        <h1 class="page-title">Genres</h1>

        <div class="genres" id="genres"></div>
        <script>
            const genres = [
                'Action', 'Adventure', 'Animation', 'Comedy', 'Crime', 'Documentary', 'Drama', 'Family', 'Fantasy', 'History',
                'Horror', 'Music', 'Mystery', 'Romance', 'Science Fiction', 'Thriller', 'War', 'Western'
            ];

            genres.forEach(genre => {
                const genreRow = document.createElement('cdb-genre-row');
                genreRow.setAttribute("title", genre);
                document.getElementById('genres').appendChild(genreRow);

                const backgroundArray = ["../images/placeholder.jpg", "../images/pulpfiction.jpg"];

                for (let i = 0; i < 20; i++) {
                    let randomBackground = backgroundArray[Math.floor(Math.random() * backgroundArray.length)];

                    const genreCard = document.createElement('cdb-genre-card');
                    genreCard.setAttribute('url', randomBackground);
                    genreCard.setAttribute('src', randomBackground);
                    genreRow.appendChild(genreCard);
                }

            });

        </script>
<?php
  include '../importables/html-footer.php';
?>
