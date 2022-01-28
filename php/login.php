<?php
  include_once("../php/databaseLogin.php");

  $data = json_decode(file_get_contents("php://input"));

  $email = $data->email;
  $password = $data->password;

  $sql = 'CALL GetSalt(:p0)';
  $stmt = $db->prepare($sql);
  $stmt->bindValue(":p0", $email, PDO::PARAM_STR);
  $stmt->execute();
  $salt = $stmt->fetch();

  $sql = 'CALL CheckLogin(:p0,:p1)';
  $stmt = $db->prepare($sql);
  $stmt->bindValue(":p0", $email, PDO::PARAM_STR);
  $stmt->bindValue(":p1", $password.$salt[0], PDO::PARAM_STR);
  $success = $stmt->execute();
  $uid = $stmt->fetch()[0];

  setcookie("UserID", $uid, time() + (86400 * 30), "/");


  if ($uid) {
    echo "true";
  } else {
    echo "false";
  }
?>
