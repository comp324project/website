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