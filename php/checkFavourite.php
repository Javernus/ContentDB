<?php

//     Made by Timo.
// - This function toggles the current favourite status for a given FSID/UID pair.

    include_once("../php/databaseLogin.php");

    $data = json_decode(file_get_contents("php://input"));

    $FSID = $data->fsid;
    $UID = $data->uid;
    $sql = 'CALL CheckFavourite(:p0, :p1)';
    $stmt = $db->prepare($sql);
    $stmt->bindValue(":p0", $FSID, PDO::PARAM_INT);
    $stmt->bindValue(":p1", $UID, PDO::PARAM_INT);
    $stmt->execute();

    if ($stmt) {
        $result = $stmt->fetch();

        if ($result) {
            echo $result[0];
        }
    } else {
        echo "false";
    }
?>
