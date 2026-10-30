// js/dashboard.js

document.addEventListener('DOMContentLoaded', () => {
    
    // --- MOCK DATA FOR DASHBOARD ---
    const recentBookings = [
        { id: 101, caretaker: "Dechen Wangmo", date: "May 20, 2024", time: "09:00 AM", status: "accepted", total: 300 },
        { id: 102, caretaker: "Sonam Choden", date: "May 22, 2024", time: "02:00 PM", status: "pending", total: 200 }
    ];

    // Populate the table in parent/dashboard.html
    const tableBody = document.getElementById('bookingsTableBody');
    
    if (tableBody) {
        tableBody.innerHTML = '';

        recentBookings.forEach(booking => {
            const tr = document.createElement('tr');
            
            // Format status badge class
            let badgeClass = 'status-pending';
            if (booking.status === 'accepted') badgeClass = 'status-accepted';
            if (booking.status === 'declined') badgeClass = 'status-declined';

            tr.innerHTML = `
                <td>${booking.caretaker}</td>
                <td>${booking.date}<br><span style="font-size:0.8rem; color:#777;">${booking.time}</span></td>
                <td><span class="status-badge ${badgeClass}">${booking.status.toUpperCase()}</span></td>
                <td>Nu. ${booking.total}</td>
                <td>
                    <button class="book-btn" style="padding: 5px 10px; font-size: 0.8rem;" onclick="alert('View details for booking #${booking.id}')">View</button>
                </td>
            `;
            tableBody.appendChild(tr);
        });
    }
});
