// ZenType - Advanced Typing Speed Test
// Complete working version with all features

// ==================== QUOTE DATABASE ====================
const QUOTES = [
  "The only way to do great work is to love what you do. Stay hungry, stay foolish.",
  "Technology is best when it brings people together. Innovation distinguishes leaders from followers.",
  "Simplicity is the soul of efficiency. Focus on what matters and eliminate the rest.",
  "The future belongs to those who learn more skills and combine them in creative ways.",
  "Typing fast is not about speed alone; it's about rhythm, accuracy, and muscle memory.",
  "Discipline is the bridge between goals and accomplishment. Every keystroke builds momentum.",
  "You can have brilliant ideas, but if you can't execute them, your vision is just a dream.",
  "Code is like humor. When you have to explain it, it's bad. Keep it crisp and clear.",
  "The quick brown fox jumps over the lazy dog. Practice this sentence daily for finger dexterity.",
  "Success is the sum of small efforts, repeated day in and day out. Practice consistently.",
  "Dream big, start small, but most of all, start. The first word is always the hardest.",
  "Push yourself, because no one else is going to do it for you. Type with intention.",
  "Learning to type at high speed is a superpower. It saves hours over a lifetime.",
  "Every master was once a beginner. Every expert was once an amateur. Keep typing.",
  "The secret of getting ahead is getting started. Begin your test now.",
];

// ==================== DOM ELEMENTS ====================
const textDisplay = document.getElementById("textDisplay");
const userInput = document.getElementById("userInput");
const timeEl = document.getElementById("time");
const wpmEl = document.getElementById("wpm");
const accuracyEl = document.getElementById("accuracy");
const rawWpmEl = document.getElementById("rawWpm");
const cpsEl = document.getElementById("cps");
const progressBar = document.getElementById("progressBar");
const statusEl = document.getElementById("status");
const restartBtn = document.getElementById("restartBtn");
const nextBtn = document.getElementById("nextBtn");
const mode30 = document.getElementById("mode30");
const mode60 = document.getElementById("mode60");
const modeInf = document.getElementById("modeInf");
const themeBtn = document.getElementById("themeBtn");

// ==================== GAME STATE ====================
let currentQuote = "";
let quoteChars = [];
let currentIndex = 0;
let mistakes = 0;
let totalKeystrokes = 0;
let testActive = false;
let timer = null;
let timeLimit = 30;
let timeLeft = 30;
let startTime = null;
let isCompleted = false;

// ==================== INITIALIZATION ====================
function init() {
  loadRandomQuote();
  setupEventListeners();
  updateStats();
  userInput.focus();
  statusEl.textContent = "✅ Ready! Start typing in the box below 👇";
}

function loadRandomQuote() {
  const randomIndex = Math.floor(Math.random() * QUOTES.length);
  currentQuote = QUOTES[randomIndex];
  renderText();
  resetTestState();
}

function renderText() {
  textDisplay.innerHTML = "";
  quoteChars = [];

  for (let i = 0; i < currentQuote.length; i++) {
    const span = document.createElement("span");
    span.textContent = currentQuote[i];
    textDisplay.appendChild(span);
    quoteChars.push(span);
  }

  if (quoteChars.length > 0) {
    quoteChars[0].classList.add("current");
  }
}

function resetTestState() {
  currentIndex = 0;
  mistakes = 0;
  totalKeystrokes = 0;
  testActive = false;
  isCompleted = false;
  timeLeft = timeLimit;
  startTime = null;

  if (timer) {
    clearInterval(timer);
    timer = null;
  }

  userInput.value = "";
  timeEl.textContent = timeLimit === 0 ? "∞" : timeLeft;

  // Reset all spans
  quoteChars.forEach((span) => {
    span.classList.remove("correct", "incorrect", "current");
  });

  if (quoteChars.length > 0) {
    quoteChars[0].classList.add("current");
  }

  updateStats();
  updateProgress();
  statusEl.textContent = "✅ Test reset. Type to begin!";
}

// ==================== TEST LOGIC ====================
function startTest() {
  if (testActive || isCompleted) return;

  testActive = true;
  startTime = Date.now();
  statusEl.textContent = "🔥 Typing in progress! Keep going...";

  if (timeLimit > 0) {
    timer = setInterval(() => {
      if (!testActive) return;

      timeLeft--;
      timeEl.textContent = timeLeft;

      if (timeLeft <= 0) {
        endTest("timeout");
      }
    }, 1000);
  }
}

function endTest(reason) {
  if (!testActive) return;

  testActive = false;

  if (timer) {
    clearInterval(timer);
    timer = null;
  }

  if (reason === "complete") {
    isCompleted = true;
    statusEl.textContent =
      "🎉 Congratulations! Test completed! Press Next or Restart.";
  } else if (reason === "timeout") {
    statusEl.textContent = "⏰ Time is up! Press Restart to try again.";
    timeEl.textContent = "0";
  }

  updateStats();
}

function checkTyping() {
  // Auto-start test on first keystroke
  if (
    !testActive &&
    !isCompleted &&
    (timeLimit === 0 || timeLeft > 0) &&
    currentIndex < currentQuote.length
  ) {
    startTest();
  }

  if (!testActive && !isCompleted) return;
  if (isCompleted) return;
  if (timeLimit > 0 && timeLeft <= 0) return;
  if (currentIndex >= currentQuote.length) return;

  const typedValue = userInput.value;
  const expectedChar = currentQuote[currentIndex];
  const typedChar = typedValue[currentIndex];

  // Handle backspace (if typedValue is shorter than currentIndex)
  if (!typedChar && typedValue.length < currentIndex) {
    // Backspace detected
    if (currentIndex > 0) {
      currentIndex--;
      totalKeystrokes++;

      // Remove incorrect class if it was a mistake
      if (quoteChars[currentIndex].classList.contains("incorrect")) {
        mistakes--;
      }

      quoteChars[currentIndex].classList.remove("correct", "incorrect");
      quoteChars[currentIndex].classList.add("current");

      if (currentIndex + 1 < quoteChars.length) {
        quoteChars[currentIndex + 1].classList.remove("current");
      }
    }
    updateStats();
    updateProgress();
    return;
  }

  // Normal typing
  if (typedChar !== undefined && currentIndex < typedValue.length) {
    totalKeystrokes++;

    if (typedChar === expectedChar) {
      quoteChars[currentIndex].classList.add("correct");
    } else {
      quoteChars[currentIndex].classList.add("incorrect");
      mistakes++;
    }

    quoteChars[currentIndex].classList.remove("current");
    currentIndex++;

    if (currentIndex < quoteChars.length) {
      quoteChars[currentIndex].classList.add("current");
    }

    updateStats();
    updateProgress();

    // Check if completed
    if (currentIndex >= currentQuote.length) {
      endTest("complete");
    }
  }
}

// ==================== STATISTICS ====================
function updateStats() {
  let elapsedSeconds;

  if (testActive && startTime) {
    elapsedSeconds = (Date.now() - startTime) / 1000;
  } else if (timeLimit > 0) {
    elapsedSeconds = timeLimit - timeLeft;
  } else {
    elapsedSeconds = 0.001;
  }

  const timeElapsed = Math.max(0.001, elapsedSeconds);

  const correctChars = currentIndex - mistakes;
  const rawKeystrokes = totalKeystrokes;

  // WPM = (correct chars / 5) / (minutes)
  const wpm = correctChars / 5 / (timeElapsed / 60);
  const rawWpm = rawKeystrokes / 5 / (timeElapsed / 60);
  const accuracy =
    currentIndex === 0 ? 100 : (correctChars / currentIndex) * 100;
  const cps = rawKeystrokes / timeElapsed;

  wpmEl.textContent = Math.floor(wpm) || 0;
  rawWpmEl.textContent = Math.floor(rawWpm) || 0;
  accuracyEl.textContent = Math.floor(accuracy) || 100;
  cpsEl.textContent = cps.toFixed(2);
}

function updateProgress() {
  const percent = (currentIndex / currentQuote.length) * 100;
  progressBar.style.width = `${percent}%`;
}

// ==================== CONTROL FUNCTIONS ====================
function restart() {
  if (timer) clearInterval(timer);
  testActive = false;
  timer = null;
  timeLeft = timeLimit;
  timeEl.textContent = timeLimit === 0 ? "∞" : timeLeft;
  userInput.value = "";
  currentIndex = 0;
  mistakes = 0;
  totalKeystrokes = 0;
  isCompleted = false;

  quoteChars.forEach((span) => {
    span.classList.remove("correct", "incorrect", "current");
  });

  if (quoteChars.length > 0) {
    quoteChars[0].classList.add("current");
  }

  updateStats();
  updateProgress();
  statusEl.textContent = "✅ Restarted! Type to begin...";
  userInput.focus();
}

function nextPassage() {
  if (timer) clearInterval(timer);
  testActive = false;
  timer = null;
  loadRandomQuote();
  userInput.focus();
}

function setMode(seconds, activeBtn) {
  timeLimit = seconds;
  timeLeft = seconds;
  timeEl.textContent = seconds === 0 ? "∞" : seconds;

  [mode30, mode60, modeInf].forEach((btn) => btn.classList.remove("active"));
  activeBtn.classList.add("active");

  restart();
}

function toggleTheme() {
  document.body.classList.toggle("light-theme");
  themeBtn.textContent = document.body.classList.contains("light-theme")
    ? "☀️ LIGHT"
    : "🌙 DARK";
}

// ==================== EVENT LISTENERS ====================
function setupEventListeners() {
  userInput.addEventListener("input", checkTyping);
  restartBtn.addEventListener("click", restart);
  nextBtn.addEventListener("click", nextPassage);
  mode30.addEventListener("click", () => setMode(30, mode30));
  mode60.addEventListener("click", () => setMode(60, mode60));
  modeInf.addEventListener("click", () => setMode(0, modeInf));
  themeBtn.addEventListener("click", toggleTheme);

  // Keyboard shortcuts
  document.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "k") {
      e.preventDefault();
      restart();
    }
    if ((e.ctrlKey || e.metaKey) && e.key === "n") {
      e.preventDefault();
      nextPassage();
    }
  });

  // Click on text display to focus input
  textDisplay.addEventListener("click", () => {
    userInput.focus();
  });
}

// ==================== START APPLICATION ====================
init();
