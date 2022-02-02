<?php
  include_once("../php/databaseLogin.php");

  $data = json_decode(file_get_contents("php://input"));

  $term = $data->term;

  $sql = 'CALL SearchContent(:p0)';
  $stmt = $db->prepare($sql);
  $stmt->bindValue(":p0", $term, PDO::PARAM_STR);
  $stmt->execute();
  $data = $stmt->fetchAll();
  if ($data) {
    echo json_encode($data);
  }
  ?>
