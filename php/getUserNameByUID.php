<?php

// Made by Timo.
// - This function gets and returns the username for a given UID.

    include_once("../php/databaseLogin.php");

    $data = json_decode(file_get_contents("php://input"));
    $UID = $data->uid;
    $sql = 'CALL GetUsernameByUID(:p0)';
    $stmt = $db->prepare($sql);
    $stmt->bindValue(":p0", $UID, PDO::PARAM_INT);
    $stmt->execute();
    $result = $stmt->fetch()[0];
    echo $result;
?>