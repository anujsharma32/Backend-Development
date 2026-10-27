# Experiment 07: ES6 Features and DOM Manipulation

## 1. Aim
To understand modern JavaScript (ES6+) features and demonstrate how to select, manipulate, and style HTML Document Object Model (DOM) elements dynamically in response to user events.

## 2. Objectives
- To understand ES6 features and learn how to select and modify HTML elements using JavaScript DOM methods.
- To practice variable declaration with block scoping using `const` and `let`.
- To implement ES6 arrow functions (`=>`) and template literals (`` `Hello, ${name}!` ``).
- To utilize DOM selection methods such as `document.getElementById()`.
- To attach asynchronous click event listeners (`addEventListener`) and dynamically update text content and inline styles.

## 3. Requirements
- **Software / Tools**: Visual Studio Code, Google Chrome (or any modern web browser)
- **Languages / Technologies**: HTML5, CSS3, JavaScript (ECMAScript 2015 / ES6)
- **Dependencies**: None (native browser APIs)

## 4. Theory
ES6 (ECMAScript 2015) introduced key modern language features such as `let`, `const`, arrow functions, template literals, and enhanced object syntax:
- **`const` and `let`**: Provide block-level scoping, preventing common hoisting pitfalls associated with legacy `var`.
- **Arrow Functions**: Provide a concise syntax for function expressions and lexically bind the `this` value.
- **Template Literals**: Enable embedded expressions and multi-line strings using backticks.

The **Document Object Model (DOM)** represents an HTML document as a hierarchical tree of objects. Each HTML tag, attribute, and text node is represented as an object in memory:
- JavaScript accesses these nodes via methods such as `document.getElementById()`.
- Content can be dynamically modified through properties like `textContent` or `innerHTML`.
- Presentation can be altered programmatically through the element's `style` object (e.g., `element.style.color = "blue"`).
- User interactivity is established using event-driven programming with `addEventListener()`.

## 5. Implementation
The experiment consists of:
- **[index.html](file:///Users/anujsharma/Desktop/Backend/Backend-Development/Lab/Exp07/index.html)**:
  Defines an interactive container with heading `<h1 id="heading">`, message paragraph `<p id="message">`, and action button `<button id="changeBtn">`.
- **[app.js](file:///Users/anujsharma/Desktop/Backend/Backend-Development/Lab/Exp07/app.js)**:
  Implements the ES6 features and DOM manipulation:
  ```javascript
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
  ```

## 6. Procedure
1. Navigate to the experiment directory:
   ```bash
   cd Lab/Exp07
   ```
2. Open [index.html](file:///Users/anujsharma/Desktop/Backend/Backend-Development/Lab/Exp07/index.html) in a web browser:
   - On macOS: `open index.html`
   - On Windows: `start index.html`
   - On Linux: `xdg-open index.html`
3. Open the browser Developer Tools console (`Cmd+Option+I` on macOS or `F12` on Windows/Linux) to observe console logs generated on initial load.
4. Click the **Change Content** button to trigger the event listener.
5. Verify that the heading text, paragraph message, and text color change instantly.

## 7. Output and Results
Based on testing and repository screenshot records:
- **Initial State (`Screenshots/initial_webpage.png`)**:
  - Heading: "Experiment 07: ES6 and DOM"
  - Paragraph: "This is the original message."
  - Button: "Change Content"
- **Console Log Output (`Screenshots/ES6_console.png`)**:
  - `Hello, Anuj!`
  - `Course: B.Tech CSE`
- **Post-Click State (`Screenshots/DOM_manipluation.png`)**:
  - Heading updates to: "DOM Manipulation Working!"
  - Paragraph updates to: "Welcome, Anuj." with text color modified to blue (`#0000FF`).
- **Result Summary**:
  ES6 features and DOM manipulation were implemented and tested successfully.
- **Live Output**: Accessible via GitHub Pages at `https://anujsharma32.github.io/Backend-Development/Lab/Exp07/`.

## 8. Learning Outcomes
- Understood and applied modern ES6 syntax (arrow functions, template literals, block-scoped declarations).
- Mastered DOM element retrieval via element identifiers.
- Implemented user-driven asynchronous DOM updates using event listeners.
- Learned how to manipulate inline CSS properties programmatically.

## 9. Conclusion
Experiment 07 demonstrates the practical integration of modern ES6 JavaScript syntax with browser DOM APIs, showing how client-side scripting enables interactive, state-responsive web interfaces without third-party frameworks.

## 10. Viva Questions
**Q1: What is the primary difference between `textContent` and `innerHTML`?**  
**Ans:** `textContent` sets or returns the plain text content of a node and its descendants without parsing HTML tags (preventing XSS attacks), whereas `innerHTML` parses strings as HTML elements and renders markup.

**Q2: What are the key advantages of ES6 arrow functions over traditional functions?**  
**Ans:** Arrow functions provide a cleaner, more concise syntax and inherit the `this` context from their enclosing lexical scope rather than creating their own execution context.

**Q3: How does `document.getElementById()` locate elements in the DOM tree?**  
**Ans:** It queries the document using a unique ID attribute, performing an optimized lookup that directly returns the single DOM element matching the specified identifier, or `null` if not found.

**Q4: What is the purpose of `addEventListener()` over inline HTML event handlers (e.g., `onclick="..."`)?**  
**Ans:** `addEventListener()` cleanly separates JavaScript logic from HTML markup, supports multiple listeners on the same element and event, and allows finer control over event propagation phases (capturing vs bubbling).
