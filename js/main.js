// js/main.js

const mockCaretakers = [
    { id: 1, name: "Dechen Wangmo", location: "Thimphu", ageGroup: "toddler", price: 150, rating: 4.8, verified: true, experience: "5 years", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=500&q=60" },
    { id: 2, name: "Sonam Choden", location: "Paro", ageGroup: "infant", price: 200, rating: 4.9, verified: true, experience: "3 years", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=500&q=60" },
    { id: 3, name: "Karma Dema", location: "Thimphu", ageGroup: "preschool", price: 120, rating: 4.5, verified: false, experience: "2 years", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=500&q=60" }
];

document.addEventListener('DOMContentLoaded', () => {
    if(document.getElementById('caretakerGrid')) {
        renderCaretakers(mockCaretakers);
        
        document.getElementById('searchForm').addEventListener('submit', (e) => {
            e.preventDefault();
            filterCaretakers();
        });
    }
});

function renderCaretakers(data) {
    const grid = document.getElementById('caretakerGrid');
    grid.innerHTML = '';

    if (data.length === 0) {
        grid.innerHTML = '<p>No caretakers found matching your criteria.</p>';
        return;
    }

    data.forEach(caretaker => {
        const card = document.createElement('div');
        card.className = 'card';
        
        // Updated path: ../images/icons.jpeg (since main.js runs on the frontened/index.html page)
        const badgeHTML = caretaker.verified 
            ? `<span class="verified-badge"><img src="../images/icons.jpeg" alt="verified"> Verified</span>` 
            : '';

        card.innerHTML = `
            <img src="${caretaker.image}" alt="${caretaker.name}" class="card-img">
            <div class="card-content">
                <div class="card-header">
                    <h3>${caretaker.name}</h3>
                    ${badgeHTML}
                </div>
                <div class="card-details">
                    <p>📍 ${caretaker.location} | ⭐ ${caretaker.rating} Rating</p>
                    <p>👶 Specializes in: ${caretaker.ageGroup} care</p>
                    <p>💼 Experience: ${caretaker.experience}</p>
                </div>
                <div class="card-footer">
                    <span class="price">Nu. ${caretaker.price}/hr</span>
                    <button class="book-btn" onclick="openBookingModal(${caretaker.id}, '${caretaker.name}', ${caretaker.price})">Book Now</button>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

function filterCaretakers() {
    const locationInput = document.getElementById('searchLocation').value.toLowerCase();
    const ageInput = document.getElementById('searchAge').value;

    const filtered = mockCaretakers.filter(caretaker => {
        const matchLocation = caretaker.location.toLowerCase().includes(locationInput);
        const matchAge = ageInput === "" || caretaker.ageGroup === ageInput;
        return matchLocation && matchAge;
    });

    renderCaretakers(filtered);
}