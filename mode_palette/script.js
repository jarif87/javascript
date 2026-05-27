// Mood Palette - Complete JavaScript

// Data storage
let moodEntries = [];

// DOM Elements
const moodGrid = document.getElementById("moodGrid");
const moodNote = document.getElementById("moodNote");
const saveBtn = document.getElementById("saveMoodBtn");
const historyList = document.getElementById("historyList");
const clearHistoryBtn = document.getElementById("clearHistoryBtn");
const totalEntriesSpan = document.getElementById("totalEntries");
const topMoodSpan = document.getElementById("topMood");
const recentMoodSpan = document.getElementById("recentMood");

// Current selected mood
let selectedMood = null;
let selectedMoodData = null;

// Load data from localStorage
function loadData() {
  const stored = localStorage.getItem("mood_palette_entries");
  if (stored) {
    moodEntries = JSON.parse(stored);
  } else {
    // Add sample data for demo
    moodEntries = [
      {
        id: Date.now() - 86400000,
        mood: "happy",
        moodEmoji: "😊",
        moodColor: "#6BCB77",
        note: "Had a great day at work!",
        timestamp: Date.now() - 86400000,
      },
      {
        id: Date.now() - 172800000,
        mood: "calm",
        moodEmoji: "😌",
        moodColor: "#4D96FF",
        note: "Meditated in the morning ☀️",
        timestamp: Date.now() - 172800000,
      },
    ];
    saveData();
  }
  renderAll();
}

// Save to localStorage
function saveData() {
  localStorage.setItem("mood_palette_entries", JSON.stringify(moodEntries));
}

// Format date
function formatDate(timestamp) {
  const date = new Date(timestamp);
  const now = new Date();
  const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return `Today at ${date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
  } else if (diffDays === 1) {
    return `Yesterday at ${date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
  } else {
    return (
      date.toLocaleDateString("en-US", { month: "short", day: "numeric" }) +
      " at " +
      date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    );
  }
}

// Get mood card data from DOM
function getMoodCardData(card) {
  return {
    mood: card.getAttribute("data-mood"),
    color: card.getAttribute("data-color"),
    emoji:
      card.getAttribute("data-emoj") ||
      card.querySelector(".mood-emoji")?.innerText ||
      "😊",
  };
}

// Handle mood selection
function setupMoodSelection() {
  const moodCards = document.querySelectorAll(".mood-card");
  moodCards.forEach((card) => {
    card.addEventListener("click", () => {
      // Remove selected class from all
      moodCards.forEach((c) => c.classList.remove("selected"));
      // Add to current
      card.classList.add("selected");

      // Store selected mood
      selectedMood = card.getAttribute("data-mood");
      selectedMoodData = getMoodCardData(card);
    });
  });
}

// Add new mood entry
function addMoodEntry() {
  if (!selectedMood) {
    showToast("Please select a mood first!", "warning");
    return;
  }

  const note = moodNote.value.trim();
  const newEntry = {
    id: Date.now(),
    mood: selectedMood,
    moodEmoji: selectedMoodData.emoji,
    moodColor: selectedMoodData.color,
    note: note || "",
    timestamp: Date.now(),
  };

  moodEntries.unshift(newEntry); // Add to beginning for latest first
  saveData();
  renderAll();

  // Reset form
  moodNote.value = "";
  // Clear selection UI
  document
    .querySelectorAll(".mood-card")
    .forEach((c) => c.classList.remove("selected"));
  selectedMood = null;
  selectedMoodData = null;

  showToast("✨ Mood saved successfully!", "success");
}

// Delete single entry
function deleteEntry(id) {
  moodEntries = moodEntries.filter((entry) => entry.id !== id);
  saveData();
  renderAll();
  showToast("Entry removed", "info");
}

// Clear all history
function clearAllHistory() {
  if (moodEntries.length === 0) return;

  if (
    confirm(
      "Are you sure you want to clear your entire mood journal? This cannot be undone.",
    )
  ) {
    moodEntries = [];
    saveData();
    renderAll();
    showToast("Journal cleared", "info");
  }
}

// Calculate statistics
function updateStats() {
  const total = moodEntries.length;
  totalEntriesSpan.textContent = total;

  if (total === 0) {
    topMoodSpan.textContent = "—";
    recentMoodSpan.textContent = "—";
    return;
  }

  // Calculate most frequent mood
  const moodCount = {};
  moodEntries.forEach((entry) => {
    moodCount[entry.mood] = (moodCount[entry.mood] || 0) + 1;
  });

  let topMoodName = "—";
  let maxCount = 0;
  for (const [mood, count] of Object.entries(moodCount)) {
    if (count > maxCount) {
      maxCount = count;
      topMoodName = mood;
    }
  }
  topMoodSpan.textContent =
    topMoodName.charAt(0).toUpperCase() + topMoodName.slice(1);

  // Latest mood
  const latest = moodEntries[0];
  recentMoodSpan.textContent =
    latest.mood.charAt(0).toUpperCase() + latest.mood.slice(1);
}

// Render history list
function renderHistory() {
  if (moodEntries.length === 0) {
    historyList.innerHTML = `
            <div class="empty-history">
                <span>🌸</span>
                <p>no entries yet. select a mood and save your first memory!</p>
            </div>
        `;
    return;
  }

  historyList.innerHTML = moodEntries
    .map(
      (entry) => `
        <div class="history-item" style="border-left-color: ${entry.moodColor}">
            <div class="history-emoji">${entry.moodEmoji}</div>
            <div class="history-content">
                <div class="history-mood" style="color: ${entry.moodColor}">
                    ${entry.mood.charAt(0).toUpperCase() + entry.mood.slice(1)}
                </div>
                ${entry.note ? `<div class="history-note">${escapeHtml(entry.note)}</div>` : ""}
                <div class="history-date">${formatDate(entry.timestamp)}</div>
            </div>
            <button class="delete-entry" data-id="${entry.id}" title="delete entry">🗑️</button>
        </div>
    `,
    )
    .join("");

  // Add delete event listeners
  document.querySelectorAll(".delete-entry").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const id = parseInt(btn.getAttribute("data-id"));
      deleteEntry(id);
    });
  });
}

// Helper to escape HTML
function escapeHtml(str) {
  if (!str) return "";
  return str
    .replace(/[&<>]/g, function (m) {
      if (m === "&") return "&amp;";
      if (m === "<") return "&lt;";
      if (m === ">") return "&gt;";
      return m;
    })
    .replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, function (c) {
      return c;
    });
}

// Simple toast notification
function showToast(message, type = "info") {
  // Remove existing toast if any
  const existingToast = document.querySelector(".toast-notification");
  if (existingToast) existingToast.remove();

  const toast = document.createElement("div");
  toast.className = "toast-notification";
  toast.textContent = message;
  toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: ${type === "success" ? "#10b981" : type === "warning" ? "#f59e0b" : "#6366f1"};
        color: white;
        padding: 12px 24px;
        border-radius: 50px;
        font-weight: 600;
        z-index: 1000;
        animation: slideUp 0.3s ease-out;
        box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        font-family: 'Quicksand', sans-serif;
    `;

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(-50%) translateY(20px)";
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}

// Add animation keyframes dynamically
function addAnimationStyles() {
  if (!document.querySelector("#toast-keyframes")) {
    const style = document.createElement("style");
    style.id = "toast-keyframes";
    style.textContent = `
            @keyframes slideUp {
                from {
                    opacity: 0;
                    transform: translateX(-50%) translateY(20px);
                }
                to {
                    opacity: 1;
                    transform: translateX(-50%) translateY(0);
                }
            }
        `;
    document.head.appendChild(style);
  }
}

// Render everything
function renderAll() {
  renderHistory();
  updateStats();
}

// Initialize app
function init() {
  addAnimationStyles();
  loadData();
  setupMoodSelection();

  // Event listeners
  saveBtn.addEventListener("click", addMoodEntry);
  clearHistoryBtn.addEventListener("click", clearAllHistory);

  // Allow Enter key in textarea to save (Ctrl+Enter or Cmd+Enter)
  moodNote.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault();
      addMoodEntry();
    }
  });
}

// Start the app
init();
