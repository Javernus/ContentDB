<?php
  /* Made by Timo
   * This page checks if a given FSID is in a user's watch list.
   * Returns: 0 if not in watch list.
   * Index corresponding with the watch list if it is in a watch list.
   * 
   */

    include_once("../php/databaseLogin.php");

    $data = json_decode(file_get_contents("php://input"));

    $uid = $data->uid;
    $fsid = $data->fsid;
    
    $sql = 'CALL GetWatchlistState(:p0, :p1)';
    $stmt = $db->prepare($sql);
    $stmt->bindValue(":p0", $fsid, PDO::PARAM_INT);
    $stmt->bindValue(":p1", $uid, PDO::PARAM_INT);
    $stmt->execute();
    $result = $stmt->fetch()[0];
    echo $result;
?>
