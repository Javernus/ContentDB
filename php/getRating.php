<!--

    Made by Timo.
    - This function gets and returns
    the personal rating for a given FSID.

-->

<?php
    include_once("../php/databaseLogin.php");

    $data = json_decode(file_get_contents("php://input"));
    
    $FSID = $data->FSID;
    $UID = $data->UID;
    $sql = 'CALL GetRating(:p0, :p1)'
    $stmt = $db->prepare($sql);
    $stmt->bindValue(":p0", $FSID, PDO::PARAM_INT);
    $stmt->bindValue(":p1", $UID, PDO::PARAM_INT);
    $stmt->execute();
        
    echo "$stmt->fetch();";
?>