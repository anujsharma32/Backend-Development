# Experiment 12A: Node.js and Express.js Server with Routing, Parameters, and EJS Templating

## 1. Aim
To construct a backend web server using Node.js and Express.js demonstrating route definition, URL path parameter extraction, query string processing, JSON and URL-encoded request body parsing, status code handling, and Server-Side Rendering (SSR) using the Embedded JavaScript (EJS) template engine.

## 2. Objectives
- To initialize a Node.js project and configure Express.js as the core application framework.
- To handle dynamic URL parameters via `req.params` (single and multi-segment path parameters).
- To extract and evaluate URL query strings using `req.query` for search pagination and mathematical operations.
- To configure built-in Express body-parsing middlewares (`express.json()` and `express.urlencoded()`) to handle incoming POST payloads.
- To simulate authentication and credential verification returning appropriate HTTP status codes (200 OK vs 401 Unauthorized).
- To integrate and render dynamic server-side views using the EJS templating engine (`views/users.ejs`, `views/profile.ejs`).

## 3. Requirements
- **Runtime**: Node.js (v16.x or higher)
- **Framework**: Express.js (`^4.18.2`)
- **Template Engine**: EJS (`^3.1.9`)
- **Tools**: Visual Studio Code, Postman or cURL for API testing, Web Browser
- **Package Manager**: npm

## 4. Theory
Express.js is a minimal, unopinionated web framework for Node.js that provides a robust suite of features for building web and mobile applications:

1. **Routing and URL Parameters**:
   - *Route Path Parameters (`req.params`)*: Named URL segments used to capture values at specific positions in the URL (e.g., `/user/:id` captures `req.params.id`).
   - *Query Parameters (`req.query`)*: Key-value pairs following the `?` character in the URL (e.g., `/search?q=nodejs&page=2`), widely used for sorting, pagination, and optional filtering.
2. **Body Parsing**:
   Incoming HTTP POST requests carry payload data in the message body. In modern Express, `express.json()` parses incoming payloads formatted as JSON, while `express.urlencoded({ extended: true })` parses UTF-8 encoded form bodies into `req.body`.
3. **HTTP Status Codes**:
   RESTful communication communicates result states via HTTP status codes:
   - `200 OK`: Successful retrieval or standard processing.
   - `401 Unauthorized`: Authentication failed due to invalid credentials.
4. **Server-Side Rendering (SSR) with EJS**:
   EJS (Embedded JavaScript) enables generating dynamic HTML markup with plain JavaScript. Data objects passed to `res.render()` are interpolated into template tags (`<%= %>` for escaped output, `<% %>` for control flow such as loops and conditionals).

## 5. Implementation
The project files reside in `Lab/Exp12/`:
- **[package.json](file:///Users/anujsharma/Desktop/Backend/Backend-Development/Lab/Exp12/package.json)**: Declares project dependencies `express` and `ejs`.
- **[script.js](file:///Users/anujsharma/Desktop/Backend/Backend-Development/Lab/Exp12/script.js)**: Standalone Node.js demonstration showing string interpolation and array aggregation using `reduce()`.
- **[app.js](file:///Users/anujsharma/Desktop/Backend/Backend-Development/Lab/Exp12/app.js)**: Main server script listening on port 3000:
  - *Route Parameters*:
    - `GET /user/:id`: Returns JSON `{ message: "User details", userId }`.
    - `GET /product/:category/:id`: Destructures category and id from `req.params`.
  - *Query Processing*:
    - `GET /search`: Returns query filters (`q`, `page`, `limit`).
    - `GET /calculate`: Performs arithmetic (`add`, `subtract`, `multiply`, `divide`) on `num1` and `num2` with zero-division validation.
  - *Body Parsing & Auth Simulation*:
    - `POST /register`: Returns confirmation JSON with parsed `username` and `email`.
    - `POST /login`: Validates credentials (`test@example.com` / `password123`); returns status `200` with simulated token upon success or status `401` upon mismatch.
  - *EJS Templating Routes*:
    - `GET /users`: Renders [users.ejs](file:///Users/anujsharma/Desktop/Backend/Backend-Development/Lab/Exp12/views/users.ejs) looping through an array of user objects in a styled HTML table.
    - `GET /profile/:id`: Renders [profile.ejs](file:///Users/anujsharma/Desktop/Backend/Backend-Development/Lab/Exp12/views/profile.ejs) passing user details into a profile card.
    - `GET /home`: Calls `res.render('home', ...)`. *(Note: View file in folder is named `index.ejs`; calling `/home` requires either aliasing the template or accessing `index` directly).*
- **[views/index.ejs](file:///Users/anujsharma/Desktop/Backend/Backend-Development/Lab/Exp12/views/index.ejs)**: Contains markup displaying dynamic heading, message, and server timestamp.
- **[views/users.ejs](file:///Users/anujsharma/Desktop/Backend/Backend-Development/Lab/Exp12/views/users.ejs)**: Iterates over user records with an `<% users.forEach(...) %>` table layout.
- **[views/profile.ejs](file:///Users/anujsharma/Desktop/Backend/Backend-Development/Lab/Exp12/views/profile.ejs)**: Structured user card displaying name, email, age, and city.

### Core Routing Snippet:
```javascript
// Arithmetic calculation via query parameters
app.get('/calculate', (req, res) => {
    const { num1, num2, operation } = req.query;
    const n1 = parseFloat(num1);
    const n2 = parseFloat(num2);
    let result;

    switch (operation) {
        case 'add': result = n1 + n2; break;
        case 'subtract': result = n1 - n2; break;
        case 'multiply': result = n1 * n2; break;
        case 'divide': result = n2 !== 0 ? n1 / n2 : 'Error: Division by zero'; break;
        default: result = 'Invalid operation';
    }
    res.json({ num1: n1, num2: n2, operation, result });
});
```

## 6. Procedure
1. Navigate to the experiment directory:
   ```bash
   cd Lab/Exp12
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the standalone JavaScript test script (optional):
   ```bash
   node script.js
   ```
4. Start the Express server:
   ```bash
   node app.js
   ```
5. Test endpoints using a browser or cURL:
   - Root URL: `http://localhost:3000/`
   - Path Params: `http://localhost:3000/user/101` and `http://localhost:3000/product/electronics/laptop-99`
   - Query String: `http://localhost:3000/search?q=express&page=1&limit=5`
   - Calculator: `http://localhost:3000/calculate?num1=20&num2=5&operation=multiply`
   - EJS Views: `http://localhost:3000/users` and `http://localhost:3000/profile/42`
   - POST Requests via cURL:
     ```bash
     curl -X POST http://localhost:3000/login \
          -H "Content-Type: application/json" \
          -d '{"email":"test@example.com","password":"password123"}'
     ```

## 7. Output and Results
- **Root Endpoint (`/`)**: Renders string response: `"Hello from Express!"`.
- **User Detail (`/user/101`)**:
  ```json
  { "message": "User details", "userId": "101" }
  ```
- **Calculation Endpoint (`/calculate?num1=20&num2=5&operation=multiply`)**:
  ```json
  { "num1": 20, "num2": 5, "operation": "multiply", "result": 100 }
  ```
- **Login Endpoint (`POST /login`)**:
  - Success: Returns HTTP 200 with `{ "success": true, "message": "Login successful", "token": "sample-jwt-token" }`.
  - Failure: Returns HTTP 401 with `{ "success": false, "message": "Invalid credentials" }`.
- **EJS Users Table (`/users`)**: Renders HTML table listing John Doe, Jane Smith, and Bob Johnson.
- **EJS Profile Card (`/profile/1`)**: Renders user profile card displaying name, email, age (25), and city (New York).

## 8. Learning Outcomes
- Acquired hands-on experience setting up an Express.js server from scratch.
- Learned the distinction and application of path parameters versus query string arguments.
- Understood how middleware functions process request payloads before route execution.
- Gained practical knowledge of server-side template rendering using EJS and passing dynamic data contexts.

## 9. Conclusion
Experiment 12A illustrates fundamental server-side architecture in Node.js and Express.js. It verifies that Express handles diverse request inputs (paths, queries, bodies) and supports multiple response formats (plain text, JSON APIs, and server-rendered HTML).

## 10. Viva Questions
**Q1: How do `req.params` and `req.query` differ in Express.js?**  
**Ans:** `req.params` contains route parameters defined in the route path pattern (e.g., `/user/:id`), whereas `req.query` contains optional key-value query string parameters appended after the `?` delimiter in the URL.

**Q2: What is the purpose of `express.json()` and `express.urlencoded()` middlewares?**  
**Ans:** They parse incoming HTTP request bodies. `express.json()` parses JSON payloads into JavaScript objects on `req.body`, while `express.urlencoded()` parses standard HTML form URL-encoded submissions.

**Q3: What is the difference between `<%= %>` and `<%- %>` in EJS?**  
**Ans:** `<%= %>` outputs HTML-escaped values to protect against Cross-Site Scripting (XSS), whereas `<%- %>` renders raw unescaped HTML directly to the output.

**Q4: How does `app.set('view engine', 'ejs')` assist the rendering process?**  
**Ans:** It informs Express to automatically use the EJS template engine when `res.render()` is invoked, allowing omission of file extensions when referencing template views.
