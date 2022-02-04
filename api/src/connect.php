<?php
namespace Api\Connect;

use PDO;

class ConnectDB {
    private $db = null;

    public function __construct(){
        // Create connection
        include_once "../php/databaseLogin.php";
        $this->conn = $db;
    }

    public function getConn(){
        return $this->conn;
    }
}
