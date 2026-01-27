let quill;
let user;
let currentNoteId = null;
let notes = {};

const CLIENT_ID =
  "330144937663-30ggc3v6rj9a85ooo34nq0im76vtqjlv.apps.googleusercontent.com";

function initGoogleSignIn() {
  google.accounts.id.initialize({
    client_id: CLIENT_ID,
    callback: handleCredentialResponse,
    auto_select: true,
    cancel_on_tap_outside: false,
  });

  google.accounts.id.renderButton(
    document.getElementById("google-signin-button"),
    { theme: "outline", size: "large", text: "continue_with", width: "320" },
  );

  google.accounts.id.prompt((notification) => {
    if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
      checkIfAlreadySignedIn();
    }
  });
}

function checkIfAlreadySignedIn() {
  const savedUser = localStorage.getItem("signedInUser");
  if (savedUser) {
    user = JSON.parse(savedUser);
    document.getElementById("auth").style.display = "none";
    document.getElementById("app").style.display = "flex";
    document.getElementById("user-name").textContent = user.name;

    loadAllNotes();
    if (Object.keys(notes).length === 0) createNewNote();
    else {
      currentNoteId = Object.keys(notes).pop();
      loadNote(currentNoteId);
    }
    initQuill();
  }
}

function handleCredentialResponse(response) {
  const payload = parseJwt(response.credential);
  user = { name: payload.name, email: payload.email };
  localStorage.setItem("signedInUser", JSON.stringify(user));

  document.getElementById("auth").style.display = "none";
  document.getElementById("app").style.display = "flex";
  document.getElementById("user-name").textContent = user.name;

  loadAllNotes();
  if (Object.keys(notes).length === 0) createNewNote();
  else {
    currentNoteId = Object.keys(notes).pop();
    loadNote(currentNoteId);
  }

  initQuill();
}

function parseJwt(token) {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
      .join(""),
  );
  return JSON.parse(jsonPayload);
}

function signOut() {
  google.accounts.id.disableAutoSelect();
  localStorage.removeItem("signedInUser");
  if (user?.email) {
    google.accounts.id.revoke(user.email, () => {
      document.getElementById("app").style.display = "none";
      document.getElementById("auth").style.display = "flex";
      quill?.disable();
      quill = null;
      user = null;
      currentNoteId = null;
      notes = {};
    });
  }
}

function initQuill() {
  const toolbarOptions = [
    ["bold", "italic", "underline", "strike"],
    ["blockquote", "code-block"],
    [{ header: 1 }, { header: 2 }],
    [{ list: "ordered" }, { list: "bullet" }],
    [
      { align: "left" },
      { align: "center" },
      { align: "right" },
      { align: "justify" },
    ],
    [{ color: [] }, { background: [] }],
    ["link", "image", "video", "formula"],
    ["clean"],
  ];

  quill = new Quill("#editor", {
    modules: {
      syntax: true,
      toolbar: toolbarOptions,
      formula: true,
      clipboard: true,
    },
    placeholder: "Start writing here...",
    theme: "snow",
  });

  quill.on("text-change", debounce(saveCurrentNote, 700));
  document
    .getElementById("note-title")
    .addEventListener("input", debounce(saveCurrentNote, 700));
}

function loadAllNotes() {
  const saved = localStorage.getItem(`notes_${user.email}`);
  notes = saved ? JSON.parse(saved) : {};
  renderNotesList();
}

function saveAllNotes() {
  localStorage.setItem(`notes_${user.email}`, JSON.stringify(notes));
}

function createNewNote() {
  const id = Date.now().toString();
  notes[id] = { title: "Untitled note", content: { ops: [{ insert: "\n" }] } };
  currentNoteId = id;
  renderNotesList();
  loadNote(id);
  saveAllNotes();
}

function loadNote(id) {
  if (!notes[id] || !quill) return;
  currentNoteId = id;
  document.getElementById("note-title").value = notes[id].title;
  quill.setContents(notes[id].content);
  document
    .querySelectorAll(".note-item")
    .forEach((el) => el.classList.toggle("active", el.dataset.id === id));
}

function saveCurrentNote() {
  if (!currentNoteId || !quill) return;
  const titleEl = document.getElementById("note-title");
  const title = titleEl.value.trim() || "Untitled note";
  notes[currentNoteId] = { title, content: quill.getContents() };
  saveAllNotes();
  renderNotesList();
}

function deleteCurrentNote() {
  if (!currentNoteId || !confirm("Delete this note permanently?")) return;
  delete notes[currentNoteId];
  saveAllNotes();
  const ids = Object.keys(notes);
  currentNoteId = ids.length ? ids.pop() : null;
  if (currentNoteId) loadNote(currentNoteId);
  else createNewNote();
  renderNotesList();
}

function renderNotesList() {
  const ul = document.getElementById("notes-list");
  ul.innerHTML = "";
  Object.entries(notes).forEach(([id, note]) => {
    const li = document.createElement("li");
    li.className = `note-item${id === currentNoteId ? " active" : ""}`;
    li.dataset.id = id;
    li.textContent = note.title;
    li.addEventListener("click", () => {
      saveCurrentNote();
      loadNote(id);
    });
    ul.appendChild(li);
  });
}

function debounce(fn, ms) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  };
}

function showToast(msg) {
  const toast = document.getElementById("toast");
  toast.textContent = msg;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2200);
}

document.getElementById("new-note")?.addEventListener("click", createNewNote);
document.getElementById("save-btn")?.addEventListener("click", () => {
  saveCurrentNote();
  showToast("Saved");
});
document
  .getElementById("delete-btn")
  ?.addEventListener("click", deleteCurrentNote);
document.getElementById("signout-btn")?.addEventListener("click", signOut);

window.onload = initGoogleSignIn;
