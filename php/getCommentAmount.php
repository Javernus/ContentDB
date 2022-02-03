<?php

// Made by Timo.
// - This function gets and returns the amount of comments for a given FSID.

    include_once("../php/databaseLogin.php");

    $data = json_decode(file_get_contents("php://input"));
    $FSID = $data->fsid;
    $sql = 'CALL GetCommentAmount(:p0)';
    $stmt = $db->prepare($sql);
    $stmt->bindValue(":p0", $FSID, PDO::PARAM_INT);
    $stmt->execute();

    if ($stmt) {
        $result = $stmt->fetch()[0];
        echo $result;
    } else {
        echo "false";
    }
?>
