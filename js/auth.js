// js/auth.js

document.addEventListener('DOMContentLoaded', () => {
    
    // --- LOGIN LOGIC ---
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;

            if (email && password) {
                alert(`Login Successful! Welcome back.`);
                // Updated Redirection: Go up one level and into dashboards
                window.location.href = "../dashboards/parent/dashboard.html"; 
            } else {
                alert("Please enter both email and password.");
            }
        });
    }

    // --- REGISTRATION LOGIC ---
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('regName').value;
            const email = document.getElementById('regEmail').value;
            const password = document.getElementById('regPassword').value;
            const role = document.getElementById('regRole').value;

            if (name && email && password && role) {
                alert(`Account created successfully as a ${role}! Please login.`);
                window.location.href = "login.html"; // Stays in the same folder
            } else {
                alert("Please fill out all fields.");
            }
        });
    }
});