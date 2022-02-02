<?php
  /* Made by Jake. */

  include_once("../php/databaseLogin.php");

  $data = json_decode(file_get_contents("php://input"));

  $username = $data->username;
  $password = $data->password;

  $sql = 'CALL GetSalt(:p0)';
  $stmt = $db->prepare($sql);
  $stmt->bindValue(":p0", $email, PDO::PARAM_STR);
  $stmt->execute();
  $salt = $stmt->fetch()[0];

  $sql = 'CALL Login(:p0,:p1)';
  $stmt = $db->prepare($sql);
  $stmt->bindValue(":p0", $username, PDO::PARAM_STR);
  $stmt->bindValue(":p1", $password.$salt, PDO::PARAM_STR);
  $success = $stmt->execute();
  $uid = $stmt->fetch()[0];

  if ($uid) {
    setcookie("UserID", $uid, time() + (86400 * 30), "/");
    echo "true";
  } else {
    echo "false";
  }
?>
