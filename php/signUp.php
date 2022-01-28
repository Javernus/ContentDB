<?php
  include_once("../php/databaseLogin.php");

  // if ($_SESSION["addAccountTime"] < time() - 300) {
  //   echo "false";
  // } else {
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

      $_SESSION["addAccountTime"] = time();
      setcookie("UserID", $uid, time() + (86400 * 30), "/");
      echo "true";
    } else {
      echo "false";
    }
  // }
?>
