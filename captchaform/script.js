// Selecting necessary DOM elements
const captchaTextBox = document.querySelector(".captch_box input");
const refreshButton = document.querySelector(".refresh_button");
const captchaInputBox = document.querySelector(".captch_input input");
const message = document.querySelector(".message");
const submitButton = document.querySelector(".button");

// Variable to store generated captcha
let captchaText = null;
let timeoutId = null; // To track auto-refresh

// Function to generate captcha
const generateCaptcha = () => {
  const randomString = Math.random().toString(36).substring(2, 7);
  const randomStringArray = randomString.split("");
  const changeString = randomStringArray.map((char) => (Math.random() > 0.5 ? char.toUpperCase() : char));
  captchaText = changeString.join("   ");
  captchaTextBox.value = captchaText;
  
  resetAutoRefresh(); // Restart auto-refresh timer
};

// Function to reset auto-refresh timer
const resetAutoRefresh = () => {
  clearTimeout(timeoutId); // Clear previous timeout
  timeoutId = setTimeout(() => {
    if (!captchaInputBox.value) {
      generateCaptcha(); // Refresh captcha if no input
    }
  }, 10000); // 1 second delay
};

const refreshBtnClick = () => {
  generateCaptcha();
  captchaInputBox.value = "";
  captchaKeyUpValidate();
};

const captchaKeyUpValidate = () => {
  // Toggle submit button disable class based on captcha input field.
  submitButton.classList.toggle("disabled", !captchaInputBox.value);
  if (!captchaInputBox.value) {
    message.classList.remove("active");
    resetAutoRefresh(); // Restart auto-refresh if empty
  }
};

// Function to validate the entered captcha
const submitBtnClick = () => {
  const formattedCaptchaText = captchaText.replace(/\s/g, ""); // Remove spaces
  message.classList.add("active");

  // Check if the entered captcha text is correct
  if (captchaInputBox.value === formattedCaptchaText) {
    message.innerText = "Entered captcha is correct";
    message.style.color = "#28b01e";
  } else {
    message.innerText = "Entered captcha is not correct";
    message.style.color = "#FF2525";
    setTimeout(() => {
      generateCaptcha(); // Generate new captcha if incorrect
      captchaInputBox.value = "";
      message.classList.remove("active");
    }, 1000);
  }
};

// Add event listeners for the refresh button, captcha input, and submit button
refreshButton.addEventListener("click", refreshBtnClick);
captchaInputBox.addEventListener("keyup", captchaKeyUpValidate);
submitButton.addEventListener("click", submitBtnClick);

// Generate a captcha when the page loads
generateCaptcha();
