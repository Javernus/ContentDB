<?php
    include_once("../php/databaseLogin.php");

    $data = json_decode(file_get_contents("php://input"));
    $rating = data->rating;
    $FSID = data->FSID;
    $uid = data->uid;
    

    $sql = 'CALL fsSetRating(:p0, p1, p2)';
    $stmt = $db->prepare($sql);
    $stmt->bindValue(":p0", $rating, PDO::PARAM_INT);
    $stmt->bindValue(":p1", $FSID, PDO::PARAM_INT);
    $stmt->bindValue(":p2", $uid, PDO::PARAM_INT);
    $stmt->execute();
    // $success = $stmt->fetch()[0];
?>