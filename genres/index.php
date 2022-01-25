    <?php
        include '../importables/html-header.php';
    ?>


    <script type="text/javascript" src="scripts.js"></script>

        <h1 class="page-title">Genres</h1>
        <div class="genres" id="genres">
            <?php

                ini_set( 'error_reporting', E_ALL );
                ini_set( 'display_errors', true );

                include_once '../importables/db-connect.inc.php';

                $genres_array = array('Action', 'Adventure', 'Animation', 'Comedy', 'Crime', 'Documentary', 'Drama', 'Family', 'Fantasy', 'History',
                    'Horror', 'Music', 'Mystery', 'Romance', 'Science Fiction', 'Thriller', 'War', 'Western'
                );

                # for each genre, print out the movies that belong to it
                for ($i = 0; $i < count($genres_array); $i++) {
                    echo "<cdb-genre-row title=$genres_array[$i]>";
                    $genres = $conn->query("SELECT * FROM genres WHERE Genre = '$genres_array[$i]'");
                    if ($genres->num_rows > 0) {
                        while ($row = $genres->fetch_assoc()) {
                            $movies = $conn->query("SELECT * FROM content WHERE FSID = '$row[FSID]'");
                            if ($movies->num_rows > 0) {
                                while ($movie = $movies->fetch_assoc()) {
                                    $replace = str_replace(array("UY67_CR0,0,45,67_AL_", "UX45_CR0,0,45,67_AL_", "UY67_CR1,0,45,67_AL_", "UY67_CR2,0,45,67_AL_"), "", $movie['Image']);
                                    echo "<cdb-genre-card url=$movie[Image] src=$replace></cdb-genre-card>";
                                }
                            }
                        }
                    }
                    echo "</cdb-genre-row>";
                }

            ?>

        </div>
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
