<?php
    include_once("../php/databaseLogin.php");

    $data = json_decode(file_get_contents("php://input"));
    $Comment = data->Comment;
    $FSID = data->FSID;
    $uid = data->uid;
    

    $sql = 'CALL fsPostComment(:p0, p1, p2)';
    $stmt = $db->prepare($sql);
    $stmt->bindValue(":p0", $Comment, PDO::PARAM_STR);
    $stmt->bindValue(":p0", $FSID, PDO::PARAM_STR);
    $stmt->bindValue(":p0", $uid, PDO::PARAM_STR);
    $stmt->execute();
    // $success = $stmt->fetch()[0];
?>