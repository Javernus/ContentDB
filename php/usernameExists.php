<?php
  include_once("../php/databaseLogin.php");

  $data = json_decode(file_get_contents("php://input"));

  $username = $data->username;

  $sql = 'CALL UsernameExists(:p0)';
  $stmt = $db->prepare($sql);
  $stmt->bindValue(":p0", $username, PDO::PARAM_STR);
  $stmt->execute();
  $data = $stmt->fetch();

  if ($data[0]) {
    echo "true";
  } else {
    echo "false";
  }
?>
