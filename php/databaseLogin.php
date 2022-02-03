<?php
  $host = $_SERVER["MYSQL_HOST"];
  $dbname = $_SERVER["MYSQL_DATABASE"];
  $user = $_SERVER["MYSQL_USER"];
  $pass = $_SERVER["MYSQL_PASSWORD"];

  $db = new PDO('mysql:host='.$host.';dbname='.$dbname.';charset=utf8', $user, $pass);
?>
