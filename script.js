// Initialize notes array from local storage
let notes = JSON.parse(localStorage.getItem('notes')) || [];

// Render notes
function renderNotes(filteredNotes = notes) {
    const noteListItems = document.getElementById('note-list-items');
    noteListItems.innerHTML = '';
    filteredNotes.forEach((note, index) => {
        const noteItem = document.createElement('li');
        noteItem.innerHTML = `
            <h3>${note.title}</h3>
            <p>${note.content}</p>
            <p>Tags: ${note.tags ? note.tags.join(', ') : ''}</p>
            <button onclick="deleteNote(${index})">Delete</button>
        `;
        noteListItems.appendChild(noteItem);
    });
}

// Save note
document.getElementById('save-note-btn').addEventListener('click', () => {
    const title = document.getElementById('note-title').value;
    const content = document.getElementById('note-content').value;
    const tags = document.getElementById('note-tags').value.split(',').filter(tag => tag.trim() !== '');
    notes.push({ title, content, tags });
    localStorage.setItem('notes', JSON.stringify(notes));
    renderNotes();
    document.getElementById('note-title').value = '';
    document.getElementById('note-content').value = '';
    document.getElementById('note-tags').value = '';
});

// Delete note
function deleteNote(index) {
    notes.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notes));
    renderNotes();
}

// Search notes
document.getElementById('search-input').addEventListener('input', () => {
    const searchQuery = document.getElementById('search-input').value.toLowerCase();
    const filteredNotes = notes.filter((note) => {
        return (
            note.title.toLowerCase().includes(searchQuery) ||
            note.content.toLowerCase().includes(searchQuery) ||
            (note.tags && note.tags.some((tag) => tag.toLowerCase().includes(searchQuery)))
        );
    });
    renderNotes(filteredNotes);
});

// Initialize app
renderNotes();


// Render notes
function renderNotes(filteredNotes = notes) {
  const noteListItems = document.getElementById('note-list-items');
  noteListItems.innerHTML = '';
  filteredNotes.forEach((note, index) => {
    const noteItem = document.createElement('li');
    const title = note.title.substring(0, 20) + (note.title.length > 20 ? '...' : '');
    const content = note.content.substring(0, 50) + (note.content.length > 50 ? '...' : '');
    noteItem.innerHTML = `
      <h3>${title}</h3>
      <p>${content}</p>
      <p>Tags: ${note.tags ? note.tags.join(', ') : ''}</p>
      <button onclick="deleteNote(${index})">Delete</button>
    `;
    noteListItems.appendChild(noteItem);
  });
}
