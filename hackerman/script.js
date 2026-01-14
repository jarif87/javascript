// ── Aggressive Matrix Rain ────────────────────────────────────
const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

const chars =
  "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン$%&@#*█▓▒░→←↑↓";
const fontSize = 18;
const columns = canvas.width / fontSize;
const drops = Array(Math.floor(columns)).fill(1);

function drawMatrix() {
  ctx.fillStyle = "rgba(0,0,0,0.055)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#00e676";
  ctx.font = `${fontSize}px monospace`;

  drops.forEach((y, i) => {
    const text = chars[Math.floor(Math.random() * chars.length)];
    ctx.fillText(text, i * fontSize, y * fontSize);

    if (y * fontSize > canvas.height && Math.random() > 0.96) drops[i] = 0;
    drops[i]++;
  });
}

setInterval(drawMatrix, 25); // very fast & chaotic

// ── Realistic Hacking Sequence ────────────────────────────────
const terminal = document.getElementById("terminal");
const successBox = document.getElementById("success");

const hackingSequence = [
  "$ sudo nmap -sS -p- -T4 -A 192.168.1.47",
  "[*] Scanning 65535 ports...",
  "Host is up (0.032s latency).",
  "PORT     STATE SERVICE    VERSION",
  "22/tcp   open  ssh        OpenSSH 8.9p1",
  "80/tcp   open  http       Apache httpd 2.4.52",
  "3306/tcp open  mysql      MySQL 8.0.28",
  " ",
  "$ sqlmap -u http://target.com/login --dbs --batch",
  "[*] starting sqlmap detection...",
  "available databases [4]:",
  "[*] information_schema",
  "[*] mysql",
  "[*] performance_schema",
  "[*] user_db",
  " ",
  "$ hydra -l admin -P /usr/share/wordlists/rockyou.txt ssh://192.168.1.47",
  "[DATA] attacking ssh://192.168.1.47:22/",
  "[22][ssh] host: 192.168.1.47   login: admin   password: summer2023!",
  "[STATUS] attack finished for 192.168.1.47 (waiting for children to complete)",
  "1 of 1 target successfully completed, 1 valid password found",
  " ",
  "$ msfconsole -q",
  "msf6 > use exploit/multi/http/struts2_namespace",
  "msf6 exploit(multi/http/struts2_namespace) > set RHOSTS 192.168.1.47",
  "msf6 exploit(multi/http/struts2_namespace) > exploit",
  "[*] Started reverse TCP handler on 0.0.0.0:4444",
  "[*] Sending stage (Java payload) ...",
  "[*] Meterpreter session 1 opened",
  " ",
  "> Dumping session credentials...",
  "admin:summer2023!",
  "root:letmein666",
  "db_user:Str0ngP@ss2025",
  " ",
  "> Exfiltrating sensitive data... 47MB / 128MB [=====>     ] 36%",
  "> Exfiltrating sensitive data... 128MB / 128MB [==========] 100%",
  " ",
  "> Escalating privileges...",
  "> Cleaning tracks...",
  " ",
  "> SYSTEM OVERRIDE COMPLETE",
];

let idx = 0;
let charPos = 0;
let displayed = "";

function typeLine() {
  if (idx >= hackingSequence.length) {
    // Grand finale
    setTimeout(() => {
      terminal.style.color = "#00e676";
      terminal.style.textShadow = "0 0 15px #00e676, 0 0 30px #00e676";
      successBox.textContent = "ACCESS GRANTED";
      successBox.style.opacity = "1";
      successBox.classList.add("glitch");

      // Epic success sound
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(180, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 1.8);
      gain.gain.setValueAtTime(0.35, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2.2);
      osc.connect(gain).connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 2.5);
    }, 1200);
    return;
  }

  const current = hackingSequence[idx];

  if (charPos < current.length) {
    displayed += current[charPos];
    terminal.textContent = displayed + (Math.random() > 0.35 ? "_" : "");
    charPos++;
    setTimeout(typeLine, 25 + Math.random() * 55);
  } else {
    displayed += "\n";
    terminal.textContent = displayed;
    charPos = 0;
    idx++;
    setTimeout(typeLine, 800 + Math.random() * 1400);
  }
}

setTimeout(typeLine, 1200);
