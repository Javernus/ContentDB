<?php

/* Made by Timo.
 * - This function checks if a given FSID exists or not.
 */

    include_once("../php/databaseLogin.php");

    $data = json_decode(file_get_contents("php://input"));
    $FSID = $data->FSID;

    $sql = 'CALL CheckIfFSIDExists(:p0)';
    $stmt = $db->prepare($sql);
    $stmt->bindValue(":p0", $FSID, PDO::PARAM_INT);
    $stmt->execute();
    $result = $stmt->fetch()[0];
    if ($result) {
        echo "false";
    }
    else {
        echo "true";
    }
?>