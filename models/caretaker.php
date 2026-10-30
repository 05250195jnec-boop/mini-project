<?php
// backend/models/Caretaker.php

class Caretaker {
    private $db;

    public function __construct($pdo) {
        $this->db = $pdo;
    }

    // Search for caretakers based on filters
    public function search($location = '', $specialization = '') {
        $query = "SELECT u.id, u.full_name, c.location, c.specialization, c.experience_years, c.price_per_hour, c.is_verified, c.bio 
                  FROM users u 
                  JOIN caretaker_profiles c ON u.id = c.user_id 
                  WHERE u.role = 'caretaker'";
        
        $params = [];

        if (!empty($location)) {
            $query .= " AND c.location LIKE :location";
            $params[':location'] = "%$location%";
        }

        if (!empty($specialization)) {
            $query .= " AND c.specialization = :specialization";
            $params[':specialization'] = $specialization;
        }

        $stmt = $this->db->prepare($query);
        $stmt->execute($params);
        return $stmt->fetchAll();
    }

    // Admin function to verify a caretaker
    public function verify($userId) {
        $sql = "UPDATE caretaker_profiles SET is_verified = TRUE WHERE user_id = ?";
        $stmt = $this->db->prepare($sql);
        return $stmt->execute([$userId]);
    }
}
?>