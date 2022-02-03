<?php
  include_once("../php/databaseLogin.php");

  $data = json_decode(file_get_contents("php://input"));

  // get user id from cookie
  $uid = $_COOKIE["UserID"];
  $cid = $data->cid;

  $sql = 'CALL isAdmin(:p0)';
  $stmt = $db->prepare($sql);
  $stmt->bindValue(":p0", $uid, PDO::PARAM_STR);
  $stmt->execute();

  if (!$stmt) {
    echo "false";
    return;
  }

  $data = $stmt->fetch();

  if ($data) {
    $sql = 'CALL RemoveComment(:p0)';
    $stmt = $db->prepare($sql);
    $stmt->bindValue(":p0", $cid, PDO::PARAM_STR);
    $stmt->execute();

    echo "true";
    return;
  }

  $sql = 'CALL getUIDOfComment(:p0)';
  $stmt = $db->prepare($sql);
  $stmt->bindValue(":p0", $cid, PDO::PARAM_STR);
  $stmt->execute();

  if (!$stmt) {
    echo "false";
    return;
  }

  $data = $stmt->fetch();

  if ($data == $uid) {
    $sql = 'CALL RemoveComment(:p0)';
    $stmt = $db->prepare($sql);
    $stmt->bindValue(":p0", $cid, PDO::PARAM_STR);
    $stmt->execute();

    echo "true";
    return;
  }

  echo "false";
?>
