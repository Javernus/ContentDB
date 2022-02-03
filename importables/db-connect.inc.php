<?php
    // Retrive env variable
    // $host = $_SERVER['MYSQL_HOST'];
    // $username = $_SERVER['MYSQL_USER'];
    // $password = $_SERVER['MYSQL_PASSWORD'];
    // $database = $_SERVER['MYSQL_DATABASE'];

    // $conn = new mysqli($host, $username, $password, $database);

    // Create connection
    $conn = new mysqli("localhost", "Server", "LKUgVm4eGAiNm9aS", "contentdb");

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Turn autocommit off
    $conn -> autocommit(FALSE);
?>
