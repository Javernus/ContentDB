<?php
namespace Api;

require "../init.php";
require "./src/Handler.php";

use Api\Connect\Handler;

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET,POST,PUT,DELETE");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$uri = explode( '/', $uri );

if ($uri[2] !== 'movie' && $uri[2] !== 'lists') {
    header("HTTP/2 404 Not Found");
    echo json_encode(array(
        "status" => 404,
        "error" => "Not Found: This url does not exist"
    ));
    exit();
}

if (isset($uri[4])) {
    if ($uri[3] !== 'actors' && $uri[3] !== 'genres') {
        header("HTTP/2 404 Not Found");
        echo json_encode(array(
            "status" => 404,
            "error" => "Not Found: This url does not exist"
        ));
        exit();
    }
}

$requestMethod = $_SERVER["REQUEST_METHOD"];
$requestHeaders = getallheaders();
$requestBody = json_decode(file_get_contents('php://input'), true);

$controller = new Handler($conn, $uri, $requestMethod, $requestHeaders, $requestBody);
$controller->processRequest();
