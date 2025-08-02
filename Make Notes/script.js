let createBtn = document.querySelector(".create");
let container = document.querySelector(".notes-container");

// Load saved notes on page load
window.addEventListener("DOMContentLoaded", () => {
  let savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
  savedNotes.forEach(text => {
    createNote(text);
  });
});

// Create and add a new note
createBtn.addEventListener("click", () => {
  createNote("");
  saveNotes(); // Save immediately even if it's empty
});

function createNote(text = "") {
  let notes = document.createElement("textarea");
  notes.classList.add("note-input");
  notes.placeholder = "Write your note here...";
  notes.value = text;
  container.appendChild(notes);

  // Create delete button
  let deletebtn = document.createElement("button");
  deletebtn.style.cursor = "pointer";

  let img = document.createElement("img");
  img.classList.add("adjust-img");
  img.src = "./Assests/delete.png";
  deletebtn.classList.add("adjust");
  deletebtn.appendChild(img);

  notes.insertAdjacentElement("afterend", deletebtn);

  // Delete note logic
  deletebtn.addEventListener("click", () => {
    notes.remove();
    deletebtn.remove();
    saveNotes();
  });

  // Save on input
  notes.addEventListener("input", saveNotes);
}

// Save all notes to localStorage
function saveNotes() {
  let allNotes = document.querySelectorAll(".note-input");
  let data = [];
  allNotes.forEach(note => {
    data.push(note.value);
  });
  localStorage.setItem("notes", JSON.stringify(data));
}

