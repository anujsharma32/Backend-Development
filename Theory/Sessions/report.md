# Theory Experiment 04: Session Management and Authentication Lifecycle with Express.js

## 1. Aim
To study, implement, and analyze server-side session management in Node.js and Express.js using the `express-session` middleware, demonstrating session initialization, state persistence across requests, authenticated profile access, and secure session destruction.

## 2. Objectives
- To understand the mechanics of stateful session management over stateless HTTP connections.
- To configure the `express-session` middleware with custom parameters including secret signing keys, resave strategies, and cookie expiration timeframes.
- To implement a simulated login workflow establishing session state (`req.session.username`).
- To enforce access control by checking session variables prior to granting access to protected routes (`/profile`).
- To terminate active sessions cleanly using `req.session.destroy()` upon logout.

## 3. Requirements
- **Runtime Environment**: Node.js
- **Framework**: Express.js (`^4.18.2`)
- **Middleware**: `express-session` (`^1.17.3`)
- **Tools**: Visual Studio Code, Web Browser with Developer Tools (Application / Storage tab), cURL / Postman

## 4. Theory
HTTP is a stateless communication protocol; the web server processes each incoming request in isolation without remembering previous transactions. In web applications requiring user logins, shopping carts, or personalization, statefulness must be established:

1. **How Sessions Function**:
   - When a user accesses an application, the server generates a unique **Session Identifier (SID)**.
   - The session data itself is maintained on the server (by default in memory).
   - The SID is transmitted to the client's browser inside a `Set-Cookie` HTTP response header.
   - On subsequent requests, the browser sends this cookie back in the `Cookie` request header.
   - The server inspects the incoming SID, matches it against its session store, and attaches the stored data to `req.session`.
2. **Session Options**:
   - `secret`: A private cryptographic key used to sign the session ID cookie, preventing client-side forgery.
   - `resave: false`: Avoids resaving the session to the store if it was never modified during the request.
   - `saveUninitialized: true`: Forces an uninitialized session to be saved to the store.
   - `cookie.maxAge`: Specifies the cookie's lifetime in milliseconds (e.g., `60000` ms = 1 minute), after which the browser automatically deletes the cookie.
3. **Session Lifecycle Operations**:
   - *Creation*: Initializing properties on `req.session` (e.g., `req.session.username = 'JohnDoe'`).
   - *Validation / Access*: Reading `req.session.username` to authorize or deny access.
   - *Destruction*: Calling `req.session.destroy()` deletes the session record from the server store.

## 5. Implementation
The experiment is implemented in `Theory/Sessions/`:
- **[package.json](file:///Users/anujsharma/Desktop/Backend/Backend-Development/Theory/Sessions/package.json)**: Declares dependencies for `express` and `express-session`.
- **[app.js](file:///Users/anujsharma/Desktop/Backend/Backend-Development/Theory/Sessions/app.js)**:
  Full application server:

  ```javascript
  const express = require('express');
  const session = require('express-session');
  const app = express();

  // Middleware to handle sessions
  app.use(session({
    secret: 'mySecretKey',       // used to sign session ID cookies
    resave: false,               // do not save if not modified
    saveUninitialized: true,     // save new sessions
    cookie: { maxAge: 60000 }    // cookie expiry: 1 minute
  }));

  // Set session variable (Simulate Login)
  app.get('/login', (req, res) => {
    req.session.username = 'JohnDoe';
    res.send('Session started for ' + req.session.username);
  });

  // Access session data (Protected Profile)
  app.get('/profile', (req, res) => {
    if (req.session.username) {
      res.send('Welcome ' + req.session.username);
    } else {
      res.send('Please log in first.');
    }
  });

  // Destroy session (Logout)
  app.get('/logout', (req, res) => {
    req.session.destroy(err => {
      if (err) return res.send('Error destroying session');
      res.send('Session destroyed successfully');
    });
  });

  app.listen(3000, () => console.log('Server running on port 3000'));
  ```

## 6. Procedure
1. Navigate to the project directory:
   ```bash
   cd Theory/Sessions
   ```
2. Install project dependencies:
   ```bash
   npm install
   ```
3. Start the Express server:
   ```bash
   node app.js
   ```
4. Verify execution in a web browser:
   - Visit `http://localhost:3000/profile` before logging in.
     - *Expected*: The server responds with `"Please log in first."`
   - Visit `http://localhost:3000/login` to initiate a session.
     - *Expected*: The server responds with `"Session started for JohnDoe"`.
     - Open Chrome DevTools (`F12`), navigate to **Application > Storage > Cookies > http://localhost:3000**, and observe the cookie named `connect.sid`.
   - Revisit `http://localhost:3000/profile`.
     - *Expected*: The server recognizes the active session and displays `"Welcome JohnDoe"`.
   - Visit `http://localhost:3000/logout`.
     - *Expected*: The server displays `"Session destroyed successfully"`.
   - Revisit `http://localhost:3000/profile`.
     - *Expected*: Access is denied; displays `"Please log in first."`

## 7. Output and Results
- **Unauthenticated Access (`GET /profile`)**:
  Returns: `"Please log in first."` (Session is inactive or absent).
- **Session Initialization (`GET /login`)**:
  Returns: `"Session started for JohnDoe"`.
  Browser stores signed cookie: `connect.sid=s%3A...`.
- **Authenticated Access (`GET /profile`)**:
  Returns: `"Welcome JohnDoe"`.
- **Session Termination (`GET /logout`)**:
  Returns: `"Session destroyed successfully"`.
- **Session Expiration**:
  After 60 seconds of inactivity, subsequent visits to `/profile` revert to `"Please log in first."` due to `maxAge: 60000`.

## 8. Learning Outcomes
- Understood the architecture and security aspects of web sessions and cookies.
- Configured and deployed `express-session` middleware in an Express application.
- Implemented stateful authentication workflows (login, profile authorization, logout).
- Inspected session cookies (`connect.sid`) using browser developer tools.

## 9. Conclusion
Theory Experiment 04 demonstrates the fundamental principles of session management in web development. By maintaining user state on the server and synchronizing it with the client via a signed cookie, stateless HTTP communication is successfully adapted for secure user authentication flows.

## 10. Viva Questions
**Q1: What is the purpose of the `connect.sid` cookie created by `express-session`?**  
**Ans:** `connect.sid` holds the cryptographically signed Session Identifier. The browser sends this cookie on every request, allowing the server to look up and restore the corresponding session data stored in memory or a database.

**Q2: What happens when the `maxAge` duration expires?**  
**Ans:** When `maxAge` is reached, the client browser automatically purges the cookie, and subsequent requests from that client will no longer transmit the session ID, causing the server to treat the user as unauthenticated.

**Q3: How does session-based authentication differ from token-based authentication (like JWT)?**  
**Ans:** In session-based authentication, user state is stored on the server and identified by a cookie SID. In token-based authentication (JWT), all claims are encoded into a self-contained, digitally signed token stored entirely on the client, allowing the server to remain completely stateless.

**Q4: Why is signing the session cookie with a secret key crucial?**  
**Ans:** Cookie signing prevents malicious users from tampering with or forging the session ID. If an attacker alters the cookie value, the server's cryptographic verification fails, and the counterfeit session is rejected.
