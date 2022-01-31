<?php
  include_once("../php/databaseLogin.php");
  session_start();

  if (isset($_SESSION['signuptime']) && $_SESSION['signuptime'] > time() - 300) {
    echo "limitreached";
  } else {
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

      $sql = 'CALL Login(:p0,:p1)';
      $stmt = $db->prepare($sql);
      $stmt->bindValue(":p0", $email, PDO::PARAM_STR);
      $stmt->bindValue(":p1", $password.$salt[0], PDO::PARAM_STR);
      $success = $stmt->execute();
      $uid = $stmt->fetch()[0];

      $_SESSION['signuptime'] = time();
      setcookie("UserID", $uid, time() + (86400 * 30), "/");
      echo "success";
    } else {
      echo "failure";
    }
  }
?>
