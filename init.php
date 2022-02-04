<?php
require 'api/src/connect.php';

use Api\Connect\ConnectDB;

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$conn = (new ConnectDB())->getConn();
