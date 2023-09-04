const rooms = [
    { name: 'Room A', bookings: [] },
    { name: 'Room B', bookings: [] },
    { name: 'Room C', bookings: [] },
    { name: 'Room D', bookings: [] }
];

const roomSelector = document.getElementById('room-selector');
const bookingTime = document.getElementById('booking-time');
const bookButton = document.getElementById('book-button');
const roomList = document.getElementById('room-list');
const bookingList = document.getElementById('booking-list');
const bookingForm = document.getElementById('booking-form');
const homeNav = document.getElementById('home-nav');
const propertyNav = document.getElementById('property-nav');
const aboutNav = document.getElementById('about-nav');
const contactNav = document.getElementById('contact-nav');
const contactSection = document.getElementById('contact');
const availableRooms = document.getElementById('available-rooms');
const bookingSection = document.getElementById('booking');
const viewBookings = document.getElementById('view-bookings');
const backgroundImage = document.getElementById('background-image');
const homeSection = document.getElementById('home');
const propertyImages = document.getElementById('property-images');
const aboutSection = document.getElementById('about');


const gotoPropertyButton = document.getElementById('goto-property-button');

function populateRoomDropdown() {
    roomSelector.innerHTML = '';
    rooms.forEach((room) => {
        const option = document.createElement('option');
        option.value = room.name;
        option.textContent = room.name;
        roomSelector.appendChild(option);
    });
}

function displayAvailableRooms() {
    roomList.innerHTML = '';
    rooms.forEach((room) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${room.name}: `;

        if (room.bookings.length === 0) {
            listItem.textContent += 'Available';
        } else {
            room.bookings.forEach((booking, index) => {
                const bookingContainer = document.createElement('div');
                bookingContainer.classList.add('booking-container');

                const bookingDetails = document.createElement('span');
                bookingDetails.textContent = `${booking.startTime} - ${booking.endTime}`;
                bookingContainer.appendChild(bookingDetails);

                const editButton = document.createElement('button');
                editButton.textContent = 'Edit';
                editButton.addEventListener('click', () => editBooking(room, index));
                bookingContainer.appendChild(editButton);

                const cancelButton = document.createElement('button');
                cancelButton.textContent = 'Cancel';
                cancelButton.addEventListener('click', () => cancelBooking(room, index));
                bookingContainer.appendChild(cancelButton);

                listItem.appendChild(bookingContainer);
            });
        }

        roomList.appendChild(listItem);
    });
}

// Function to display user bookings
function displayUserBookings() {
    bookingList.innerHTML = '';
    rooms.forEach((room) => {
        if (room.bookings.length > 0) {
            room.bookings.forEach((booking) => {
                const listItem = document.createElement('li');
                listItem.textContent = `${room.name}: ${booking.startTime} - ${booking.endTime}`;
                bookingList.appendChild(listItem);
            });
        }
    });
}

// Function to cancel a booking
function cancelBooking(room, index) {
    const booking = room.bookings[index];
    room.bookings.splice(index, 1);
    displayAvailableRooms();
    displayUserBookings();
    alert('Booking canceled: ' + booking.startTime + ' - ' + booking.endTime);
}

// Function to edit a booking
function editBooking(room, index) {
    const booking = room.bookings[index];
    const newStartTime = prompt('Enter new start time (YYYY-MM-DDTHH:mm):', booking.startTime);
    if (newStartTime) {
        booking.startTime = newStartTime;
        booking.endTime = new Date(new Date(newStartTime).getTime() + 30 * 60 * 1000).toISOString();
        displayAvailableRooms();
        displayUserBookings();
        alert('Booking edited: ' + booking.startTime + ' - ' + booking.endTime);
    }
}

// Event listener for the form submission
bookingForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const selectedRoomName = roomSelector.value;
    const selectedTime = new Date(bookingTime.value);
    const selectedRoom = rooms.find((room) => room.name === selectedRoomName);

    if (!selectedRoom || isNaN(selectedTime)) {
        return;
    }

    const isDoubleBooking = selectedRoom.bookings.some((booking) => {
        const bookingStartTime = new Date(booking.startTime);
        const bookingEndTime = new Date(booking.endTime);
        return (
            (selectedTime >= bookingStartTime && selectedTime < bookingEndTime) ||
            (selectedTime.getTime() + 30 * 60 * 1000 > bookingStartTime && selectedTime.getTime() + 30 * 60 * 1000 <= bookingEndTime)
        );
    });

    if (isDoubleBooking) {
        alert('This room is already booked for the selected time.');
    } else {
        selectedRoom.bookings.push({
            startTime: selectedTime.toISOString(),
            endTime: new Date(selectedTime.getTime() + 30 * 60 * 1000).toISOString(),
        });
        displayAvailableRooms();
        displayUserBookings();
        alert('Booking successful!');
        bookingTime.value = '';
    }
});


homeNav.addEventListener('click', function (event) {
    event.preventDefault();
    showHomeSection();
});


propertyNav.addEventListener('click', function (event) {
    event.preventDefault();
    showPropertySection();
    displayAvailableRooms();
    bookingSection.style.display = 'none';
    viewBookings.style.display = 'none';
});


aboutNav.addEventListener('click', function (event) {
    event.preventDefault();
    showAboutSection();
});


contactNav.addEventListener('click', function (event) {
    event.preventDefault();
    showContactSection();
});


propertyImages.addEventListener('click', function (event) {
    const clickedImage = event.target;

    if (clickedImage.classList.contains('nav-image')) {
        propertyImages.style.display = 'none';
        availableRooms.style.display = 'block';
        bookingSection.style.display = 'block';
        viewBookings.style.display = 'block';
        homeSection.style.display = 'none';
        backgroundImage.style.display = 'none';
        aboutSection.style.display = 'none';
        contactSection.style.display = 'none';
        const selectedRoomName = clickedImage.getAttribute('data-section');
        roomSelector.value = selectedRoomName;
        displayAvailableRooms();
    }
});


function showHomeSection() {
    homeSection.style.display = 'block';
    availableRooms.style.display = 'none';
    bookingSection.style.display = 'none';
    viewBookings.style.display = 'none';
    backgroundImage.style.display = 'block';
    propertyImages.style.display = 'none';
    aboutSection.style.display = 'none';
    contactSection.style.display = 'none';
}


function showPropertySection() {
    homeSection.style.display = 'none';
    availableRooms.style.display = 'none';
    bookingSection.style.display = 'none';
    viewBookings.style.display = 'none';
    backgroundImage.style.display = 'none';
    propertyImages.style.display = 'block';
    aboutSection.style.display = 'none';
    contactSection.style.display = 'none';
}


function showAboutSection() {
    homeSection.style.display = 'none';
    availableRooms.style.display = 'none';
    bookingSection.style.display = 'none';
    viewBookings.style.display = 'none';
    backgroundImage.style.display = 'none';
    propertyImages.style.display = 'none';
    aboutSection.style.display = 'block';
    contactSection.style.display = 'none';
}


function showContactSection() {
    homeSection.style.display = 'none';
    availableRooms.style.display = 'none';
    bookingSection.style.display = 'none';
    viewBookings.style.display = 'none';
    backgroundImage.style.display = 'none';
    propertyImages.style.display = 'none';
    aboutSection.style.display = 'none';
    contactSection.style.display = 'block';
}


showHomeSection();
populateRoomDropdown();
displayAvailableRooms();
displayUserBookings();


gotoPropertyButton.addEventListener('click', function (event) {
    event.preventDefault();
    showPropertySection();
    displayAvailableRooms();
    bookingSection.style.display = 'none';
    viewBookings.style.display = 'none';
});
