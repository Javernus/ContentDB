<?php
require '../vendor/autoload.php';

require 'api/src/Connect.php';

use Api\Connect\ConnectDB;

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->safeLoad();

$conn = (new ConnectDB())->getConn();
