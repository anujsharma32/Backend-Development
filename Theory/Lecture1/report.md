# Theory Experiment 03: Progressive Express.js Server Architecture and EJS Templating

## 1. Aim
To study and implement a progressive, step-by-step backend architecture in Node.js and Express.js through five staged tasks covering basic server instantiation, multi-route handling, JSON REST API construction, dynamic programmatic HTML generation, and view rendering with the EJS template engine.

## 2. Objectives
- To initialize an Express.js application and bind it to a TCP network port (Task 1).
- To define multiple route endpoints returning plain text responses (Task 2).
- To construct a RESTful JSON API using route path parameters (`req.params.id`) and HTTP error statuses (Task 3).
- To dynamically synthesize HTML document fragments on the server and return them to the client (Task 4).
- To integrate the Embedded JavaScript (EJS) template engine for clean Model-View-Controller separation (Task 5).

## 3. Requirements
- **Runtime Environment**: Node.js (v16.x or higher)
- **Framework**: Express.js (`^4.18.2`)
- **Templating Engine**: EJS (`^3.1.9`)
- **Tools**: Visual Studio Code, Web Browser, Terminal / CLI

## 4. Theory
Express.js provides an abstraction over Node's low-level `http` module, streamlining request dispatching and response generation:

1. **Evolution of Web Response Types**:
   - *Plain Text / Strings*: Simple debugging outputs transmitted with `text/plain` or `text/html`.
   - *JSON (JavaScript Object Notation)*: Lightweight data-interchange format ideal for headless APIs and decoupled single-page applications. `res.json()` automatically serializes objects and sets `Content-Type: application/json`.
   - *String Concatenated HTML*: Generating HTML tags within route strings. While functional for small tasks, it tightly couples presentation with business logic and becomes unmaintainable.
   - *Template Engines (EJS)*: Decouples HTML markup (views) from application routing logic (controllers). Templates compile dynamic data into final HTML on the server before transmitting it to the client.
2. **Route Parameters**:
   Parameters defined as `:id` capture dynamic values from the request URI path, enabling specific resource lookups (e.g., `/students/2`).
3. **HTTP Status Codes**:
   When resources cannot be resolved, servers communicate the failure using appropriate HTTP response codes (such as `404 Not Found`).

## 5. Implementation
The experiment is organized in `Theory/Lecture1/express-demo/` into five progressive stages:

### Task 1 — Basic Express Server ([task1/server.js](file:///Users/anujsharma/Desktop/Backend/Backend-Development/Theory/Lecture1/express-demo/task1/server.js))
Sets up the fundamental Express server listening on port 3000:
```javascript
const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.send("Backend Server Running");
});

app.listen(3000, () => {
    console.log("Server started at http://localhost:3000");
});
```

### Task 2 — Multiple Routes ([task2/server.js](file:///Users/anujsharma/Desktop/Backend/Backend-Development/Theory/Lecture1/express-demo/task2/server.js))
Demonstrates route branching:
- `GET /`: Returns `"Welcome to the Student Management API"`
- `GET /students`: Returns `"List of all students"`
- `GET /students/1`: Returns `"Student: Aarav, Roll No: 1"`

### Task 3 — JSON API & Dynamic Route Parameters ([task3/server.js](file:///Users/anujsharma/Desktop/Backend/Backend-Development/Theory/Lecture1/express-demo/task3/server.js))
Implements an in-memory database and JSON serialization with parameter extraction:
```javascript
const students = [
    { id: 1, name: "Aarav", branch: "CSE" },
    { id: 2, name: "Diya", branch: "ECE" },
    { id: 3, name: "Rohan", branch: "IT" }
];

app.get("/students", (req, res) => res.json(students));

app.get("/students/:id", (req, res) => {
    const student = students.find(s => s.id === parseInt(req.params.id));
    if (student) {
        res.json(student);
    } else {
        res.status(404).json({ error: "Student not found" });
    }
});
```

### Task 4 — Server-Side Dynamic HTML Generation ([task4/server.js](file:///Users/anujsharma/Desktop/Backend/Backend-Development/Theory/Lecture1/express-demo/task4/server.js))
Constructs dynamic HTML strings directly within route handlers:
- Loops over `students` and dynamically concatenates `<li>` tags into an HTML response.

### Task 5 — View Engine Integration with EJS ([task5/server.js](file:///Users/anujsharma/Desktop/Backend/Backend-Development/Theory/Lecture1/express-demo/task5/server.js))
Configures the EJS view engine:
```javascript
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("home");
});

app.get("/students", (req, res) => {
    res.render("students", { students: students });
});
```
- **[views/home.ejs](file:///Users/anujsharma/Desktop/Backend/Backend-Development/Theory/Lecture1/express-demo/views/home.ejs)**: Welcome landing page with links to student listings.
- **[views/students.ejs](file:///Users/anujsharma/Desktop/Backend/Backend-Development/Theory/Lecture1/express-demo/views/students.ejs)**: Formatted HTML table rendering student records using `<% students.forEach(...) %>`.

## 6. Procedure
1. Navigate to the project directory:
   ```bash
   cd Theory/Lecture1/express-demo
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. To test any specific task, execute its server script from the demo root:
   - **Task 1**: `node task1/server.js`
   - **Task 2**: `node task2/server.js`
   - **Task 3**: `node task3/server.js`
   - **Task 4**: `node task4/server.js`
   - **Task 5**: `node task5/server.js`
4. Open `http://localhost:3000` in your browser for each task to evaluate the progressive enhancement from plain text to JSON, raw HTML, and templated EJS views.

## 7. Output and Results
- **Task 1 (`/`)**: Displays `"Backend Server Running"` in browser window.
- **Task 2 (`/students`)**: Displays `"List of all students"`.
- **Task 3 (`/students`)**:
  ```json
  [
    { "id": 1, "name": "Aarav", "branch": "CSE" },
    { "id": 2, "name": "Diya", "branch": "ECE" },
    { "id": 3, "name": "Rohan", "branch": "IT" }
  ]
  ```
- **Task 3 (`/students/99`)**: Returns HTTP 404 with `{ "error": "Student not found" }`.
- **Task 4 (`/students`)**: Displays an unstyled HTML unordered list containing student names and branches.
- **Task 5 (`/students`)**: Renders a complete HTML page with a styled table listing all student records dynamically compiled via EJS.

## 8. Learning Outcomes
- Traced the architectural progression from basic text responses to structured JSON APIs and server-rendered HTML.
- Learned how to parse and sanitize dynamic URL route parameters.
- Understood proper HTTP error handling and status code conventions.
- Implemented clean separation of presentation and application logic using EJS templates.

## 9. Conclusion
Theory Experiment 03 provides a comprehensive roadmap of server-side web development with Node.js and Express. It demonstrates that as web applications grow in complexity, adopting templating engines like EJS ensures scalable, clean, and maintainable software architecture.

## 10. Viva Questions
**Q1: Why is `parseInt()` necessary when reading `req.params.id` in `task3`?**  
**Ans:** Route parameters extracted from URL paths are always received as JavaScript strings. To compare them with integer identifiers (e.g., `s.id === 1`), the string must be explicitly parsed to an integer.

**Q2: What is the primary disadvantage of concatenating HTML strings directly in route handlers as in `task4`?**  
**Ans:** It violates separation of concerns, makes code difficult to read and maintain, lacks syntax highlighting/linting for HTML, and increases vulnerability to injection attacks.

**Q3: How does `res.json()` differ from `res.send()`?**  
**Ans:** While `res.send()` can accept strings, buffers, or objects, `res.json()` explicitly formats the response as JSON, sets `Content-Type: application/json`, and properly serializes null, undefined, and non-primitive objects.

**Q4: Where does Express look for EJS view templates by default?**  
**Ans:** Express looks in the `./views` directory located in the application's root working directory, unless overridden using `app.set("views", path)`.
