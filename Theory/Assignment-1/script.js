const noteInput = document.getElementById("noteInput");
const categoryInput = document.getElementById("categoryInput");
const addBtn = document.getElementById("addBtn");

const searchInput = document.getElementById("searchInput");
const filterInput = document.getElementById("filterInput");

const notesList = document.getElementById("notesList");
const emptyMessage = document.getElementById("emptyMessage");
const noteCount = document.getElementById("noteCount");

const themeBtn = document.getElementById("themeBtn");
const exportBtn = document.getElementById("exportBtn");
const importInput = document.getElementById("importInput");


/* =========================
   LOCAL STORAGE
========================= */

function getNotes() {
    const raw = localStorage.getItem("notes");

    try {
        return raw ? JSON.parse(raw) : [];
    } catch (error) {
        console.error("Invalid notes data:", error);
        return [];
    }
}


function saveNotes(notes) {
    localStorage.setItem("notes", JSON.stringify(notes));
}


/* =========================
   CREATE
========================= */

function addNote() {

    const text = noteInput.value.trim();

    if (!text) {
        alert("Please enter a note.");
        return;
    }

    const notes = getNotes();

    const note = {
        id: Date.now(),
        text: text,
        completed: false,
        category: categoryInput.value,
        createdAt: new Date().toISOString(),
        updatedAt: null
    };

    notes.push(note);

    saveNotes(notes);

    noteInput.value = "";

    renderNotes();
}


/* =========================
   DELETE
========================= */

function deleteNote(id) {

    const notes = getNotes();

    const updatedNotes = notes.filter(note => note.id !== id);

    saveNotes(updatedNotes);

    renderNotes();
}


/* =========================
   EDIT
========================= */

function editNote(id) {

    const notes = getNotes();

    const note = notes.find(note => note.id === id);

    if (!note) return;

    const newText = prompt("Edit your note:", note.text);

    if (newText === null) {
        return;
    }

    const trimmedText = newText.trim();

    if (!trimmedText) {
        alert("Note cannot be empty.");
        return;
    }

    note.text = trimmedText;
    note.updatedAt = new Date().toISOString();

    saveNotes(notes);

    renderNotes();
}


/* =========================
   COMPLETE / INCOMPLETE
========================= */

function toggleComplete(id) {

    const notes = getNotes();

    const note = notes.find(note => note.id === id);

    if (!note) return;

    note.completed = !note.completed;
    note.updatedAt = new Date().toISOString();

    saveNotes(notes);

    renderNotes();
}


/* =========================
   SEARCH + FILTER
========================= */

function getFilteredNotes() {

    const notes = getNotes();

    const searchText = searchInput.value
        .toLowerCase()
        .trim();

    const filter = filterInput.value;

    return notes.filter(note => {

        const matchesSearch =
            note.text.toLowerCase().includes(searchText) ||
            note.category.toLowerCase().includes(searchText);

        let matchesFilter = true;

        if (filter === "active") {
            matchesFilter = !note.completed;
        }

        if (filter === "completed") {
            matchesFilter = note.completed;
        }

        return matchesSearch && matchesFilter;
    });
}


/* =========================
   FORMAT DATE
========================= */

function formatDate(date) {

    return new Date(date).toLocaleString("en-IN", {
        dateStyle: "medium",
        timeStyle: "short"
    });
}


/* =========================
   RENDER
========================= */

function renderNotes() {

    const notes = getFilteredNotes();

    notesList.innerHTML = "";

    if (notes.length === 0) {
        emptyMessage.style.display = "block";
    } else {
        emptyMessage.style.display = "none";
    }

    notes.forEach(note => {

        const card = document.createElement("div");

        card.className = "note-card";

        if (note.completed) {
            card.classList.add("completed");
        }

        const header = document.createElement("div");
        header.className = "note-header";

        const text = document.createElement("p");
        text.className = "note-text";
        text.textContent = note.text;

        header.appendChild(text);

        const category = document.createElement("span");
        category.className = "category";
        category.textContent = note.category;

        const date = document.createElement("div");
        date.className = "note-date";

        date.textContent =
            "Created: " + formatDate(note.createdAt);

        if (note.updatedAt) {
            date.textContent +=
                " • Updated: " + formatDate(note.updatedAt);
        }

        const actions = document.createElement("div");
        actions.className = "note-actions";

        const completeButton = document.createElement("button");
        completeButton.className = "complete-btn";

        completeButton.textContent =
            note.completed ? "Incomplete" : "Complete";

        completeButton.addEventListener("click", () => {
            toggleComplete(note.id);
        });


        const editButton = document.createElement("button");

        editButton.className = "edit-btn";
        editButton.textContent = "Edit";

        editButton.addEventListener("click", () => {
            editNote(note.id);
        });


        const deleteButton = document.createElement("button");

        deleteButton.className = "delete-btn";
        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", () => {

            const confirmDelete =
                confirm("Delete this note?");

            if (confirmDelete) {
                deleteNote(note.id);
            }
        });


        actions.appendChild(completeButton);
        actions.appendChild(editButton);
        actions.appendChild(deleteButton);


        card.appendChild(header);
        card.appendChild(category);
        card.appendChild(date);
        card.appendChild(actions);

        notesList.appendChild(card);
    });


    const total = getNotes().length;

    noteCount.textContent =
        `${total} ${total === 1 ? "note" : "notes"}`;
}


/* =========================
   DARK / LIGHT MODE
========================= */

function loadTheme() {

    const theme = localStorage.getItem("theme");

    if (theme === "dark") {
        document.body.classList.add("dark");
        themeBtn.textContent = "☀️";
    }
}


themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    const isDark =
        document.body.classList.contains("dark");

    localStorage.setItem(
        "theme",
        isDark ? "dark" : "light"
    );

    themeBtn.textContent =
        isDark ? "☀️" : "🌙";
});


/* =========================
   EXPORT JSON
========================= */

exportBtn.addEventListener("click", () => {

    const notes = getNotes();

    const data = JSON.stringify(notes, null, 2);

    const blob = new Blob(
        [data],
        { type: "application/json" }
    );

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = "notes-backup.json";

    link.click();

    URL.revokeObjectURL(url);
});


/* =========================
   IMPORT JSON
========================= */

importInput.addEventListener("change", event => {

    const file = event.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = event => {

        try {

            const importedNotes =
                JSON.parse(event.target.result);

            if (!Array.isArray(importedNotes)) {
                throw new Error("Invalid format");
            }

            const validNotes = importedNotes.filter(note =>
                note.id &&
                typeof note.text === "string" &&
                note.createdAt
            );

            saveNotes(validNotes);

            renderNotes();

            alert("Notes imported successfully.");

        } catch (error) {

            alert("Invalid JSON file.");

            console.error(error);
        }
    };

    reader.readAsText(file);

    importInput.value = "";
});


/* =========================
   EVENT LISTENERS
========================= */

addBtn.addEventListener("click", addNote);

noteInput.addEventListener("keydown", event => {

    if (event.key === "Enter") {
        addNote();
    }
});

searchInput.addEventListener(
    "input",
    renderNotes
);

filterInput.addEventListener(
    "change",
    renderNotes
);


/* =========================
   INITIALIZE
========================= */

loadTheme();
renderNotes();