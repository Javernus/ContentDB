<?php

// Made by Timo.
// - This function sets the personal rating for a given FSID.

    include_once("../php/databaseLogin.php");

    $data = json_decode(file_get_contents("php://input"));
    $rating = $data->rating;
    $FSID = $data->fsid;
    $UID = $data->uid;
    

    $sql = 'CALL SetRating(:p0, :p1, :p2)';
    $stmt = $db->prepare($sql);
    $stmt->bindValue(":p0", $FSID, PDO::PARAM_INT);
    $stmt->bindValue(":p1", $UID, PDO::PARAM_INT);
    $stmt->bindValue(":p2", $rating, PDO::PARAM_INT);

    $stmt->execute();
?>