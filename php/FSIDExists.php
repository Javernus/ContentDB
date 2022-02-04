<?php
/* Made by Timo.
 * - This function determines whether a given FSID exists or not.
 */

  include_once("../php/databaseLogin.php");

  $sql = 'CALL CheckIfFSIDExists(:p0)';
  $stmt = $db->prepare($sql);
  $stmt->bindValue(":p0", $FSID, PDO::PARAM_STR);
  $stmt->execute();
  $fsid_exists = $stmt->fetch();
?>
