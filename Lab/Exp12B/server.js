
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

// Display the to-do list
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

  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>To-Do List Manager</title>
    </head>
    <body>
      <h1>To-Do List Manager</h1>

      <form action="/add" method="POST">
        <input
          type="text"
          name="todoItem"
          placeholder="Enter a task"
          required
        >
        <button type="submit">Add Task</button>
      </form>

      <h2>My Tasks</h2>
      <ul>${tasks || "<li>No tasks added yet.</li>"}</ul>
    </body>
    </html>
  `);
});

// Add a task
app.post("/add", (req, res) => {
  if (!req.session.todos) {
    req.session.todos = [];
  }

  const item = (req.body.todoItem || "").trim();

  if (item) {
    req.session.todos.push(item);
  }

  res.redirect("/");
});

// Delete a task
app.post("/delete/:id", (req, res) => {
  const id = Number(req.params.id);

  if (req.session.todos && id >= 0 && id < req.session.todos.length) {
    req.session.todos = req.session.todos.filter(
      (item, index) => index !== id
    );
  }

  res.redirect("/");
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
