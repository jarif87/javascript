// ============================================
// HYDROGLOW - Water Intake Tracker
// All interactive logic, local storage & animations
// ============================================

(function () {
  "use strict";

  // --- DOM Elements ---
  const waterFill = document.getElementById("waterFill");
  const waterSurface = document.getElementById("waterSurface");
  const percentageDisplay = document.getElementById("percentageDisplay");
  const glassesDrankEl = document.getElementById("glassesDrank");
  const streakCountEl = document.getElementById("streakCount");
  const mlDrankEl = document.getElementById("mlDrank");
  const historyList = document.getElementById("historyList");
  const particlesContainer = document.getElementById("particlesContainer");
  const toast = document.getElementById("toast");
  const toastMessage = document.getElementById("toastMessage");
  const customMlInput = document.getElementById("customMlInput");
  const customAddBtn = document.getElementById("customAddBtn");
  const clearTodayBtn = document.getElementById("clearTodayBtn");
  const quickAddButtons = document.querySelectorAll(".add-btn[data-ml]");

  // --- Constants ---
  const DAILY_GOAL_ML = 2000;
  const STORAGE_KEY = "hydroglow_tracker";
  const GLASS_SIZE_ML = 250; // 1 glass = 250ml

  // --- State ---
  let appData = loadData();

  // --- Data Structure ---
  function getDefaultData() {
    return {
      date: getTodayString(),
      totalMl: 0,
      history: [], // Array of { ml: number, time: string }
      streak: 0,
      lastActiveDate: null,
    };
  }

  function getTodayString() {
    return new Date().toISOString().split("T")[0];
  }

  function loadData() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        // Check if it's a new day
        if (parsed.date !== getTodayString()) {
          // Carry over streak if yesterday was active
          const yesterday = getYesterdayString();
          let newStreak = 0;
          if (
            parsed.lastActiveDate === yesterday &&
            parsed.totalMl >= DAILY_GOAL_ML
          ) {
            newStreak = (parsed.streak || 0) + 1;
          } else if (parsed.date === getTodayString()) {
            newStreak = parsed.streak || 0;
          }
          return {
            date: getTodayString(),
            totalMl: 0,
            history: [],
            streak: newStreak,
            lastActiveDate: parsed.date,
          };
        }
        return {
          ...parsed,
          streak: parsed.streak || 0,
          lastActiveDate: parsed.lastActiveDate || null,
          history: parsed.history || [],
        };
      }
    } catch (e) {
      console.warn("Failed to load data from localStorage", e);
    }
    return getDefaultData();
  }

  function getYesterdayString() {
    const d = new Date();
    d.setDate(d.getDate() - 1);
    return d.toISOString().split("T")[0];
  }

  function saveData() {
    appData.lastActiveDate = appData.date;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(appData));
    } catch (e) {
      console.warn("Failed to save data", e);
    }
  }

  // --- Update UI ---
  function updateUI() {
    const percentage = Math.min((appData.totalMl / DAILY_GOAL_ML) * 100, 100);
    const fillHeight = (percentage / 100) * 250; // Max water height in SVG coords
    const waterY = 280 - fillHeight;

    // Update water fill
    waterFill.setAttribute("y", waterY);
    waterFill.setAttribute("height", fillHeight);
    waterSurface.setAttribute("cy", waterY);

    // Update percentage
    percentageDisplay.textContent = Math.round(percentage) + "%";

    // Update stats
    const glassesCount = Math.floor(appData.totalMl / GLASS_SIZE_ML);
    glassesDrankEl.textContent = glassesCount;
    mlDrankEl.textContent = appData.totalMl;
    streakCountEl.textContent = appData.streak;

    // Update history list
    renderHistory();

    // Check goal reached
    if (
      percentage >= 100 &&
      appData.totalMl - getLastAddedMl() < DAILY_GOAL_ML
    ) {
      // Trigger celebration only when crossing 100%
      if (appData.totalMl >= DAILY_GOAL_ML) {
        celebrateGoal();
      }
    }
  }

  function getLastAddedMl() {
    if (appData.history.length === 0) return 0;
    return appData.history[appData.history.length - 1].ml;
  }

  function renderHistory() {
    historyList.innerHTML = "";
    if (appData.history.length === 0) {
      historyList.innerHTML = `
                        <div class="empty-state">
                            <i class="fas fa-water"></i>
                            <p>No water logged yet today</p>
                        </div>`;
      return;
    }

    // Show most recent first
    const reversed = [...appData.history].reverse();
    reversed.forEach((entry) => {
      const item = document.createElement("div");
      item.className = "history-item";
      item.innerHTML = `
                        <i class="fas fa-tint"></i>
                        <span class="ml-info">${entry.ml} ml</span>
                        <span class="time-info">${entry.time}</span>
                    `;
      historyList.appendChild(item);
    });
  }

  // --- Add Water ---
  function addWater(ml) {
    if (ml <= 0) return;
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    appData.totalMl += ml;
    appData.history.push({ ml, time: timeStr });

    // Update streak if goal just reached
    if (
      appData.totalMl >= DAILY_GOAL_ML &&
      appData.totalMl - ml < DAILY_GOAL_ML
    ) {
      appData.streak += 1;
      celebrateGoal();
    }

    saveData();
    updateUI();
    spawnParticles();
    showToast(`+${ml}ml added! 💧`);
  }

  // --- Celebration ---
  function celebrateGoal() {
    spawnParticles(20);
    showToast("🎉 Daily goal reached! Streak +1 🔥", false);
    // Extra particle burst
    setTimeout(() => spawnParticles(15), 400);
    setTimeout(() => spawnParticles(10), 800);
  }

  // --- Particles ---
  function spawnParticles(count = 8) {
    const emojis = ["💧", "✨", "💦", "🌟", "💙", "🔹", "🫧"];
    for (let i = 0; i < count; i++) {
      const particle = document.createElement("span");
      particle.className = "particle";
      particle.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      particle.style.left = "50%";
      particle.style.top = "40%";
      const angle = Math.random() * Math.PI * 2;
      const distance = 40 + Math.random() * 80;
      particle.style.setProperty("--dx", Math.cos(angle) * distance + "px");
      particle.style.setProperty(
        "--dy",
        Math.sin(angle) * distance - 30 + "px",
      );
      particle.style.animationDuration = 0.6 + Math.random() * 0.8 + "s";
      particlesContainer.appendChild(particle);

      // Remove after animation
      setTimeout(() => {
        if (particle.parentNode) {
          particle.remove();
        }
      }, 1500);
    }
  }

  // --- Toast ---
  let toastTimeout;
  function showToast(message, isWarning = false) {
    toastMessage.textContent = message;
    toast.className = "toast show";
    if (isWarning) toast.classList.add("warning");
    else toast.classList.remove("warning");

    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toast.className = "toast";
    }, 2200);
  }

  // --- Clear Today ---
  function clearToday() {
    if (confirm("Clear all water intake for today? This cannot be undone.")) {
      appData.totalMl = 0;
      appData.history = [];
      // Don't reset streak on clear
      saveData();
      updateUI();
      showToast("Today's log cleared", true);
    }
  }

  // --- Check for day change on visibility ---
  function checkDayChange() {
    const today = getTodayString();
    if (appData.date !== today) {
      // New day! Reset with streak logic
      const yesterday = getYesterdayString();
      let newStreak = 0;
      if (
        appData.lastActiveDate === yesterday &&
        appData.totalMl >= DAILY_GOAL_ML
      ) {
        newStreak = appData.streak + 1;
      }
      appData = {
        date: today,
        totalMl: 0,
        history: [],
        streak: newStreak,
        lastActiveDate: appData.date,
      };
      saveData();
      updateUI();
    }
  }

  // --- Event Listeners ---
  quickAddButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const ml = parseInt(btn.getAttribute("data-ml"), 10);
      addWater(ml);
    });
  });

  customAddBtn.addEventListener("click", () => {
    const ml = parseInt(customMlInput.value, 10);
    if (isNaN(ml) || ml <= 0) {
      showToast("Please enter a valid amount", true);
      return;
    }
    if (ml > 5000) {
      showToast("Max 5000ml at once 😅", true);
      return;
    }
    addWater(ml);
    customMlInput.value = 200;
  });

  customMlInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      customAddBtn.click();
    }
  });

  clearTodayBtn.addEventListener("click", clearToday);

  // Keyboard shortcut
  document.addEventListener("keydown", (e) => {
    if (e.key === " " && e.target === document.body) {
      e.preventDefault();
      addWater(250); // Default glass on spacebar
    }
  });

  // Check day change when tab becomes visible
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) {
      checkDayChange();
    }
  });

  // --- Initialization ---
  function init() {
    checkDayChange();
    updateUI();
    console.log("💧 HydroGlow initialized!");
    console.log("   Tip: Press SPACEBAR to log 250ml");
    console.log("   Daily Goal:", DAILY_GOAL_ML + "ml");
  }

  init();
})();
