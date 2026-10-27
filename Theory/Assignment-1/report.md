# Theory Practical Assignment 01: Client-Side Interactive Notes Application with LocalStorage

## 1. Aim
To design, implement, and document a feature-rich, responsive client-side Notes Application using semantic HTML5, modern CSS3 variables for theme toggling, and vanilla JavaScript (ES6+) utilizing the Web Storage API (`localStorage`), JSON serialization, and Blob file handling for data import/export.

## 2. Objectives
- To design a clean, responsive user interface using semantic HTML5 and CSS3 (Flexbox, CSS custom properties / variables).
- To implement client-side data persistence using the Web Storage API (`localStorage`) with JSON parsing and error handling.
- To execute full client-side CRUD (Create, Read, Update, Delete) operations on note items.
- To categorize notes (e.g., General, College, Work, Personal, Important) and implement multi-criteria filtering (by status and category).
- To build a real-time search engine filtering notes dynamically as the user types.
- To implement data portability features: exporting notes as a JSON file and importing external JSON backup files via `FileReader`.
- To implement persistent theme toggling (Light / Dark mode) saved to browser storage.

## 3. Requirements
- **Markup / Styling**: HTML5, CSS3 (Modern Flexbox, CSS Grid, Custom Properties)
- **Programming Language**: Vanilla JavaScript (ECMAScript 2015 / ES6+)
- **APIs**: Web Storage API (`localStorage`), File and Blob API, `FileReader`
- **Editor**: Visual Studio Code
- **Runtime**: Any modern web browser (Google Chrome, Firefox, Safari, Edge)

## 4. Theory
Client-side web applications frequently require data persistence and dynamic filtering without requiring immediate network latency or database overhead:

1. **Web Storage API (`localStorage`)**:
   - `localStorage` provides persistent key-value storage in the user's browser across sessions and page reloads.
   - Storage is limited to ~5MB per origin and only accepts string data. Complex JavaScript objects or arrays must be serialized to strings using `JSON.stringify()` prior to storage and deserialized using `JSON.parse()` upon retrieval.
2. **State Management & Dynamic Rendering**:
   - The application maintains application state in memory. Whenever the state changes (adding, editing, toggling, or deleting a note), the state is persisted to `localStorage` and a central render function (`renderNotes()`) synchronizes the DOM.
3. **File Export and Import via Blob & FileReader**:
   - *Exporting*: In-memory data is converted to a JSON string, wrapped into a `Blob` (Binary Large Object) with MIME type `application/json`, and downloaded by creating a programmatic anchor element (`<a download="...">`).
   - *Importing*: The `FileReader` API asynchronously reads uploaded `.json` files, parses their contents, validates their structure, and merges or overwrites the application state.
4. **Theming with CSS Variables**:
   Defining colors as CSS Custom Properties (e.g., `--bg`, `--card`, `--text`) on `:root` and toggling a `.dark` class on the `<body>` enables instant theme switching with smooth CSS transitions.

## 5. Implementation
The application resides in `Theory/Assignment-1/`:
- **[index.html](file:///Users/anujsharma/Desktop/Backend/Backend-Development/Theory/Assignment-1/index.html)**:
  Defines semantic containers for header (with theme toggle), note creation bar (input field, category select, add button), tools bar (search input, status filter dropdown, export and import buttons), note counter badge, and the main notes grid container.
- **[style.css](file:///Users/anujsharma/Desktop/Backend/Backend-Development/Theory/Assignment-1/style.css)**:
  Implements responsive design tokens using CSS variables, button hover animations, card shadows, completed-task strike-throughs, and dark mode palette definitions.
- **[script.js](file:///Users/anujsharma/Desktop/Backend/Backend-Development/Theory/Assignment-1/script.js)**:
  Encapsulates complete application logic:
  - **Storage Helpers**: `getNotes()` and `saveNotes()` with `try/catch` JSON validation.
  - **CRUD Operations**:
    - `addNote()`: Validates input, builds note entity `{ id: Date.now(), text, completed: false, category, createdAt }`, persists, and re-renders.
    - `deleteNote(id)`: Filters out note by unique timestamp ID.
    - `editNote(id)`: Prompts user for updated text, updates timestamp, and saves.
    - `toggleComplete(id)`: Inverts boolean completion flag.
  - **Filtering & Search**:
    - `renderNotes()`: Applies both text search queries (`text.toLowerCase().includes(...)`) and completion filter states (`all`, `active`, `completed`).
  - **Import & Export**:
    - `exportBtn`: Generates a downloadable `notes.json` via `URL.createObjectURL(new Blob(...))`.
    - `importInput`: Uses `FileReader.readAsText()` to parse and load external notes into storage.
  - **Theme Toggle**:
    - Reads saved preference from `localStorage.getItem("theme")` and applies `.dark` class to `document.body`.

## 6. Procedure
1. Navigate to the assignment folder:
   ```bash
   cd Theory/Assignment-1
   ```
2. Open [index.html](file:///Users/anujsharma/Desktop/Backend/Backend-Development/Theory/Assignment-1/index.html) in your browser:
   - On macOS: `open index.html`
   - On Windows: `start index.html`
   - On Linux: `xdg-open index.html`
3. **Creating Notes**:
   - Type note text, choose a category from the dropdown (e.g., "College" or "Work"), and click **Add Note**.
4. **Managing Notes**:
   - Click the checkmark/task body to toggle completed status.
   - Click the Edit button to update note contents.
   - Click Delete to remove the note.
5. **Testing Persistence**:
   - Refresh the browser (`F5` or `Cmd+R`) and confirm that all notes remain present.
6. **Export & Import**:
   - Click **Export** to download `notes.json`.
   - Clear notes or switch to a new browser session, click **Import**, select `notes.json`, and verify all notes are restored.
7. **Theme Toggle**:
   - Click the moon/sun button (`#themeBtn`) to toggle between light and dark themes.

## 7. Output and Results
- **Initial View**: Displays header "Notes - Your notes, saved locally", theme button, input bar, filter tools, and empty state: *"No notes yet. Add your first note above."*
- **Note Addition**: Dynamically mounts card showing text, category badge (with category-specific accent color), timestamp, and action buttons (Edit, Delete).
- **Search & Filtering**: Typing in the search bar instantly filters visible cards in real time without page reload.
- **Data Persistence**: Data verified in browser DevTools under **Application > Storage > Local Storage > notes**.
- **JSON File Export**: Successfully downloads formatted JSON payload containing all note objects.
- **Theme Toggling**: Body background and text smoothly transition between dark and light themes, remembering the chosen theme across page refreshes.

## 8. Learning Outcomes
- Developed comprehensive understanding of client-side web application architecture.
- Mastered browser storage mechanisms using the HTML5 `localStorage` API.
- Implemented real-time dynamic search and multi-criteria array filtering.
- Handled browser file input/output streams using `Blob`, `URL.createObjectURL`, and `FileReader`.
- Implemented accessible, persistent dark mode theming using modern CSS variables.

## 9. Conclusion
Theory Practical Assignment 01 demonstrates the full capabilities of modern Vanilla JavaScript in creating high-performance, responsive, and persistent single-page web applications without relying on external frontend frameworks.

## 10. Viva Questions
**Q1: What is the storage limit of `localStorage` and how does it compare to cookies?**  
**Ans:** `localStorage` provides approximately 5MB of storage per origin and stores data exclusively on the client without sending it in HTTP headers. In contrast, cookies are limited to 4KB and are automatically transmitted to the server with every HTTP request.

**Q2: What happens if `JSON.parse()` receives an invalid or corrupted string from `localStorage`?**  
**Ans:** `JSON.parse()` throws a `SyntaxError` exception that can crash the script. It is standard best practice to wrap `JSON.parse()` in a `try...catch` block to handle corrupted data gracefully.

**Q3: How does the `Blob` object facilitate client-side file downloads?**  
**Ans:** A `Blob` represents raw immutable data. When combined with `URL.createObjectURL(blob)`, the browser creates a temporary unique DOMString URL pointing to the data in memory, which can be linked to a download anchor.

**Q4: How do CSS Custom Properties (variables) enable seamless theme toggling?**  
**Ans:** By defining color properties as variables (e.g., `--bg: #ffffff;`) and overriding their values under a `.dark` class (e.g., `--bg: #1a1a1a;`), simply toggling `.dark` on the `<body>` element updates the entire page's styling without changing individual element rules.
