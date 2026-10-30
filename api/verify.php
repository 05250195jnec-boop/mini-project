<?php
// backend/api/verify.php
header('Content-Type: application/json');
require_once '../config/db_connect.php';
require_once '../models/Caretaker.php';

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['caretaker_id'])) {
    echo json_encode(["status" => "error", "message" => "Caretaker ID required"]);
    exit;
}

$caretakerModel = new Caretaker($pdo);
$success = $caretakerModel->verify($data['caretaker_id']);

if ($success) {
    echo json_encode(["status" => "success", "message" => "Caretaker successfully verified"]);
} else {
    echo json_encode(["status" => "error", "message" => "Failed to verify caretaker"]);
}
?>