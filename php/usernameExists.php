<?php
  $db = new PDO('mysql:host=localhost;dbname=contentdb;charset=utf8', 'Server', 'LKUgVm4eGAiNm9aS');

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
