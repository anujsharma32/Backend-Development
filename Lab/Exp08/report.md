# Experiment 08: Event Handling and Interactive To-Do List

## 1. Aim
To understand client-side JavaScript event handling mechanisms and implement an interactive, state-driven To-Do List web application utilizing event listeners, event delegation, and dynamic DOM manipulation.

## 2. Objectives
- To understand JavaScript event handling and implement an interactive To-Do List application.
- To handle multiple event types including mouse click events (`click`) and keyboard input events (`keydown` for the `Enter` key).
- To implement event delegation on dynamic list elements using `event.target` and `closest()`.
- To manage application state in memory using an ES6 class (`Task`) and immutable array operations (`spread`, `filter`, `map`).
- To dynamically create, mount, style, and remove DOM nodes (`document.createElement`, `classList`, `appendChild`).

## 3. Requirements
- **Software / Tools**: Visual Studio Code, Google Chrome (or any modern web browser)
- **Languages**: HTML5, CSS3, JavaScript (ECMAScript 2015 / ES6)
- **External Dependencies**: None (pure client-side implementation)

## 4. Theory
Events are browser actions or occurrences that happen in the system being programmed (such as user clicks, keystrokes, or page loading). JavaScript uses event listeners to respond to these actions:

- **Event Listeners**: Attached to DOM elements via `addEventListener(type, callback)`. They listen for specific events and execute handler functions asynchronously.
- **Event Delegation**: Instead of binding individual event listeners to every list item (which wastes memory and fails on newly created items), a single event listener is attached to the parent container (`<ul>`). When a child element is clicked, the event bubbles up to the parent where `event.target` or `event.target.closest()` identifies the specific item acted upon.
- **Dynamic DOM Rendering**: The application maintains a single source of truth in a `tasks` array. Whenever state changes (adding, toggling, or deleting a task), a `renderTasks()` function re-renders the list by programmatically creating `<li>`, `<span>`, and `<button>` elements.
- **CSS Class Toggling**: Task completion status is visually represented by adding or removing CSS classes (`.done` with `text-decoration: line-through; color: #888;`).

## 5. Implementation
The application is structured into:
- **[index.html](file:///Users/anujsharma/Desktop/Backend/Backend-Development/Lab/Exp08/index.html)**:
  Contains the application layout with title, input text field (`#taskInput`), add button (`#addBtn`), and an empty unordered list container (`<ul id="taskList">`).
- **[app.js](file:///Users/anujsharma/Desktop/Backend/Backend-Development/Lab/Exp08/app.js)**:
  Encapsulates data models and interaction logic:

  1. **Task Model**:
     ```javascript
     class Task {
         constructor(title) {
             this.id = Date.now() + Math.random();
             this.title = title;
             this.completed = false;
         }
     }
     ```
  2. **Task Addition**:
     Handles input retrieval, validation (trimming whitespace), instantiating a new `Task`, appending to the state array, and resetting the input field:
     ```javascript
     const addTask = () => {
         const title = input.value.trim();
         if (!title) {
             input.focus();
             return;
         }
         tasks = [...tasks, new Task(title)];
         input.value = "";
         renderTasks();
         input.focus();
     };
     ```
  3. **Event Binding & Keyboard Accessibility**:
     Listens for button clicks and the `Enter` keypress on the input field:
     ```javascript
     addBtn.addEventListener("click", addTask);
     input.addEventListener("keydown", (event) => {
         if (event.key === "Enter") addTask();
     });
     ```
  4. **Event Delegation on Task List**:
     Handles both task completion toggling and task deletion from a single listener:
     ```javascript
     list.addEventListener("click", (event) => {
         const li = event.target.closest("li");
         if (!li) return;
         const id = Number(li.dataset.id);

         if (event.target.classList.contains("delete-btn")) {
             tasks = tasks.filter(task => task.id !== id);
         } else {
             tasks = tasks.map(task =>
                 task.id === id ? { ...task, completed: !task.completed } : task
             );
         }
         renderTasks();
     });
     ```

## 6. Procedure
1. Navigate to the experiment directory:
   ```bash
   cd Lab/Exp08
   ```
2. Open [index.html](file:///Users/anujsharma/Desktop/Backend/Backend-Development/Lab/Exp08/index.html) in any modern web browser.
3. **Adding a Task**:
   - Type a task description (e.g., "Complete Backend Assignment") into the input box.
   - Click the **Add Task** button or press the **Enter** key.
4. **Marking as Complete**:
   - Click directly on the task text to toggle completion (applies strikethrough styling).
5. **Deleting a Task**:
   - Click the red **Delete** button beside any task to remove it from the list.

## 7. Output and Results
Verified against the repository screenshots:
- **Initial View (`Screenshots/initial_output.png`)**: Displays input field with placeholder "Enter a task..." and the Add Task button with an empty task container.
- **Task Addition (`Screenshots/add_task.png`)**: Newly added tasks appear as formatted list items with individual delete buttons.
- **Task Completion (`Screenshots/complete_task.png`)**: Clicking an item applies `.done` class styling with strikethrough decoration.
- **Result Summary**: The interactive To-Do List was implemented and tested. Tasks can be added, marked as completed, and deleted using event listeners.
- **Live Output**: Accessible via GitHub Pages at `https://anujsharma32.github.io/Backend-Development/Lab/Exp08/`.

## 8. Learning Outcomes
- Demonstrated proficiency in event-driven JavaScript programming.
- Applied the event delegation pattern to efficiently manage events for dynamically generated elements.
- Maintained clean separation of concerns by driving UI rendering from an in-memory data state.
- Utilized modern ES6 syntax including classes, spread syntax, and array methods (`filter`, `map`, `forEach`).

## 9. Conclusion
Experiment 08 illustrates the core principles of client-side web application development: responding to user events, maintaining state, and synchronizing state changes with dynamic updates to the Document Object Model.

## 10. Viva Questions
**Q1: What is event bubbling and how does event delegation leverage it?**  
**Ans:** Event bubbling is the phase where an event triggered on a child node propagates upward through its parent ancestors in the DOM tree. Event delegation attaches a single handler to a parent container to capture events originating from current or future child elements.

**Q2: Why is `event.target.closest('li')` useful in event delegation?**  
**Ans:** `closest()` traverses the element and its ancestors upward until it finds the nearest matching selector, ensuring the correct parent list item is referenced even if the user clicks a nested child like a `<span>`.

**Q3: What is the difference between `event.preventDefault()` and `event.stopPropagation()`?**  
**Ans:** `preventDefault()` stops the browser's default action for the event (e.g., submitting a form or following a link), while `stopPropagation()` halts the bubbling of the event up the DOM tree.

**Q4: Why use immutable array operations (`filter`, `map`, spread) rather than mutating the array directly (`splice`)?**  
**Ans:** Immutable updates prevent unintended side effects, make application state predictable and easier to debug, and align with patterns widely used in modern reactive frameworks.
