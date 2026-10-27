# Experiment 12B: Session-Based State Management and To-Do List Application with Express.js

## 1. Aim
To implement a stateful server-side web application in Node.js and Express.js using `express-session` to manage user-specific tasks in an interactive To-Do List Manager without requiring a persistent database.

## 2. Objectives
- To configure and integrate the `express-session` middleware in an Express.js application.
- To store, update, and manage session-scoped state (`req.session.todos`) across multiple HTTP request-response cycles.
- To handle form-based data submission (`POST /add`) using URL-encoded body parsing.
- To implement item deletion (`POST /delete/:id`) using route parameters and session array filtering.
- To prevent Cross-Site Scripting (XSS) by sanitizing user-generated text inputs prior to rendering.

## 3. Requirements
- **Runtime Environment**: Node.js
- **Framework**: Express.js (`^5.3.0`)
- **Session Middleware**: `express-session` (`^1.19.0`)
- **Tools**: Visual Studio Code, Web Browser, Terminal / CLI

## 4. Theory
HTTP is inherently a stateless protocol; each request from a client is processed independently without implicit memory of prior interactions. Web applications achieve statefulness through session management:

1. **Session-Based State Management**:
   When a user connects, the server creates a unique session record stored in server-side memory (or an external store like Redis/database) and assigns a unique, cryptographically signed Session ID.
2. **Session Cookie**:
   The Session ID is returned to the client in a `Set-Cookie` header and stored in the browser. In subsequent requests, the browser sends this cookie automatically, allowing the server to look up the session store and populate `req.session`.
3. **Session Configuration Options**:
   - `secret`: A secret string used to sign the session ID cookie to prevent tampering.
   - `resave: false`: Prevents saving the session back to the store if it was not modified during the request.
   - `saveUninitialized: false`: Reduces server storage usage by avoiding saving uninitialized (empty) sessions until data is explicitly stored.
4. **Input Sanitization**:
   When dynamically injecting user text into HTML strings, special characters (`<`, `>`, `&`) must be converted to HTML entities (`&lt;`, `&gt;`, `&amp;`) to safeguard against Cross-Site Scripting (XSS) vulnerabilities.

## 5. Implementation
The experiment is implemented in:
- **[package.json](file:///Users/anujsharma/Desktop/Backend/Backend-Development/Lab/Exp12B/package.json)**: Declares project metadata and dependencies (`express` and `express-session`).
- **[server.js](file:///Users/anujsharma/Desktop/Backend/Backend-Development/Lab/Exp12B/server.js)**:
  Contains the application logic and routes:

  1. **Session Setup**:
     ```javascript
     const express = require("express");
     const session = require("express-session");

     const app = express();
     const PORT = 3000;

     app.use(express.urlencoded({ extended: true }));
     app.use(
       session({
         secret: "my-secret-key",
         resave: false,
         saveUninitialized: false
       })
     );
     ```

  2. **View and List Route (`GET /`)**:
     Retrieves `req.session.todos`, sanitizes strings against XSS, and renders an HTML document containing the input form and dynamic list of tasks with individual deletion buttons:
     ```javascript
     app.get("/", (req, res) => {
       if (!req.session.todos) {
         req.session.todos = [];
       }

       const tasks = req.session.todos
         .map((item, index) => `
           <li>
             ${item.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")}
             <form action="/delete/${index}" method="POST">
               <button type="submit">Delete</button>
             </form>
           </li>
         `)
         .join("");

       res.send(`...`);
     });
     ```

  3. **Task Addition Route (`POST /add`)**:
     Extracts `req.body.todoItem`, appends the non-empty trimmed item to `req.session.todos`, and issues an HTTP redirect (`res.redirect("/")`) implementing the Post/Redirect/Get (PRG) pattern:
     ```javascript
     app.post("/add", (req, res) => {
       if (!req.session.todos) req.session.todos = [];
       const item = (req.body.todoItem || "").trim();
       if (item) req.session.todos.push(item);
       res.redirect("/");
     });
     ```

  4. **Task Deletion Route (`POST /delete/:id`)**:
     Extracts the target task index from `req.params.id`, validates boundaries, filters the array, and redirects back to `/`:
     ```javascript
     app.post("/delete/:id", (req, res) => {
       const id = Number(req.params.id);
       if (req.session.todos && id >= 0 && id < req.session.todos.length) {
         req.session.todos = req.session.todos.filter((item, index) => index !== id);
       }
       res.redirect("/");
     });
     ```
- **[public/style.css](file:///Users/anujsharma/Desktop/Backend/Backend-Development/Lab/Exp12B/public/style.css)**:
  Reserved stylesheet file for future external UI customization.

## 6. Procedure
1. Navigate to the experiment directory:
   ```bash
   cd Lab/Exp12B
   ```
2. Install project dependencies:
   ```bash
   npm install
   ```
3. Start the application server:
   ```bash
   npm start
   # or: node server.js
   ```
4. Open a web browser and navigate to:
   ```
   http://localhost:3000/
   ```
5. **Adding Tasks**:
   - Type a task into the "Enter a task" input field and click **Add Task**.
   - Verify that the page reloads and displays the task under "My Tasks".
6. **Testing Session Isolation**:
   - Open a private/incognito browsing window and visit `http://localhost:3000/`.
   - Verify that tasks added in the first window do not appear in the incognito window (confirming session isolation).
7. **Deleting Tasks**:
   - Click the **Delete** button next to a task and verify that the task is removed from the session list.

## 7. Output and Results
- **Initial Load**:
  Renders title *"To-Do List Manager"*, input form, and the empty message: *"No tasks added yet."*
- **After Adding Items**:
  Lists all added items as HTML list elements with associated Delete form buttons.
- **Session Persistence**:
  Tasks remain present across page refreshes for the active browser session.
- **Post-Deletion**:
  Target item is removed and remaining items re-render correctly.

## 8. Learning Outcomes
- Understood state management techniques in stateless HTTP environments.
- Implemented `express-session` for storing user-specific data server-side.
- Practiced the Post/Redirect/Get (PRG) pattern to prevent duplicate form submissions upon page refresh.
- Gained awareness of security practices such as HTML character escaping to mitigate XSS attacks.

## 9. Conclusion
Experiment 12B successfully demonstrates session-based state management using Node.js and Express. It confirms that `express-session` provides an effective mechanism for managing client-specific application state across HTTP transactions without requiring database persistence.

## 10. Viva Questions
**Q1: How does a server associate an incoming request with an existing session?**  
**Ans:** The server generates a unique session ID, stores it in an HTTP cookie in the user's browser, and uses that cookie on subsequent requests to retrieve the corresponding session data from the server's session store.

**Q2: What is the purpose of the Post/Redirect/Get (PRG) pattern used in `/add`?**  
**Ans:** The PRG pattern redirects the browser to a `GET` route after a successful `POST` request. This prevents duplicate form submissions if the user refreshes the page.

**Q3: Why is `saveUninitialized: false` recommended in session configuration?**  
**Ans:** It avoids saving uninitialized (empty/new) sessions to the session store until data is actively written, reducing storage overhead and complying with privacy regulations.

**Q4: Where does `express-session` store session data by default, and why is it not suitable for production?**  
**Ans:** By default, it uses `MemoryStore` (in-memory RAM), which causes memory leaks in high-traffic applications, does not scale across multiple server processes/instances, and loses all session data when the server restarts.
