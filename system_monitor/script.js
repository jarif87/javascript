document.addEventListener("DOMContentLoaded", () => {
  // --- DOM elements ---
  const memoryPercentEl = document.getElementById("memory-percent");
  const memoryCircleEl = document.getElementById("memory-circle");
  const usedHeapEl = document.getElementById("used-js-heap");
  const totalHeapEl = document.getElementById("total-js-heap");
  const memoryApiStatus = document.getElementById("memory-api-status");

  const batteryPercentEl = document.getElementById("battery-percent");
  const batteryStatusEl = document.getElementById("battery-status");
  const batteryFillEl = document.getElementById("battery-fill");
  const chargingIcon = document.getElementById("charging-icon");
  const batteryApiStatus = document.getElementById("battery-api-status");

  const connTypeEl = document.getElementById("conn-type");
  const downlinkEl = document.getElementById("downlink-speed");
  const rttEl = document.getElementById("rtt-value");
  const signalBars = document.querySelectorAll(".bar");
  const networkApiStatus = document.getElementById("network-api-status");
  const connectionTypeHeader = document.getElementById("connection-type");
  const liveTimestamp = document.getElementById("live-timestamp");

  const CIRCUMFERENCE = 2 * Math.PI * 52; // ~326.7

  // --- Helper: format bytes to MB ---
  function bytesToMB(bytes) {
    if (!bytes && bytes !== 0) return "--";
    return (bytes / (1024 * 1024)).toFixed(1);
  }

  // --- 1. MEMORY (Performance API) ---
  function updateMemory() {
    // performance.memory is non-standard, available in Chrome
    if (window.performance && performance.memory) {
      const memory = performance.memory;
      const used = memory.usedJSHeapSize;
      const total = memory.jsHeapSizeLimit;
      const percent = total ? (used / total) * 100 : 0;

      memoryPercentEl.textContent = `${Math.round(percent)}%`;
      usedHeapEl.textContent = `${bytesToMB(used)} MB`;
      totalHeapEl.textContent = `${bytesToMB(total)} MB`;

      // Update gauge circle
      const offset = CIRCUMFERENCE - (percent / 100) * CIRCUMFERENCE;
      memoryCircleEl.style.strokeDashoffset = offset;

      memoryApiStatus.innerHTML = "🟢 performance.memory active";
      memoryApiStatus.style.color = "#a0f0c0";
    } else {
      memoryPercentEl.textContent = "--%";
      usedHeapEl.textContent = "-- MB";
      totalHeapEl.textContent = "-- MB";
      memoryCircleEl.style.strokeDashoffset = CIRCUMFERENCE;
      memoryApiStatus.innerHTML = "🔴 memory API unavailable (use Chrome)";
      memoryApiStatus.style.color = "#d67b7b";
    }
  }

  // --- 2. BATTERY STATUS API ---
  async function updateBattery() {
    if (!navigator.getBattery) {
      batteryApiStatus.innerHTML = "🔴 Battery API not supported";
      batteryApiStatus.style.color = "#d67b7b";
      batteryPercentEl.textContent = "--%";
      batteryStatusEl.textContent = "N/A";
      return;
    }

    try {
      const battery = await navigator.getBattery();

      const updateBatteryUI = () => {
        const level = battery.level * 100;
        batteryPercentEl.textContent = `${Math.round(level)}%`;
        batteryFillEl.style.height = `${level}%`;

        const charging = battery.charging;
        batteryStatusEl.textContent = charging ? "CHARGING" : "DISCHARGING";

        if (charging) {
          chargingIcon.style.display = "block";
          batteryFillEl.style.background =
            "linear-gradient(0deg, #ffd700, #ff8c00)";
        } else {
          chargingIcon.style.display = "none";
          if (level < 20) {
            batteryFillEl.style.background =
              "linear-gradient(0deg, #ff3333, #cc0000)";
          } else {
            batteryFillEl.style.background =
              "linear-gradient(0deg, #0f0, #6f0)";
          }
        }

        batteryApiStatus.innerHTML = "🟢 Battery API live";
        batteryApiStatus.style.color = "#a0f0c0";
      };

      // Initial update
      updateBatteryUI();

      // Listen to changes
      battery.addEventListener("levelchange", updateBatteryUI);
      battery.addEventListener("chargingchange", updateBatteryUI);
      battery.addEventListener("chargingtimechange", updateBatteryUI);
      battery.addEventListener("dischargingtimechange", updateBatteryUI);
    } catch (error) {
      batteryApiStatus.innerHTML = "🔴 Battery access denied";
      batteryApiStatus.style.color = "#d67b7b";
      batteryPercentEl.textContent = "--%";
    }
  }

  // --- 3. NETWORK INFORMATION API ---
  function updateNetworkInfo() {
    if (!navigator.connection) {
      networkApiStatus.innerHTML = "🔴 Network Info API unavailable";
      networkApiStatus.style.color = "#d67b7b";
      connTypeEl.textContent = "--";
      downlinkEl.textContent = "-- Mbps";
      rttEl.textContent = "-- ms";
      connectionTypeHeader.textContent = "⟳ NO NET DATA";
      return;
    }

    const connection = navigator.connection;

    const applyNetworkData = () => {
      const type = connection.effectiveType || "unknown";
      const downlink = connection.downlink || 0;
      const rtt = connection.rtt || 0;

      connTypeEl.textContent = type.toUpperCase();
      downlinkEl.textContent = `${downlink} Mbps`;
      rttEl.textContent = `${rtt} ms`;
      connectionTypeHeader.textContent = `⛓️ ${type.toUpperCase()} | ${downlink} Mbps`;

      // Update signal bars based on effective type
      signalBars.forEach((bar, index) => {
        bar.classList.remove("active");
      });

      let activeBars = 0;
      if (type === "slow-2g") activeBars = 1;
      else if (type === "2g") activeBars = 1;
      else if (type === "3g") activeBars = 2;
      else if (type === "4g") activeBars = 4;
      else activeBars = 3; // fallback

      for (let i = 0; i < activeBars; i++) {
        if (signalBars[i]) signalBars[i].classList.add("active");
      }

      networkApiStatus.innerHTML = "🟢 Network Info active";
      networkApiStatus.style.color = "#a0f0c0";
    };

    applyNetworkData();
    connection.addEventListener("change", applyNetworkData);
  }

  // --- 4. Live timestamp ---
  function updateTimestamp() {
    const now = new Date();
    const formatted = now.toTimeString().split(" ")[0];
    liveTimestamp.textContent = `[ SYSTEM TIME : ${formatted} ]`;
  }

  // --- Initial calls & intervals ---
  updateMemory();
  updateBattery();
  updateNetworkInfo();
  updateTimestamp();

  setInterval(updateMemory, 1500);
  setInterval(updateTimestamp, 1000);
  // Network and battery mostly event-driven, but we refresh memory periodically
  // Re-check network occasionally in case change event missed
  setInterval(() => {
    if (navigator.connection) {
      // force re-read (listener already attached, but just to be safe)
      const conn = navigator.connection;
      document.getElementById("downlink-speed").textContent =
        `${conn.downlink} Mbps`;
      document.getElementById("rtt-value").textContent = `${conn.rtt} ms`;
      document.getElementById("conn-type").textContent =
        conn.effectiveType?.toUpperCase() || "--";
    }
  }, 3000);
});
