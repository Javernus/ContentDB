<?php
  setcookie("UserID", "", time() - 3600, "/");
  header("/home");
  exit();
?>
