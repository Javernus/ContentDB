<?php
namespace Api\Connect;

use PDO;

class ConnectDB {
    private $db = null;

    public function __construct(){
        $host = $_ENV['MYSQL_HOST'];
        $port = $_ENV['MYSQL_PORT'];
        $username = $_ENV['MYSQL_USER'];
        $password = $_ENV['MYSQL_PASSWORD'];
        $database = $_ENV['MYSQL_DATABASE'];

        // Create connection
        include_once "../php/databaseLogin.php";
        $this->conn = $db;
    }

    public function getConn(){
        return $this->conn;
    }
}
