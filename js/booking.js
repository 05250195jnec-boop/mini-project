// js/booking.js

let currentCaretakerId = null;
let currentPricePerHour = 0;

function openBookingModal(id, name, price) {
    currentCaretakerId = id;
    currentPricePerHour = price;

    document.getElementById('modalCaretakerId').value = id;
    document.getElementById('modalCaretakerName').innerText = name;
    
    // Reset form and calculate initial price
    const form = document.getElementById('bookingForm');
    form.reset();
    document.getElementById('bookDuration').value = "2"; 
    calculatePrice();

    document.getElementById('bookingModal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('bookingModal').style.display = 'none';
}

function calculatePrice() {
    const duration = parseInt(document.getElementById('bookDuration').value);
    const total = currentPricePerHour * duration;
    
    document.getElementById('modalPrice').innerText = `Nu. ${total.toLocaleString()}`;
}

document.addEventListener('DOMContentLoaded', () => {
    const bookingForm = document.getElementById('bookingForm');
    
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // This is where you would normally send data to your PHP backend
            alert("Booking Request Sent! The caretaker will review and confirm shortly.");
            closeModal();
        });
    }

    // Close modal if user clicks outside the white box
    window.onclick = function(event) {
        const modal = document.getElementById('bookingModal');
        if (event.target == modal) {
            closeModal();
        }
    }
});