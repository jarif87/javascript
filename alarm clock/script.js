// Alarm Clock Application with 12/24 Hour Format Support
class AlarmClock {
  constructor() {
    this.alarms = [];
    this.is24Hour = false;
    this.audioContext = null;
    this.isRinging = false;
    this.currentAlarm = null;
    this.soundInterval = null;

    this.initElements();
    this.initEventListeners();
    this.loadPreferences();
    this.updateClock();
    setInterval(() => this.updateClock(), 1000);
    this.loadAlarms();
    this.updateFormatUI();
  }

  initElements() {
    // Clock elements
    this.clockTime = document.getElementById("clockTime");
    this.clockDate = document.getElementById("clockDate");
    this.ampm = document.getElementById("ampm");

    // Alarm setting elements
    this.hourInput = document.getElementById("alarmHour");
    this.minInput = document.getElementById("alarmMin");
    this.ampmDisplay = document.getElementById("alarmAmPm");
    this.ampmGroup = document.getElementById("ampmGroup");
    this.setAlarmBtn = document.getElementById("setAlarmBtn");
    this.alarmsList = document.getElementById("alarmsList");

    // Modal elements
    this.alarmModal = document.getElementById("alarmModal");
    this.modalTime = document.getElementById("modalTime");
    this.snoozeBtn = document.getElementById("snoozeBtn");
    this.stopAlarmBtn = document.getElementById("stopAlarmBtn");

    // Controls
    this.repeatCheck = document.getElementById("repeatAlarm");
    this.soundCheck = document.getElementById("soundEnabled");
    this.themeToggle = document.getElementById("themeToggle");
    this.formatToggle = document.getElementById("formatToggle");
    this.formatText = document.querySelector(".format-text");
  }

  initEventListeners() {
    // Time picker controls
    document
      .getElementById("hourUp")
      .addEventListener("click", () => this.adjustTime("hour", 1));
    document
      .getElementById("hourDown")
      .addEventListener("click", () => this.adjustTime("hour", -1));
    document
      .getElementById("minUp")
      .addEventListener("click", () => this.adjustTime("min", 1));
    document
      .getElementById("minDown")
      .addEventListener("click", () => this.adjustTime("min", -1));
    document
      .getElementById("ampmToggle")
      .addEventListener("click", () => this.toggleAmPm());
    document
      .getElementById("ampmToggleDown")
      .addEventListener("click", () => this.toggleAmPm());

    // Alarm controls
    this.setAlarmBtn.addEventListener("click", () => this.addAlarm());
    this.snoozeBtn.addEventListener("click", () => this.snoozeAlarm());
    this.stopAlarmBtn.addEventListener("click", () => this.stopAlarm());

    // Settings
    this.themeToggle.addEventListener("click", () => this.toggleTheme());
    this.formatToggle.addEventListener("click", () => this.toggleFormat());

    // Input validation
    this.hourInput.addEventListener("input", () => this.validateHour());
    this.minInput.addEventListener("input", () => this.validateMin());

    // Format inputs on blur
    this.hourInput.addEventListener("blur", () => {
      let val = parseInt(this.hourInput.value);
      this.hourInput.value = val.toString().padStart(2, "0");
    });

    this.minInput.addEventListener("blur", () => {
      let val = parseInt(this.minInput.value);
      this.minInput.value = val.toString().padStart(2, "0");
    });
  }

  validateHour() {
    let val = parseInt(this.hourInput.value);
    const max = this.is24Hour ? 23 : 12;
    const min = this.is24Hour ? 0 : 1;

    if (val > max) this.hourInput.value = max;
    if (val < min) this.hourInput.value = min;
  }

  validateMin() {
    let val = parseInt(this.minInput.value);
    if (val > 59) this.minInput.value = 59;
    if (val < 0) this.minInput.value = 0;
  }

  adjustTime(type, change) {
    if (type === "hour") {
      const max = this.is24Hour ? 23 : 12;
      const min = this.is24Hour ? 0 : 1;
      let val = parseInt(this.hourInput.value) + change;

      if (val > max) val = min;
      if (val < min) val = max;
      this.hourInput.value = val.toString().padStart(2, "0");
    } else {
      let val = parseInt(this.minInput.value) + change;
      if (val > 59) val = 0;
      if (val < 0) val = 59;
      this.minInput.value = val.toString().padStart(2, "0");
    }
  }

  toggleAmPm() {
    if (!this.is24Hour) {
      this.ampmDisplay.textContent =
        this.ampmDisplay.textContent === "AM" ? "PM" : "AM";
    }
  }

  toggleFormat() {
    this.is24Hour = !this.is24Hour;
    this.savePreferences();
    this.updateFormatUI();

    // Show notification
    this.showNotification(
      `Switched to ${this.is24Hour ? "24" : "12"} Hour Format`,
      "info",
    );
  }

  updateFormatUI() {
    // Update button text
    this.formatText.textContent = this.is24Hour ? "24H" : "12H";
    this.formatToggle.classList.toggle("active", this.is24Hour);

    // Update clock immediately
    this.updateClock();

    // Update hour input constraints
    if (this.is24Hour) {
      this.hourInput.setAttribute("max", "23");
      this.hourInput.setAttribute("min", "0");
      if (parseInt(this.hourInput.value) > 23) this.hourInput.value = "23";
      this.ampmGroup.classList.add("hidden");
    } else {
      this.hourInput.setAttribute("max", "12");
      this.hourInput.setAttribute("min", "1");
      if (parseInt(this.hourInput.value) > 12) {
        // Convert 24h to 12h
        this.convertTo12hPicker();
      }
      this.ampmGroup.classList.remove("hidden");
    }

    // Re-render alarms to show new format
    this.renderAlarms();
  }

  convertTo12hPicker() {
    let hour = parseInt(this.hourInput.value);
    if (hour > 12) {
      hour = hour - 12;
      this.ampmDisplay.textContent = "PM";
    } else if (hour === 0) {
      hour = 12;
      this.ampmDisplay.textContent = "AM";
    } else if (hour === 12) {
      this.ampmDisplay.textContent = "PM";
    } else {
      this.ampmDisplay.textContent = "AM";
    }
    this.hourInput.value = hour.toString().padStart(2, "0");
  }

  updateClock() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const seconds = now.getSeconds().toString().padStart(2, "0");

    // Update main clock based on format preference
    if (this.is24Hour) {
      const displayHours = hours.toString().padStart(2, "0");
      this.clockTime.textContent = `${displayHours}:${minutes}:${seconds}`;
      this.ampm.textContent = "";
    } else {
      const period = hours >= 12 ? "PM" : "AM";
      const displayHours = (hours > 12 ? hours - 12 : hours === 0 ? 12 : hours)
        .toString()
        .padStart(2, "0");
      this.clockTime.textContent = `${displayHours}:${minutes}:${seconds}`;
      this.ampm.textContent = period;
    }

    // Update date
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    this.clockDate.textContent = now.toLocaleDateString("en-US", options);

    // Check alarms
    this.checkAlarms(hours, parseInt(minutes), now.getSeconds());
  }

  checkAlarms(hours, minutes, seconds) {
    if (seconds === 0) {
      // Check only at the start of each minute
      this.alarms.forEach((alarm) => {
        if (
          alarm.hours === hours &&
          alarm.minutes === minutes &&
          alarm.active &&
          !alarm.snoozing
        ) {
          this.triggerAlarm(alarm);
        }
      });
    }
  }

  addAlarm() {
    let hours = parseInt(this.hourInput.value);
    const minutes = parseInt(this.minInput.value);

    // Convert to 24h format for storage if in 12h mode
    if (!this.is24Hour) {
      const ampm = this.ampmDisplay.textContent;
      if (ampm === "PM" && hours !== 12) hours += 12;
      if (ampm === "AM" && hours === 12) hours = 0;
    }

    // Check if alarm already exists at this time
    if (this.alarms.some((a) => a.hours === hours && a.minutes === minutes)) {
      this.showNotification("Alarm already exists for this time!", "error");
      return;
    }

    const alarm = {
      id: Date.now(),
      hours: hours,
      minutes: minutes,
      repeat: this.repeatCheck.checked,
      active: true,
      snoozing: false,
    };

    this.alarms.push(alarm);
    this.saveAlarms();
    this.renderAlarms();
    this.showNotification("Alarm set successfully!", "success");

    // Reset inputs
    this.repeatCheck.checked = false;
  }

  deleteAlarm(id) {
    this.alarms = this.alarms.filter((a) => a.id !== id);
    this.saveAlarms();
    this.renderAlarms();
  }

  toggleAlarm(id) {
    const alarm = this.alarms.find((a) => a.id === id);
    if (alarm) {
      alarm.active = !alarm.active;
      this.saveAlarms();
      this.renderAlarms();
    }
  }

  formatTimeDisplay(hours, minutes) {
    // Returns formatted time string based on user preference
    const mins = minutes.toString().padStart(2, "0");

    if (this.is24Hour) {
      const hrs = hours.toString().padStart(2, "0");
      return `${hrs}:${mins}`;
    } else {
      const period = hours >= 12 ? "PM" : "AM";
      const displayHours = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours;
      return `${displayHours.toString().padStart(2, "0")}:${mins} ${period}`;
    }
  }

  renderAlarms() {
    if (this.alarms.length === 0) {
      this.alarmsList.innerHTML = `
                <li class="empty-state">
                    <span class="empty-icon">⏰</span>
                    <p>No alarms set</p>
                    <small>Set an alarm to get started</small>
                </li>
            `;
      return;
    }

    this.alarmsList.innerHTML = this.alarms
      .map((alarm) => {
        const timeStr = this.formatTimeDisplay(alarm.hours, alarm.minutes);
        return `
            <li class="alarm-item ${alarm.active ? "active" : ""}">
                <div class="alarm-info">
                    <span class="alarm-time">${timeStr}</span>
                    <span class="alarm-meta">${alarm.repeat ? "🔁 Daily" : "⏱️ Once"} • ${alarm.active ? "Active" : "Off"}</span>
                </div>
                <div class="alarm-actions">
                    <button class="delete-btn" onclick="alarmClock.deleteAlarm(${alarm.id})" title="Delete">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
                    </button>
                </div>
            </li>
        `;
      })
      .join("");
  }

  triggerAlarm(alarm) {
    if (this.isRinging) return;

    this.isRinging = true;
    this.currentAlarm = alarm;

    // Show modal with appropriate format
    const timeStr = this.formatTimeDisplay(alarm.hours, alarm.minutes);
    this.modalTime.textContent = timeStr;

    this.alarmModal.classList.add("show");
    document.body.classList.add("alarm-active");

    if (this.soundCheck.checked) {
      this.playAlarmSound();
    }

    // Browser notification
    if ("Notification" in window && Notification.permission === "granted") {
      new Notification("Alarm Ringing!", {
        body: `It's ${timeStr}`,
        icon: "⏰",
      });
    }
  }

  playAlarmSound() {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

      const playBeep = () => {
        if (!this.isRinging) return;

        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.frequency.value = 800;
        osc.type = "sine";
        gain.gain.setValueAtTime(0.5, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(
          0.01,
          audioCtx.currentTime + 0.5,
        );

        osc.start(audioCtx.currentTime);
        osc.stop(audioCtx.currentTime + 0.5);

        setTimeout(() => {
          if (this.isRinging) {
            const osc2 = audioCtx.createOscillator();
            const gain2 = audioCtx.createGain();
            osc2.connect(gain2);
            gain2.connect(audioCtx.destination);
            osc2.frequency.value = 600;
            osc2.type = "square";
            gain2.gain.setValueAtTime(0.3, audioCtx.currentTime);
            gain2.gain.exponentialRampToValueAtTime(
              0.01,
              audioCtx.currentTime + 0.5,
            );
            osc2.start(audioCtx.currentTime);
            osc2.stop(audioCtx.currentTime + 0.5);
          }
        }, 200);

        this.soundInterval = setTimeout(playBeep, 1000);
      };

      playBeep();
    } catch (e) {
      console.error("Audio play failed:", e);
    }
  }

  stopAlarm() {
    this.isRinging = false;
    this.alarmModal.classList.remove("show");
    document.body.classList.remove("alarm-active");

    if (this.soundInterval) {
      clearTimeout(this.soundInterval);
    }

    if (this.currentAlarm) {
      if (!this.currentAlarm.repeat) {
        this.currentAlarm.active = false;
      }
      this.currentAlarm.snoozing = false;
      this.saveAlarms();
      this.renderAlarms();
    }

    this.currentAlarm = null;
  }

  snoozeAlarm() {
    if (!this.currentAlarm) return;

    this.stopAlarm();
    this.currentAlarm.snoozing = true;

    // Snooze for 5 minutes
    setTimeout(
      () => {
        if (this.currentAlarm) {
          this.currentAlarm.snoozing = false;
          this.triggerAlarm(this.currentAlarm);
        }
      },
      5 * 60 * 1000,
    );

    this.showNotification("Snoozed for 5 minutes", "info");
  }

  toggleTheme() {
    document.body.classList.toggle("light-mode");
    const isLight = document.body.classList.contains("light-mode");
    localStorage.setItem("theme", isLight ? "light" : "dark");
  }

  toggleFormat() {
    this.is24Hour = !this.is24Hour;
    this.savePreferences();
    this.updateFormatUI();
  }

  loadPreferences() {
    // Load theme
    const theme = localStorage.getItem("theme");
    if (theme === "light") {
      document.body.classList.add("light-mode");
    }

    // Load format preference
    const format = localStorage.getItem("timeFormat");
    if (format === "24h") {
      this.is24Hour = true;
    }

    // Request notification permission
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }
  }

  savePreferences() {
    localStorage.setItem("timeFormat", this.is24Hour ? "24h" : "12h");
  }

  saveAlarms() {
    localStorage.setItem("alarms", JSON.stringify(this.alarms));
  }

  loadAlarms() {
    const saved = localStorage.getItem("alarms");
    if (saved) {
      try {
        this.alarms = JSON.parse(saved);
        this.renderAlarms();
      } catch (e) {
        console.error("Failed to load alarms:", e);
        this.alarms = [];
      }
    }
  }

  showNotification(message, type) {
    const toast = document.createElement("div");
    toast.style.cssText = `
            position: fixed;
            bottom: 2rem;
            left: 50%;
            transform: translateX(-50%) translateY(100px);
            background: ${type === "error" ? "#ff4757" : type === "success" ? "#2ed573" : "#3742fa"};
            color: white;
            padding: 1rem 2rem;
            border-radius: 50px;
            font-weight: 600;
            box-shadow: 0 10px 40px rgba(0,0,0,0.3);
            z-index: 10000;
            transition: transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            font-family: var(--font-body);
        `;
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.style.transform = "translateX(-50%) translateY(0)";
    }, 100);

    setTimeout(() => {
      toast.style.transform = "translateX(-50%) translateY(100px)";
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }
}

// Initialize
const alarmClock = new AlarmClock();

// Keyboard shortcuts
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && alarmClock.isRinging) {
    alarmClock.snoozeAlarm();
  }
  if (e.key === "Enter" && e.target.tagName !== "BUTTON") {
    alarmClock.addAlarm();
  }
});

// Touch feedback
document.querySelectorAll("button").forEach((button) => {
  button.addEventListener("touchstart", () => {
    button.style.transform = "scale(0.95)";
  });
  button.addEventListener("touchend", () => {
    button.style.transform = "";
  });
});
