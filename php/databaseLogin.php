<?php

/* This file makes use of apache2 environment variables
 * to establish a connection with the database.
 */

  $host = $_SERVER["MYSQL_HOST"];
  $dbname = $_SERVER["MYSQL_DATABASE"];
  $user = $_SERVER["MYSQL_USER"];
  $pass = $_SERVER["MYSQL_PASSWORD"];
  $db = new PDO('mysql:host='.$host.';dbname='.$dbname.';charset=utf8', $user, $pass);

?>
