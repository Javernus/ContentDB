<?php
namespace Api\Connect;

use PDO;

class Handler {

    public function __construct($db, $requestUri, $requestMethod, $requestHeaders, $requestBody) {
        $this->db = $db;
        $this->requestMethod = $requestMethod;
        $this->requestUri = $requestUri;
        $this->requestBody = $requestBody;
        $this->requestHeaders = $requestHeaders;
    }

    public function processRequest() {
        switch ($this->requestMethod) {
            case 'GET':
                if (isset($this->requestUri[4])) {
                    $response = $this->getElementByFSID($this->requestUri[3], $this->requestUri[4]);
                } else {
                    if (is_numeric($this->requestUri[3])) {
                        $response = $this->getMovieByFSID($this->requestUri[3]);
                    } else {
                        $title = str_replace('-', ' ', $this->requestUri[3]);
                        $response = $this->getMovieByTitle($title);
                    }
                }
                break;

            default:
                $response = array(
                    "status" => 405,
                    "error" => "Method Not Allowed: This method is not allowed for the requested URL"
                );
                header("HTTP/2 405 Method Not Allowed");
                print_r(json_encode($response));
                break;
        }
    }

    private function getMovieByTitle($title) {
        $sql = 'CALL GetContentByTitle(:p0)';
        $stmt = $this->db->prepare($sql);
        $stmt->bindValue(":p0", $title, PDO::PARAM_STR);
        $stmt->execute();
        $movie = $stmt->fetchAll();

        header("HTTP/2 200 OK");
        print_r(json_encode($movie));
        return json_encode($movie);
    }

    private function getMovieByFSID($fsid) {
        $sql = 'CALL GetContentByFSID(:p0)';
        $stmt = $this->db->prepare($sql);
        $stmt->bindValue(":p0", $fsid, PDO::PARAM_INT);
        $stmt->execute();
        $movie = $stmt->fetchAll();

        header("HTTP/2 200 OK");
        print_r(json_encode($movie));
        return $movie;
    }

    private function getElementByFSID($table, $fsid) {
        if ($table == "genres") {
            $sql = 'CALL GetGenresByFSID(:p0)';
        } else if ($table == "actors") {
            $sql = 'CALL GetActorsByFSID(:p0)';
        }
        $stmt = $this->db->prepare($sql);
        $stmt->bindValue(":p0", $fsid, PDO::PARAM_INT);
        $stmt->execute();
        $element = $stmt->fetchAll();

        header("HTTP/2 200 OK");
        print_r(json_encode($element));
        return $element;
    }
}