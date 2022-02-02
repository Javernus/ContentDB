<!--

    Made by Timo.
    - This function gets and returns
    the personal rating for a given FSID.

-->

<?php
    include_once("../php/databaseLogin.php");

    $data = json_decode(file_get_contents("php://input"));
    
    $FSID = $data->fsid;
    $UID = $data->uid;
    $sql = 'CALL GetRating(:p0, :p1)';
    $stmt = $db->prepare($sql);
    $stmt->bindValue(":p0", $fsid, PDO::PARAM_INT);
    $stmt->bindValue(":p1", $uid, PDO::PARAM_INT);
    $stmt->execute();
    $result = $stmt->fetch()[0];
    echo $result;
?>