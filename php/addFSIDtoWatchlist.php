<?php
  /* Made by Timo
   * This page adds an FSID to a user's watch list.
   */

  include_once("../php/databaseLogin.php");

  $data = json_decode(file_get_contents("php://input"));

  $uid = $data->uid;
  $fsid = $data->fsid;
  $watchlist = $data->watchlist;

  $sql = 'CALL AddToWatchlist(:p0, :p1, :p2)';
  $stmt = $db->prepare($sql);
  $stmt->bindValue(":p0", $fsid, PDO::PARAM_INT);
  $stmt->bindValue(":p1", $uid, PDO::PARAM_INT);
  $stmt->bindValue(":p2", $watchlist, PDO::PARAM_INT);
  $stmt->execute();
  $result = $stmt->fetch();
?>
