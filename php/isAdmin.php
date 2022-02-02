<?php
  /* PHP by Jake. */
  include_once("../php/databaseLogin.php");

  $sql = 'CALL IsAdmin(:p0)';
  $stmt = $db->prepare($sql);
  $stmt->bindValue(":p0", $_COOKIE["UserID"], PDO::PARAM_STR);
  $stmt->execute();
  $admin = $stmt->fetch()[0] === "Admin";

  if ($admin) {
    echo "true";
  } else {
    echo "false";
  }
?>
