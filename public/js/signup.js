const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirm_password");
const loginButton = document.getElementById("login_button");
const errorMessage = document.getElementById("error-message");

function validatePassword() {
    if (password.value.trim() !== "" && password.value === confirmPassword.value) {
        loginButton.disabled = false;
        loginButton.classList.add("enabled");
        errorMessage.textContent = "";
    } else {
        loginButton.disabled = true;
        //loginButton.classList.remove("enabled");
        errorMessage.textContent = "Passwords do not match!";
    }
}

password.addEventListener("input", validatePassword);
confirmPassword.addEventListener("input", validatePassword);

loginButton.addEventListener("click", function () {
    //if (!loginButton.disabled) {
    
        window.location.href = "master-resume.html"; 
    //}
});