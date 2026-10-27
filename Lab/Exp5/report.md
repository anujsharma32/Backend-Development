# Experiment 05: JavaScript Fundamentals — Arrays, Objects, Functions, and Library Management

## 1. Aim
To understand and implement core JavaScript programming concepts including data structures (arrays and objects), function declarations, built-in string/array methods, and to develop a modular mini-application for managing a book library.

## 2. Objectives
- To learn fundamental array manipulation techniques (instantiation, insertion using `push()`, index-based access, and modification).
- To define and manipulate JavaScript object literals, accessing and modifying properties dynamically.
- To implement function declarations and understand argument passing and template literal return values.
- To practice built-in string manipulation methods (`toUpperCase()`, `toLowerCase()`, `split()`).
- To develop a practical Project-Based Learning (PBL) activity: a console-based Library Management System using array higher-order search methods (`Array.prototype.find`).

## 3. Requirements
- **Language**: JavaScript (ECMAScript 2015 / ES6)
- **Editor / IDE**: Visual Studio Code
- **Runtime Environment**: Modern Web Browser (Google Chrome DevTools Console) or Node.js runtime
- **Markup**: HTML5 for console script mounting

## 4. Theory
JavaScript is a high-level, dynamic, interpreted language that serves as the foundation for both client-side and server-side web development.

1. **Arrays**:
   An array is an ordered, zero-indexed list of values. In JavaScript, arrays are dynamically sized and can hold heterogeneous data types. Common operations include:
   - `push(element)`: Appends an element to the end of the array.
   - Index lookup (`arr[i]`) and mutation (`arr[i] = newValue`).
   - Higher-order methods such as `find(predicate)`, which returns the first element satisfying the predicate condition.

2. **Objects**:
   Objects are collections of key-value pairs where keys are strings (or Symbols) and values can be any type. Objects allow modeling real-world entities. Properties can be accessed and mutated using dot notation (`obj.prop`) or bracket notation (`obj['prop']`).

3. **Functions**:
   Functions are first-class citizens in JavaScript; they can be assigned to variables, passed as arguments, and returned from other functions. Functions encapsulate reusable logic and facilitate modular program design.

4. **String Methods**:
   Strings are immutable sequences of characters. Methods like `toUpperCase()` and `toLowerCase()` return new transformed strings, while `split(delimiter)` divides a string into an ordered list of substrings and returns them in an array.

## 5. Implementation
The experiment is organized across four key files:

- **[index.html](file:///Users/anujsharma/Desktop/Backend/Backend-Development/Lab/Exp5/index.html)**:
  Basic HTML host structure loading the JavaScript scripts into the browser document context.
- **[script.js](file:///Users/anujsharma/Desktop/Backend/Backend-Development/Lab/Exp5/script.js)**:
  Demonstrates basic array creation, object definition, and function declaration:
  ```javascript
  // Arrays
  const fruits = ['Apple', 'Banana', 'Mango'];
  fruits.push('Orange');

  // Objects
  const student = {
      name: 'John Doe',
      age: 20,
      course: 'Backend Development'
  };

  // Functions
  function greet(name) {
      return `Hello, ${name}! Welcome to Backend Development Lab.`;
  }
  ```
- **[script2.js](file:///Users/anujsharma/Desktop/Backend/Backend-Development/Lab/Exp5/script2.js)**:
  Implements string transformations, array mutations, and dynamic object property addition and modification:
  ```javascript
  // String operations
  const str = "Backend Development";
  console.log("Upper Case:", str.toUpperCase());
  console.log("Lower Case:", str.toLowerCase());
  console.log("Split by space:", str.split(" "));

  // Object property mutation
  let user = { name: "John", role: "Dev" };
  user.age = 25;
  user.role = "Senior Dev";
  ```
- **[library.js](file:///Users/anujsharma/Desktop/Backend/Backend-Development/Lab/Exp5/library.js)**:
  Implements the Library Management System:
  - `addBook(title, author)`: Instantiates a book object `{ title, author }` and appends it to the global `library` array.
  - `findBook(title)`: Uses `library.find()` to locate a book by title, outputting the book details if found or a descriptive not-found message otherwise.

## 6. Procedure
1. Open the project directory in a terminal:
   ```bash
   cd Lab/Exp5
   ```
2. **Method 1 — In-Browser Execution**:
   - Open [index.html](file:///Users/anujsharma/Desktop/Backend/Backend-Development/Lab/Exp5/index.html) in Google Chrome or any modern browser.
   - Open Developer Tools (`F12` or `Cmd+Option+I` on macOS / `Ctrl+Shift+I` on Windows/Linux).
   - Navigate to the **Console** tab to view logged outputs.
   - To execute `script2.js` or `library.js` in the browser, change the `<script src="script.js">` tag in `index.html` or load them directly in the console.
3. **Method 2 — Node.js CLI Execution**:
   - Run the script files directly via Node.js:
     ```bash
     node script.js
     node script2.js
     node library.js
     ```

## 7. Output and Results
Based on code execution and verified against repository screenshot artifacts:

- **Array Demonstration (`arrays.png`, `console.png`)**:
  - Initial array: `['Apple', 'Banana', 'Mango']`
  - Array after `push('Orange')`: `['Apple', 'Banana', 'Mango', 'Orange']`
- **Object Demonstration (`objects.png`)**:
  - Student object logged with properties `name: 'John Doe'`, `age: 20`, `course: 'Backend Development'`.
  - Student Name logged: `'John Doe'`.
- **Function Output (`functions.png`)**:
  - Function call output: `"Hello, Student! Welcome to Backend Development Lab."`
- **Methods Demonstration (`methods.png`)**:
  - String upper/lower case conversions and array split output `['Backend', 'Development']`.
  - Array and object update outputs verifying in-place mutation.
- **PBL Library Management Activity (`PBL Activity.png`)**:
  - Successfully adds *"The Alchemist"*, *"Wings of Fire"*, and *"Harry Potter"*.
  - Querying `"Wings of Fire"` returns the matching book object `{ title: 'Wings of Fire', author: 'A.P.J. Abdul Kalam' }`.
  - Querying `"Unknown Book"` correctly logs `Book "Unknown Book" not found.`

## 8. Learning Outcomes
- Acquired solid foundation in JavaScript syntax, primitive types, and reference data types (Arrays, Objects).
- Mastered function definition syntax, parameter handling, and return statements.
- Learned built-in methods for strings and arrays.
- Implemented real-world lookup and storage logic using object collections and higher-order methods (`find`).

## 9. Conclusion
Experiment 05 demonstrates the fundamental data structures, functions, and standard object/array methods of JavaScript. The successful execution of the Library Management script validates the practical application of array searches and object modeling in web development.

## 10. Viva Questions
**Q1: What is the difference between primitive data types and reference types in JavaScript?**  
**Ans:** Primitives (Number, String, Boolean, null, undefined, Symbol, BigInt) are stored by value in the call stack. Reference types (Objects, Arrays, Functions) are stored in the memory heap and accessed via memory references.

**Q2: How does `Array.prototype.find()` work compared to `Array.prototype.filter()`?**  
**Ans:** `find()` returns the first single element that matches the callback predicate (or `undefined` if none match), whereas `filter()` returns a new array containing all elements that satisfy the condition.

**Q3: How do template literals differ from traditional string concatenation in JavaScript?**  
**Ans:** Template literals use backticks (`` ` ``) and `${expression}` syntax to allow string interpolation and multi-line strings without explicit escape characters or plus (`+`) operators.

**Q4: Can properties be added dynamically to a JavaScript object declared with `const`?**  
**Ans:** Yes. `const` prevents the variable identifier from being reassigned to a new reference, but the underlying object itself remains mutable, allowing keys to be added, modified, or removed.
