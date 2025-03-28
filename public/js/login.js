document.getElementById('login-form').addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent the form from submitting normally
  
    // Get form values
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');
  
    // Clear previous error messages
    errorMessage.textContent = '';
  
    // Validate inputs
    if (!username || !password) {
      errorMessage.textContent = 'Username and password are required.';
      return;
    }
  
    // Send data to the backend
    try {
      const response = await fetch('/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        // Login successful
        alert('Login successful!');
        window.location.href = '/master-resume.html'; // Redirect to dashboard or home page
      } else {
        // Display error message from the backend
        errorMessage.textContent = data.error || 'Login failed.';
      }
    } catch (error) {
      console.error('Error:', error);
      errorMessage.textContent = 'An error occurred. Please try again.';
    }
  });

  // Client-side JavaScript
function loginWithGoogle() {
  // Google OAuth 2.0 endpoint
  const authEndpoint = 'https://accounts.google.com/o/oauth2/v2/auth';

  // Your Google OAuth client ID
  const clientId = "774554048195-5i0csaeuovccp4cvqhbqvueg2nkdbe9p.apps.googleusercontent.com";

  // Redirect URI
  const redirectUri = encodeURIComponent('http://localhost:3000/auth/google/callback');

  // Scopes (permissions you want to request)
  const scopes = encodeURIComponent('profile email');

  // Construct the authorization URL
  const authUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scopes}&access_type=offline&prompt=consent`;

  //Open new auth window
  window.location.href = authUrl;
}

// Add an event listener to a button or link
//document.getElementById('google-login-button').addEventListener('click', loginWithGoogle());

// Get references to the input fields and the button
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const loginButton = document.getElementById('login-button');

// Function to check if both fields have values
function checkInputs() {
  const username = usernameInput.value.trim(); // Trim whitespace
  const password = passwordInput.value.trim(); // Trim whitespace

  if (username && password) {
    // Both fields have values, enable the button
    loginButton.removeAttribute('disabled');
    loginButton.classList.add('enabled');
  } else {
    // One or both fields are empty, disable the button
    loginButton.setAttribute('disabled', 'disabled');
    loginButton.classList.remove('enabled');
  }
}

// Add event listeners to the input fields
usernameInput.addEventListener('input', checkInputs);
passwordInput.addEventListener('input', checkInputs);

//checkInputs on page load to set the initial state
checkInputs();