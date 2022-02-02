<?php
  /* PHP by Jake. */
  include_once("../php/databaseLogin.php");
  session_start();

    $data = json_decode(file_get_contents("php://input"));

    $title = $data->title;
    $image = $data->image;
    $description = $data->description;
    $rating = (int) $data->rating;
    $duration = (int) $data->duration;
    $releaseyear = (int) $data->releaseyear;

    $sql = 'CALL AddContent(:p0,:p1,:p2,:p3,:p4,:p5)';
    $stmt = $db->prepare($sql);
    $stmt->bindValue(":p0", $title, PDO::PARAM_STR);
    $stmt->bindValue(":p1", $image, PDO::PARAM_STR);
    $stmt->bindValue(":p2", $description, PDO::PARAM_STR);
    $stmt->bindValue(":p3", $rating, PDO::PARAM_INT);
    $stmt->bindValue(":p4", $duration, PDO::PARAM_INT);
    $stmt->bindValue(":p5", $releaseyear, PDO::PARAM_INT);
    $success = $stmt->execute();

  if ($success) {
    echo "success";
  } else {
    echo "failure";
  }
?>
