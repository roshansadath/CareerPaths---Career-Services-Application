// Function to set the form message (success or error)
function setFormMessage(formElement, type, message) {
    const messageElement = formElement.querySelector(".form__message");
    messageElement.textContent = message;
    messageElement.classList.remove("form__message--success", "form__message--error");
    messageElement.classList.add(`form__message--${type}`);
  }
  
  // Function to set the input error message
  function setInputError(inputElement, message) {
    inputElement.classList.add("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = message;
  }
  
  // Function to reset the input error message
  function resetError(inputElement) {
    inputElement.classList.remove("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = "";
  }
  
  // Function to validate email address format
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("#login");
    const signUpForm = document.querySelector("#signup");
  
    // Switch to the signup form when "Create Account" link is clicked
    document.querySelector("#linkSignUp").addEventListener("click", e => {
      e.preventDefault();
      loginForm.classList.add("form--hidden");
      signUpForm.classList.remove("form--hidden");
    });
  
    // Switch to the login form when "Sign in" link is clicked
    document.querySelector("#linkLogin").addEventListener("click", e => {
      e.preventDefault();
      loginForm.classList.remove("form--hidden");
      signUpForm.classList.add("form--hidden");
    });
  
    // Handle form submission for the login form
    loginForm.addEventListener("submit", e => {
      e.preventDefault();
      // Perform Ajax/fetch login details, check success or error based on that and set the form message
      setFormMessage(loginForm, "error", "Invalid username/password combination!");
    });
  
    // Handle blur event for each input element
    document.querySelectorAll(".form__input").forEach(inputElement => {
      inputElement.addEventListener("blur", e => {
        if (e.target.id === "signupUsername") {
          if (e.target.value.length > 0 && e.target.value.length < 10) {
            setInputError(inputElement, "Username must be at least 10 characters in length");
          } else {
            resetError(inputElement); // Remove the error message if valid
          }
        }
  
        if (e.target.id === "signupEmail") {
          if (!isValidEmail(e.target.value)) {
            setInputError(inputElement, "Invalid email address");
          } else {
            resetError(inputElement); // Remove the error message if valid
          }
        }
  
        if (e.target.id === "signupPassword") {
          if (e.target.value.length > 0 && e.target.value.length < 8) {
            setInputError(inputElement, "Password must be at least 8 characters in length");
          } else {
            resetError(inputElement); // Remove the error message if valid
          }
        }
      });
    });
  });
  