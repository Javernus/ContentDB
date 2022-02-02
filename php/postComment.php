<?php
    include_once("../php/databaseLogin.php");

    $data = json_decode(file_get_contents("php://input"));
    $comment = $data->comment;
    $FSID = $data->FSID;
    $UID = $data->uid;
    

    $sql = 'CALL PostComment(:p0, :p1, :p2)';
    $stmt = $db->prepare($sql);
    $stmt->bindValue(":p0", $FSID, PDO::PARAM_INT);
    $stmt->bindValue(":p1", $comment, PDO::PARAM_STR);
    $stmt->bindValue(":p2", $UID, PDO::PARAM_INT);
    $stmt->execute();
    $result = $stmt->fetch()[0];
    echo $result;
?>