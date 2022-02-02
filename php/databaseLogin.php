<?php
  $host = $_ENV["MYSQL_HOST"]
  $dbname = $_ENV["MYSQL_DBNAME"]
  $user = $_ENV["MYSQL_USER"]
  $pass = $_ENV["MYSQL_PASS"]

  $db = new PDO('mysql:host=$host;dbname=$dbname;charset=utf8', $user, $pass);
?>
