    <?php
        include '../importables/html-header.php';
    ?>


    <script type="text/javascript" src="scripts.js"></script>

        <h1 class="page-title">Genres</h1>

        <?php

            ini_set( 'error_reporting', E_ALL );
            ini_set( 'display_errors', true );

            include_once '../importables/db-connect.inc.php';

            echo "<p>Genres:</p>";
            $sql = "SELECT * FROM genres;";
            $result = $conn->query($sql);
            $check = $result->num_rows;

            if ($result->num_rows > 0) {
                // output data of each row
                while($row = $result->fetch_assoc()) {
                    echo "<div class='genre-container'>";
                    echo "<h2 class='genre-title'>" . $row["FSID"] . "</h2>";
                    echo "<p class='genre-description'>" . $row["Genre"] . "</p>";
                    echo "</div>";
                }
            } else {
                echo "0 results";
            }
        ?>

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
