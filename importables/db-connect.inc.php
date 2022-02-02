<?php
    $conn = new mysqli('localhost', 'Server', 'LKUgVm4eGAiNm9aS', 'contentdb');

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Turn autocommit off
    $conn -> autocommit(FALSE);
?>
