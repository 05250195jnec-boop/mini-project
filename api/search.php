<?php
// backend/api/search.php
header('Content-Type: application/json');
require_once '../config/db_connect.php';
require_once '../models/Caretaker.php';

$location = isset($_GET['location']) ? $_GET['location'] : '';
$specialization = isset($_GET['specialization']) ? $_GET['specialization'] : '';

$caretakerModel = new Caretaker($pdo);
$results = $caretakerModel->search($location, $specialization);

echo json_encode(["status" => "success", "data" => $results]);
?>