<?php
  include_once("../php/databaseLogin.php");

  $data = json_decode(file_get_contents("php://input"));

  $FSID = $data->FSID;

  $sql = 'CALL getContent(:p0)';
  $stmt = $db->prepare($sql);
  $stmt->bindValue(":p0", $FSID, PDO::PARAM_STR);
  $stmt->execute();
  $data = $stmt->fetch();

  if ($data) {
    echo "true";
  } else {
    echo "false";
  }
?>
