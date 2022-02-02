<?php

//     Made by Timo.
// - This function changes the current rating for a given FSID/UID pair.

    include_once("../php/databaseLogin.php");

    $data = json_decode(file_get_contents("php://input"));
    
    $FSID = $data->fsid;
    $UID = $data->uid;
    $rating = $data->rating;
    $sql = 'CALL UpdateRating(:p0, :p1, :p2)';
    $stmt = $db->prepare($sql);
    $stmt->bindValue(":p0", $FSID, PDO::PARAM_INT);
    $stmt->bindValue(":p1", $UID, PDO::PARAM_INT);
    $stmt->bindValue(":p2", $rating, PDO::PARAM_INT);
    $stmt->execute();
    $stmt->fetch();
?>