<?php
    // // Looing for .env at the root directory
    // require '../vendor/autoload.php';

    // $dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
    // $dotenv->load();

    // // Retrive env variable
    // $host = $_ENV['MYSQL_HOST'];
    // $username = $_ENV['MYSQL_USER'];
    // $password = $_ENV['MYSQL_PASSWORD'];
    // $database = $_ENV['MYSQL_DATABASE'];

    // Create connection
    $conn = new mysqli("localhost", "Server", "LKUgVm4eGAiNm9aS", "contentdb");

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Turn autocommit off
    $conn -> autocommit(FALSE);

?>
