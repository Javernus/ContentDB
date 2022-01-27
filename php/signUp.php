<?php
  $db = new PDO('mysql:host=localhost;dbname=contentdb;charset=utf8', 'Server', 'LKUgVm4eGAiNm9aS');

  $data = json_decode(file_get_contents("php://input"));

  $username = $data->username;
  $email = $data->email;
  $password = $data->password;
  $salt = bin2hex(random_bytes(16));

  $sql = 'CALL AddUser(:p0,:p1,:p2,:p3)';
  $stmt = $db->prepare($sql);
  $stmt->bindValue(":p0", $username, PDO::PARAM_STR);
  $stmt->bindValue(":p1", $email, PDO::PARAM_STR);
  $stmt->bindValue(":p2", $password.$salt, PDO::PARAM_STR);
  $stmt->bindValue(":p3", $salt, PDO::PARAM_STR);
  $success = $stmt->execute();

  if ($success) {
    echo "true";
  } else {
    echo "false";
  }
?>
