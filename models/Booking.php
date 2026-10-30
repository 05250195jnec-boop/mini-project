<?php
// backend/models/Booking.php

class Booking {
    private $db;

    public function __construct($pdo) {
        $this->db = $pdo;
    }

    // Create a new booking
    public function create($parentId, $caretakerId, $date, $time, $duration, $children, $notes) {
        // 1. Securely fetch the caretaker's rate to calculate price on the server
        $stmt = $this->db->prepare("SELECT price_per_hour FROM caretaker_profiles WHERE user_id = ?");
        $stmt->execute([$caretakerId]);
        $caretaker = $stmt->fetch();

        if (!$caretaker) {
            return ["status" => "error", "message" => "Caretaker not found"];
        }

        $total_price = $caretaker['price_per_hour'] * $duration;

        // 2. Insert the booking
        $sql = "INSERT INTO bookings (parent_id, caretaker_id, booking_date, start_time, duration_hours, num_children, child_care_notes, total_price) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        $stmt = $this->db->prepare($sql);
        
        try {
            $stmt->execute([$parentId, $caretakerId, $date, $time, $duration, $children, $notes, $total_price]);
            return ["status" => "success", "message" => "Booking created", "total_price" => $total_price];
        } catch (PDOException $e) {
            return ["status" => "error", "message" => $e->getMessage()];
        }
    }
}
?>