
let tasks = [];

const input = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const list = document.getElementById("taskList");

class Task {
    constructor(title) {
        this.id = Date.now() + Math.random();
        this.title = title;
        this.completed = false;
    }
}

const renderTasks = () => {
    list.innerHTML = "";

    tasks.forEach(({ id, title, completed }) => {
        const li = document.createElement("li");
        li.dataset.id = id;

        const span = document.createElement("span");
        span.textContent = title;

        if (completed) {
            span.classList.add("done");
        }

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.classList.add("delete-btn");

        li.append(span, deleteBtn);
        list.appendChild(li);
    });
};

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

addBtn.addEventListener("click", addTask);

input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        addTask();
    }
});

// Event delegation: handle clicks on the task list
list.addEventListener("click", (event) => {
    const li = event.target.closest("li");

    if (!li) return;

    const id = Number(li.dataset.id);

    if (event.target.classList.contains("delete-btn")) {
        tasks = tasks.filter(task => task.id !== id);
    } else {
        tasks = tasks.map(task =>
            task.id === id
                ? { ...task, completed: !task.completed }
                : task
        );
    }

    renderTasks();
});
