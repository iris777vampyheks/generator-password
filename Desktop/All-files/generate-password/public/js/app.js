// Define the characters array as a string instead of an array
const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!?{}-+=[]|~`@#_/*AZERTYUIOPMLKQHSDFJGKNBVCXWX";

// Query the elements only once using a single querySelectorAll call
const passwordContainers = document.querySelectorAll(".password");
const generateBtn = document.querySelector("#generate");
const lengthValue = document.querySelector("#length-value");
const strengthIndicator = document.querySelector(".strength-indicator");
const savedPasswordsList = document.querySelector("#savedPasswordsList");
const backupCodesList = document.querySelector("#backupCodesList");
const generateBackupCodesBtn = document.querySelector("#generateBackupCodes");
const restoreBackupCodesBtn = document.querySelector("#restoreBackupCodes");
const restorePasswordsBtn = document.querySelector("#restorePasswordsBtn");

// Get a random character directly from the string
function randomCharacter() {
    const randomNumber = Math.floor(Math.random() * characters.length);
    return characters[randomNumber];
}

// Set a default password length
function setPassLength() {
    const inputValue = lengthValue.value;
    return inputValue === "" ? 12 : inputValue;
}

// Generate a password of the given length
function generatePassword(length) {
    let password = '';
    for (let i = 0; i < length; i++) {
        password += randomCharacter();
    }
    return password;
}

// Calculate password strength based on length
function calculatePasswordStrength(password) {
    return Math.min(100, (password.length / 20) * 100); 
}

// Update the strength indicator color and width
function updateStrengthIndicator(password) {
    const strength = calculatePasswordStrength(password);
    strengthIndicator.style.width = `${strength}%`;

    if (strength < 50) {
        strengthIndicator.style.backgroundColor = "red";
    } else if (strength < 80) {
        strengthIndicator.style.backgroundColor = "orange";
    } else {
        strengthIndicator.style.backgroundColor = "green";
    }
}

// Render generated passwords to the screen
function renderPasswords() {
    passwordContainers.forEach(container => {
        const length = setPassLength();
        const password = generatePassword(length);
        container.textContent = password;
        updateStrengthIndicator(password);
    });
}

// Copy password to clipboard
function copyToClipboard(password) {
    navigator.clipboard.writeText(password).then(() => {
        console.log("Password copied to clipboard successfully");
    });
}

// Attach event listeners
passwordContainers.forEach(container => {
    container.addEventListener("click", () => {
        copyToClipboard(container.textContent);
        savePassword(container.textContent); // Save the password
    });
});

generateBtn.addEventListener("click", renderPasswords);

const savedPasswords = []; // Simulated saved passwords array