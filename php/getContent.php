<?php
    include_once("../php/databaseLogin.php");
    $data = json_decode(file_get_contents("php://input"));
    $FSID = $data->fsid;

    $sql = 'CALL GetContentByFSID(:p0)';
    $stmt = $db->prepare($sql);
    $stmt->bindValue(":p0", $FSID, PDO::PARAM_INT);
    $stmt->execute();
    $results = $stmt->fetch();
    echo json_encode($results);
?>
