// Function to validate the form
function myFunction(event) {
    event.preventDefault();

    // Get form elements
    const username = document.getElementById('username');
    const email = document.getElementById('email');
    const phoneNumber = document.getElementById('phonenumber');
    const password = document.getElementById('userpass');
    const confirmPassword = document.getElementById('passConfirm');
    const gender = document.querySelector('input[name="gender"]:checked');
    const age = document.getElementById('age');
    const musicGenres = document.querySelectorAll('input[type="checkbox"]:checked');

    let errorMessages = [];

    // Validate username
    if (username.value.trim() === '') {
        errorMessages.push({ message: 'Username is required.', type: 'blank' });
    } else if (username.value.length < 3 && username.value.length > 12) {
        errorMessages.push({ message: 'Username must be 4 - 12 characters long.', type: 'invalid' });
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.value.trim() === '') {
        errorMessages.push({ message: 'Email is required.', type: 'blank' });
    } else if (!emailRegex.test(email.value)) {
        errorMessages.push({ message: 'Please enter a valid email address.', type: 'invalid' });
    }

    // Validate phone number
    const phoneRegex = /^\d{10}$/;
    if (phoneNumber.value.trim() === '') {
        errorMessages.push({ message: 'Phone number is required.', type: 'blank' });
    } else if (!phoneRegex.test(phoneNumber.value)) {
        errorMessages.push({ message: 'Please enter a valid 10-digit phone number.', type: 'invalid' });
    }

    // Validate password
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (password.value === '') {
        errorMessages.push({ message: 'Password is required.', type: 'blank' });
    } else if (!passwordRegex.test(password.value)) {
        errorMessages.push({ message: 'Password must be at least 8 characters long and include uppercase, lowercase, and a number.', type: 'invalid' });
    }

    // Confirm password
    if (confirmPassword.value === '') {
        errorMessages.push({ message: 'Please confirm your password.', type: 'blank' });
    } else if (password.value !== confirmPassword.value) {
        errorMessages.push({ message: 'Passwords do not match.', type: 'invalid' });
    }

    // Check if gender is selected
    if (!gender) {
        errorMessages.push({ message: 'Please select a gender.', type: 'blank' });
    }

    // Check if age group is selected
    if (age.value === '') {
        errorMessages.push({ message: 'Please select an age group.', type: 'blank' });
    }

    // Check if at least one music genre is selected
    if (musicGenres.length === 0) {
        errorMessages.push({ message: 'Please select at least one favorite music genre.', type: 'blank' });
    }

    // Display error messages or submit the form
    const errorMessageDiv = document.getElementById('errorMessage');
    errorMessageDiv.innerHTML = ''; // Clear previous error messages

    if (errorMessages.length > 0) {
        errorMessages.forEach(error => {
            const errorParagraph = document.createElement('p');
            errorParagraph.textContent = error.message;
            errorParagraph.className = error.type === 'blank' ? 'error-blank' : 'error-invalid';
            errorMessageDiv.appendChild(errorParagraph);
        });
    } else {
        alert('Form submitted');
    }
}

// Add event listener to the form
document.querySelector('form[name="userinfo"]').addEventListener('submit', myFunction);