<?php
<<<<<<< HEAD
=======
    // Connect to the database using mysqli
    // Made by Montijn.


>>>>>>> 1d9ad5d0a94ead05e9e16cbaea6b056829b223e1
    // Retrive env variable
    $host = $_SERVER['MYSQL_HOST'];
    $username = $_SERVER['MYSQL_USER'];
    $password = $_SERVER['MYSQL_PASSWORD'];
    $database = $_SERVER['MYSQL_DATABASE'];

    $conn = new mysqli($host, $username, $password, $database);

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Turn autocommit off
    $conn -> autocommit(FALSE);
?>
