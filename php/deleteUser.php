<?php
  include_once("../php/databaseLogin.php");

  $data = json_decode(file_get_contents("php://input"));

  // get user id from cookie
  $uid = $_COOKIE["UserID"];

  $sql = 'CALL deleteUser(:p0)';
  $stmt = $db->prepare($sql);
  $stmt->bindValue(":p0", $uid, PDO::PARAM_STR);
  $stmt->execute();
  $data = $stmt->fetch();

  if ($data) {
    echo "true";
  } else {
    echo "false";
  }
?>
