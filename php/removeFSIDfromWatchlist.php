<?php
  /* Made by Timo
   * This page removes an FSID from a user's watch list.
   */

  include_once("../php/databaseLogin.php");

  $data = json_decode(file_get_contents("php://input"));

  $uid = $data->uid;
  $fsid = $data->fsid;

  $sql = 'CALL RemoveFromWatchlist(:p0, :p1)';
  $stmt = $db->prepare($sql);
  $stmt->bindValue(":p0", $fsid, PDO::PARAM_INT);
  $stmt->bindValue(":p1", $uid, PDO::PARAM_INT);
  $stmt->execute();
  $result = $stmt->fetch();
?>
