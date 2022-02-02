<?php
  /* Made by Montijn. */

  include_once("../php/databaseLogin.php");

  $data = json_decode(file_get_contents("php://input"));

  $uid = $_COOKIE["UserID"];

  $oldpassword = $data->oldpassword;
  $newpassword = $data->newpassword;

  $sql = 'CALL GetSaltByUID(:p0)';
  $stmt = $db->prepare($sql);
  $stmt->bindValue(":p0", $uid, PDO::PARAM_STR);
  $stmt->execute();
  $salt = $stmt->fetch()[0];

  // check if old password is correct
	$sql = 'CALL CheckPassword(:p0,:p1)';
	$stmt = $db->prepare($sql);
	$stmt->bindValue(":p0", $uid, PDO::PARAM_STR);
	$stmt->bindValue(":p1", $oldpassword.$salt, PDO::PARAM_STR);
	$success = $stmt->execute();
	$data = $stmt->fetch()[0];

	if ($data == intval($uid)) {
		$sql = 'CALL ChangePassword(:p0,:p1,:p2);';
		$stmt = $db->prepare($sql);
		$stmt->bindValue(":p0", $data, PDO::PARAM_INT);
		$stmt->bindValue(":p1", $oldpassword.$salt, PDO::PARAM_STR);
		$stmt->bindValue(":p2", $newpassword.$salt, PDO::PARAM_STR);
		$success = $stmt->execute();
		$uid = $stmt->fetch();

		echo "success";
	}
?>
