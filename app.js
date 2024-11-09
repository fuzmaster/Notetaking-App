// app.js

// Elements
const noteList = document.getElementById("note-list");
const noteTitle = document.getElementById("note-title");
const noteContent = document.getElementById("note-content");
const newNoteBtn = document.getElementById("new-note-btn");

let notes = JSON.parse(localStorage.getItem("notes")) || [];
let activeNoteId = null;

// Functions
function renderNotes() {
  noteList.innerHTML = "";
  notes.forEach(note => {
    const noteItem = document.createElement("li");
    noteItem.classList = "p-2 cursor-pointer bg-gray-200 hover:bg-gray-300 rounded";
    noteItem.textContent = note.title || "Untitled Note";
    noteItem.onclick = () => selectNote(note.id);
    noteList.appendChild(noteItem);
  });
}

function saveNotes() {
  localStorage.setItem("notes", JSON.stringify(notes));
}

function selectNote(id) {
  const note = notes.find(n => n.id === id);
  if (note) {
    activeNoteId = id;
    noteTitle.value = note.title;
    noteContent.value = note.content;
  }
}

function createNewNote() {
  const newNote = { id: Date.now(), title: "", content: "" };
  notes.push(newNote);
  activeNoteId = newNote.id;
  renderNotes();
  selectNote(newNote.id);
  saveNotes();
}

function updateActiveNote() {
  const note = notes.find(n => n.id === activeNoteId);
  if (note) {
    note.title = noteTitle.value;
    note.content = noteContent.value;
    renderNotes();
    saveNotes();
  }
}

// Event Listeners
newNoteBtn.addEventListener("click", createNewNote);
noteTitle.addEventListener("input", updateActiveNote);
noteContent.addEventListener("input", updateActiveNote);

// Initial Render
renderNotes();
