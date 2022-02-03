<?php

// Made by Timo.
// - This function gets and returns all comments for a given FSID.

    include_once("../php/databaseLogin.php");

    $data = json_decode(file_get_contents("php://input"));
    $FSID = $data->fsid;
    $sql = 'CALL GetComments(:p0)';
    $stmt = $db->prepare($sql);
    $stmt->bindValue(":p0", $FSID, PDO::PARAM_INT);
    $stmt->execute();
    $result = $stmt->fetchAll();
    if ($result) {
        echo json_encode($result);
    } else {
        echo "false";
    }
?>
