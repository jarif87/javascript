const passwordDisplay = document.getElementById("password");
const lengthSlider = document.getElementById("length");
const lengthValue = document.getElementById("lengthValue");
const uppercaseCheck = document.getElementById("uppercase");
const lowercaseCheck = document.getElementById("lowercase");
const numbersCheck = document.getElementById("numbers");
const symbolsCheck = document.getElementById("symbols");
const generateBtn = document.getElementById("generateBtn");
const copyBtn = document.getElementById("copyBtn");
const strengthText = document.getElementById("strength");

const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowercase = "abcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";
const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";

function getRandomChar(str) {
  return str[Math.floor(Math.random() * str.length)];
}

function calculateStrength(length, hasUpper, hasLower, hasNum, hasSym) {
  let strength = 0;
  if (hasUpper) strength += 1;
  if (hasLower) strength += 1;
  if (hasNum) strength += 1;
  if (hasSym) strength += 1;

  // bonus for length
  if (length >= 16) strength += 2;
  else if (length >= 12) strength += 1;

  if (strength >= 6) return "Very Strong";
  if (strength >= 4) return "Strong";
  if (strength >= 3) return "Good";
  return "Weak";
}

function generatePassword() {
  let chars = "";
  if (uppercaseCheck.checked) chars += uppercase;
  if (lowercaseCheck.checked) chars += lowercase;
  if (numbersCheck.checked) chars += numbers;
  if (symbolsCheck.checked) chars += symbols;

  if (chars.length === 0) {
    passwordDisplay.value = "Select at least one option";
    strengthText.textContent = "Password Strength: —";
    return;
  }

  const len = parseInt(lengthSlider.value);
  let password = "";

  // guarantee at least one of each selected type
  if (uppercaseCheck.checked) password += getRandomChar(uppercase);
  if (lowercaseCheck.checked) password += getRandomChar(lowercase);
  if (numbersCheck.checked) password += getRandomChar(numbers);
  if (symbolsCheck.checked) password += getRandomChar(symbols);

  // fill the rest
  for (let i = password.length; i < len; i++) {
    password += getRandomChar(chars);
  }

  // shuffle
  password = password
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("");

  passwordDisplay.value = password;

  const strength = calculateStrength(
    len,
    uppercaseCheck.checked,
    lowercaseCheck.checked,
    numbersCheck.checked,
    symbolsCheck.checked,
  );

  strengthText.textContent = `Password Strength: ${strength}`;
}

function copyToClipboard() {
  if (!passwordDisplay.value || passwordDisplay.value.includes("Select"))
    return;

  navigator.clipboard.writeText(passwordDisplay.value).then(() => {
    const originalText = copyBtn.innerHTML;
    copyBtn.innerHTML = '<span style="color:#34d399">Copied!</span>';
    setTimeout(() => {
      copyBtn.innerHTML = originalText;
    }, 1800);
  });
}

// Event listeners
lengthSlider.addEventListener("input", () => {
  lengthValue.textContent = lengthSlider.value;
});

generateBtn.addEventListener("click", generatePassword);

copyBtn.addEventListener("click", copyToClipboard);

// Generate on first load
generatePassword();
