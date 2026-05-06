const paletteEl = document.getElementById("palette");
const generateBtn = document.getElementById("generateBtn");
const exportBtn = document.getElementById("exportBtn");
const saveBtn = document.getElementById("saveBtn");
const toast = document.getElementById("toast");

let colors = [];

function randomHex() {
  return (
    "#" +
    Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0")
  );
}

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r}, ${g}, ${b}`;
}

function createColorElement(color, index) {
  const div = document.createElement("div");
  div.className = "color";
  div.style.backgroundColor = color.hex;

  div.innerHTML = `
    <button class="lock-btn" data-index="${index}">${color.locked ? "🔒" : "🔓"}</button>
    <div class="info">
      <div class="hex">${color.hex}</div>
      <div class="rgb">${hexToRgb(color.hex)}</div>
    </div>
  `;

  div.addEventListener("click", (e) => {
    if (e.target.classList.contains("lock-btn")) return;
    navigator.clipboard.writeText(color.hex).then(() => {
      showToast(`Copied: ${color.hex}`);
    });
  });

  div.querySelector(".lock-btn").addEventListener("click", (e) => {
    e.stopPropagation();
    colors[index].locked = !colors[index].locked;
    renderPalette();
  });

  return div;
}

function renderPalette() {
  paletteEl.innerHTML = "";
  colors.forEach((color, index) => {
    paletteEl.appendChild(createColorElement(color, index));
  });
}

function generatePalette() {
  for (let i = 0; i < 5; i++) {
    if (!colors[i] || !colors[i].locked) {
      colors[i] = { hex: randomHex(), locked: false };
    }
  }
  renderPalette();
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2200);
}

exportBtn.addEventListener("click", () => {
  let css = ":root {\n";
  colors.forEach((color, i) => (css += `  --color-${i + 1}: ${color.hex};\n`));
  css += "}";
  navigator.clipboard.writeText(css);
  showToast("CSS Copied!");
});

saveBtn.addEventListener("click", () => {
  const saved = JSON.parse(localStorage.getItem("palettes") || "[]");
  saved.unshift({
    colors: colors.map((c) => c.hex),
    date: new Date().toLocaleString(),
  });
  localStorage.setItem("palettes", JSON.stringify(saved.slice(0, 15)));
  showToast("Palette Saved!");
});

generateBtn.addEventListener("click", generatePalette);
document.addEventListener("keydown", (e) => {
  if (e.key === " ") {
    e.preventDefault();
    generatePalette();
  }
});

generatePalette();
