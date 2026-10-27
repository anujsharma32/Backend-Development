# Theory Experiment 06: State Management in Web Applications — Cookies and Sessions

## 1. Aim
To study, implement, and compare client-side and server-side state management mechanisms in Node.js and Express.js by creating dedicated implementations for HTTP Cookies (using `cookie-parser`) and Server Sessions (using `express-session`), evaluating lifecycle behaviors, security flags, and session isolation.

## 2. Objectives
- To understand the necessity and mechanisms of maintaining state over the stateless HTTP protocol.
- To implement client-side state tracking using HTTP cookies, exploring attributes like `maxAge`, `httpOnly`, and `secure` (Part A: Cookies).
- To perform cookie creation (`res.cookie`), retrieval (`req.cookies`), and deletion (`res.clearCookie`).
- To implement server-side session management using signed session identifiers (Part B: Sessions).
- To manage session lifecycles: establishing session variables (`/login`), authorizing protected access (`/profile`), and destroying active sessions (`/logout`).
- To analyze network request/response headers and browser storage mechanisms using browser developer tools.

## 3. Requirements
- **Runtime Environment**: Node.js (v16.x or higher)
- **Web Framework**: Express.js (`^4.19.2`)
- **Middlewares**: `cookie-parser` (`^1.4.6`), `express-session` (`^1.18.0`)
- **Tools**: Visual Studio Code, Modern Web Browser with Developer Tools (Console and Application tabs)

## 4. Theory
HTTP is a stateless protocol where the web server treats each incoming request independently. Web applications overcome this limitation through two primary patterns:

### Part A: Cookies (Client-Side State Storage)
- **Concept**: Small text-based key-value pairs stored directly by the client browser. When the server sends a `Set-Cookie` header, the browser stores the cookie and automatically attaches it in the `Cookie` header on subsequent requests to that domain.
- **Key Attributes**:
  - `maxAge`: Expiration time in milliseconds (e.g., `3600000` ms = 1 hour).
  - `httpOnly: true`: Restricts access to the cookie from client-side scripts (`document.cookie`), mitigating Cross-Site Scripting (XSS) attacks.
  - `secure: true`: Mandates that the cookie only be transmitted over encrypted HTTPS connections.

### Part B: Sessions (Server-Side State Storage)
- **Concept**: User data is maintained securely on the server (in memory or database). The client only stores an encrypted session ID cookie (`connect.sid`).
- **Mechanism**: The incoming session ID acts as an index to look up user data in the server store, populating `req.session`.
- **Security Advantage**: Sensitive data (such as user credentials, permissions, and roles) is never exposed to the client machine or network payload.

---

## 5. Implementation
The experiment is organized into two distinct modules in `Theory/Lecture-6/`:

### Module 1: Cookies ([Cookies/app.js](file:///Users/anujsharma/Desktop/Backend/Backend-Development/Theory/Lecture-6/Cookies/app.js))
Uses `cookie-parser` middleware to parse incoming cookie headers into `req.cookies`:
1. **Set Cookie (`GET /setcookie`)**:
   ```javascript
   app.get('/setcookie', (req, res) => {
       res.cookie('username', 'JohnDoe', {
           maxAge: 3600000,
           httpOnly: true,
           secure: false
       });
       res.send(`<h2>Cookie has been set!</h2>...`);
   });
   ```
2. **Read Cookie (`GET /getcookie`)**:
   Checks `req.cookies.username` and returns personalized greeting if present:
   ```javascript
   app.get('/getcookie', (req, res) => {
       const user = req.cookies.username;
       if (user) {
           res.send(`<h2>Welcome back, ${user}</h2>...`);
       } else {
           res.send(`<h2>No cookie found.</h2>...`);
       }
   });
   ```
3. **Delete Cookie (`GET /deletecookie`)**:
   Instructs the browser to clear the cookie:
   ```javascript
   app.get('/deletecookie', (req, res) => {
       res.clearCookie('username');
       res.send(`<h2>Cookie deleted.</h2>...`);
   });
   ```

### Module 2: Sessions ([Sessions/app.js](file:///Users/anujsharma/Desktop/Backend/Backend-Development/Theory/Lecture-6/Sessions/app.js))
Uses `express-session` middleware:
1. **Middleware Setup**:
   ```javascript
   app.use(session({
       secret: 'mySecretKey',
       resave: false,
       saveUninitialized: true,
       cookie: { maxAge: 60000 }
   }));
   ```
2. **Session Creation / Login (`GET /login`)**:
   Sets `req.session.username = 'JohnDoe'` and logs the session ID.
3. **Protected Profile (`GET /profile`)**:
   Verifies whether `req.session.username` exists; if so, displays profile details; otherwise prompts user to log in.
4. **Session Destruction / Logout (`GET /logout`)**:
   Calls `req.session.destroy()` to remove the session from server memory.

---

## 6. Procedure
### Testing Cookies:
1. Navigate to the Cookies folder:
   ```bash
   cd Theory/Lecture-6/Cookies
   npm install
   node app.js
   ```
2. Open `http://localhost:3000/setcookie` in your browser. Inspect the console and verify that the cookie is stored in DevTools (**Application > Cookies**).
3. Open `http://localhost:3000/getcookie` and observe the welcome message.
4. Open `http://localhost:3000/deletecookie` and verify that the cookie is removed.
5. Revisit `/getcookie` and observe `"No cookie found"`.

### Testing Sessions:
1. Navigate to the Sessions folder:
   ```bash
   cd Theory/Lecture-6/Sessions
   npm install
   node app.js
   ```
2. Visit `http://localhost:3000/profile` before logging in to observe the unauthorized state.
3. Visit `http://localhost:3000/login` to start the session. Inspect the console to view the assigned Session ID.
4. Visit `http://localhost:3000/profile` to view active session data.
5. Visit `http://localhost:3000/logout` to destroy the session.

---

## 7. Output and Results
Verified against the repository screenshots:

### Cookies Outputs:
- **Cookie Set (`Cookies/01-Cookie-Set.png`)**:
  Console logs: `Cookie Name: username | Cookie Value: JohnDoe | Cookie Duration: 1 hour | Cookie set successfully`.
- **Cookie Read (`Cookies/02-Cookie-Read.png`)**:
  Browser displays *"Welcome back, JohnDoe"*. Console confirms successful retrieval.
- **Cookie Deleted (`Cookies/03-Cookie-Deleted.png`)**:
  Displays *"Cookie deleted"* and verifies removal.
- **Cookie Not Found (`Cookies/04-Cookie-Not-Found.png`)**:
  After deletion or expiration, displays *"No cookie found."*

### Sessions Outputs:
- **Server Started (`Sessions/Server-Started.png.png`)**:
  Confirms server initialization on port 3000.
- **Session Login (`Sessions/Session-Started-Login.png`)**:
  Displays *"Session Started"* with username JohnDoe and logs generated Session ID.
- **Session Logout (`Sessions/Session-Destroyed-Logout.png`)**:
  Displays *"Session Destroyed"* and confirms cleanup of session ID.

---

## 8. Learning Outcomes
- Understood the practical differences between client-side cookies and server-side sessions.
- Learned how to configure and utilize `cookie-parser` and `express-session` middlewares.
- Implemented security attributes (`httpOnly`, `secret`) to protect state data against XSS and tampering.
- Mastered user authentication flow patterns (login, protected access, session termination).

---

## 9. Conclusion
Theory Experiment 06 provides a comparative implementation of state management in modern backend systems. Cookies offer lightweight client-side persistence, while sessions provide robust, tamper-resistant state storage for sensitive authentication workflows.

---

## 10. Viva Questions
**Q1: What does the `httpOnly` flag do when setting a cookie?**  
**Ans:** The `httpOnly` flag prevents client-side scripts from accessing the cookie via `document.cookie`. This mitigates the risk of session hijacking via Cross-Site Scripting (XSS) attacks.

**Q2: What is the main security advantage of sessions over cookies?**  
**Ans:** Sessions store sensitive data on the server; the client only holds a signed session identifier. In contrast, plain cookies store data on the client device where it can potentially be inspected or modified if not signed.

**Q3: How does `res.clearCookie()` remove a cookie from the browser?**  
**Ans:** It sends a `Set-Cookie` header for the specified cookie name with an expiration date set in the past, prompting the browser to immediately delete the cookie from its store.

**Q4: What occurs when `req.session.destroy()` is executed?**  
**Ans:** It removes the session record associated with the current request's session ID from the server-side session store, invalidating any future requests presenting that session ID.
