    <?php
        include '../importables/html-header.php';
    ?>


    <script type="text/javascript" src="scripts.js"></script>
    <h1 class="page-title">Browse</h1>
    <div class="browse" id="browse">
        <?php
            ini_set( 'error_reporting', E_ALL );
            ini_set( 'display_errors', true );

            include_once '../importables/db-connect.inc.php';

            $genres_array = array('Action', 'Adventure', 'Animation', 'Comedy', 'Crime', 'Documentary', 'Drama', 'Family', 'Fantasy', 'History',
                'Horror', 'Music', 'Mystery', 'Romance', 'Science Fiction', 'Thriller', 'War', 'Western'
            );

            # for each genre, print out the movies that belong to it
            for ($i = 0; $i < count($genres_array); $i++) {
                $genres = $conn->query("SELECT * FROM genres WHERE Genre = '$genres_array[$i]'");

                if ($genres->num_rows > 0) {
                    echo "<cdb-browse-row label=$genres_array[$i]>";
                    while ($row = $genres->fetch_assoc()) {
                        $movies = $conn->query("SELECT * FROM content WHERE FSID = '$row[FSID]'");

                        if ($movies->num_rows > 0) {
                            while ($movie = $movies->fetch_assoc()) {
                                echo "<cdb-browse-card url=$movie[Image] src=$movie[Image] fsid=$movie[FSID]></cdb-browse-card>";
                            }
                        }
                    }
                }
                echo "</cdb-browse-row>";
            }

        ?>
    </div>


<?php
  include '../importables/html-footer.php';
?>
