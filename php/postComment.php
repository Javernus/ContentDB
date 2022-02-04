<?php

// Made by Timo.
// - This function puts a user's comment in the database.

    include_once("../php/databaseLogin.php");

    $data = json_decode(file_get_contents("php://input"));
    $comment = $data->content;
    $FSID = $data->fsid;
    $UID = $data->uid;
    

    $sql = 'CALL PostComment(:p0, :p1, :p2)';
    $stmt = $db->prepare($sql);
    $stmt->bindValue(":p0", $FSID, PDO::PARAM_INT);
    $stmt->bindValue(":p1", $UID, PDO::PARAM_INT);
    $stmt->bindValue(":p2", $comment, PDO::PARAM_STR);

    $stmt->execute();

    if ($stmt) {
        $result = $stmt->fetch();

        if ($result) {
            echo $result[0];
        } else {
            echo "false";
        }
    } else {
        echo "false";
    }
?>
