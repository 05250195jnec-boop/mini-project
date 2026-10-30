<?php
// backend/models/User.php

class User {
    private $db;

    public function __construct($pdo) {
        $this->db = $pdo;
    }

    // Register a new user (Parent or Caretaker)
    public function register($name, $email, $password, $role) {
        $hashed_password = password_hash($password, PASSWORD_DEFAULT);
        $sql = "INSERT INTO users (full_name, email, password_hash, role) VALUES (?, ?, ?, ?)";
        $stmt = $this->db->prepare($sql);
        
        try {
            $stmt->execute([$name, $email, $hashed_password, $role]);
            return $this->db->lastInsertId();
        } catch (PDOException $e) {
            return false; // Usually due to duplicate email
        }
    }

    // Authenticate user for login
    public function login($email, $password) {
        $sql = "SELECT id, full_name, password_hash, role FROM users WHERE email = ?";
        $stmt = $this->db->prepare($sql);
        $stmt->execute([$email]);
        $user = $stmt->fetch();

        if ($user && password_verify($password, $user['password_hash'])) {
            unset($user['password_hash']); // Don't send password hash back to frontend
            return $user;
        }
        return false;
    }
}
?>