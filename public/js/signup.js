const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirm_password");
const registerButton = document.getElementById("register-button");
const errorMessage = document.getElementById("error-message");

// Function to validate passwords
function validatePassword() {
  if (password.value.trim() !== "" && password.value === confirmPassword.value) {
    registerButton.disabled = false;
    registerButton.classList.add("enabled");
    errorMessage.textContent = "";
  } else {
    registerButton.disabled = true;
    registerButton.classList.remove("enabled");
    errorMessage.textContent = "Passwords do not match!";
  }
}

// Add event listeners for password fields
password.addEventListener("input", validatePassword);
confirmPassword.addEventListener("input", validatePassword);

// Form submission handler
document.getElementById('registration-form').addEventListener('submit', async (event) => {
  event.preventDefault(); // Prevent the form from submitting normally

  // Get form values
  const email = document.getElementById('email').value;
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirm_password').value;

  // Clear previous error messages
  errorMessage.textContent = '';

  // Validate inputs
  if (!email || !username || !password || !confirmPassword) {
    errorMessage.textContent = 'All fields are required.';
    return;
  }

  if (password !== confirmPassword) {
    errorMessage.textContent = 'Passwords do not match.';
    return;
  }

  if (password.length < 8) {
    errorMessage.textContent = 'Password must be at least 8 characters long.';
    return;
  }

  // Send data to the backend
  try {
    const response = await fetch('/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, username, password }),
    });

    const data = await response.json();

    if (response.ok) {
      // Registration successful
      alert('Registration successful!');
      window.location.href = '/login.html'; // Redirect to login page
    } else {
      // Display error message from the backend
      errorMessage.textContent = data.error || 'Registration failed.';
    }
  } catch (error) {
    console.error('Error:', error);
    errorMessage.textContent = 'An error occurred. Please try again.';
  }
});

// Enable form submission when the register button is clicked
registerButton.addEventListener("click", function () {
  document.getElementById('registration-form').submit(); // Trigger form submission
});