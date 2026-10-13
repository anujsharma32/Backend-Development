
const heading = document.getElementById("heading");
const message = document.getElementById("message");
const button = document.getElementById("changeBtn");

const student = {
    name: "Anuj",
    course: "B.Tech CSE"
};

// Arrow function and template literal
const greet = (name) => `Hello, ${name}!`;

console.log(greet(student.name));
console.log(`Course: ${student.course}`);

// DOM manipulation and event handling
button.addEventListener("click", () => {
    heading.textContent = "DOM Manipulation Working!";
    message.textContent = `Welcome, ${student.name}.`;
    message.style.color = "blue";
});
