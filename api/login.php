<?php
// backend/api/login.php
header('Content-Type: application/json');
require_once '../config/db_connect.php';
require_once '../models/User.php';

// Get JSON input from frontend
$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['email']) || !isset($data['password'])) {
    echo json_encode(["status" => "error", "message" => "Email and password required"]);
    exit;
}

$userModel = new User($pdo);
$user = $userModel->login($data['email'], $data['password']);

if ($user) {
    echo json_encode(["status" => "success", "message" => "Login successful", "user" => $user]);
} else {
    echo json_encode(["status" => "error", "message" => "Invalid email or password"]);
}
?>