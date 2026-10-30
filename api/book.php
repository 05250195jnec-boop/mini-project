<?php
// backend/api/book.php
header('Content-Type: application/json');
require_once '../config/db_connect.php';
require_once '../models/Booking.php';

$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    echo json_encode(["status" => "error", "message" => "Invalid input"]);
    exit;
}

// Assuming the user is logged in and we have their ID (from session/token)
// For this capstone prototype, we will mock a parent ID of 4 (from our dummy data)
$parentId = 4; 

$bookingModel = new Booking($pdo);
$result = $bookingModel->create(
    $parentId,
    $data['caretaker_id'],
    $data['booking_date'],
    $data['start_time'],
    $data['duration'],
    $data['num_children'],
    $data['child_care_notes']
);

echo json_encode($result);
?>