# Theory Experiment 06B: Session Management and Protected Routing with Express.js

## 1. Aim
To implement server-side session management in Node.js and Express.js using `express-session`, demonstrating user login state creation, protected route authorization, session inspection, and session destruction.

## 2. Objectives
- To configure the `express-session` middleware with custom secrets and cookie lifespans.
- To establish session data on user login (`/login`).
- To restrict access to protected resources (`/profile`) based on session presence.
- To terminate active sessions cleanly using `req.session.destroy()` (`/logout`).

## 3. Requirements
- **Runtime Environment**: Node.js
- **Framework**: Express.js (`^4.19.2`)
- **Middleware**: `express-session` (`^1.18.0`)
- **Tools**: Visual Studio Code, Web Browser with DevTools

## 4. Theory
Sessions provide statefulness by storing user data on the server while the client browser only stores a signed session ID (`connect.sid`):
- `secret`: Cryptographic key used to sign the session ID cookie to prevent client tampering.
- `cookie.maxAge`: Session cookie expiration duration in milliseconds.
- `req.session.destroy()`: Purges session data from the server-side store.

## 5. Implementation
Implemented in [Theory/Lecture-6/Sessions/app.js](file:///Users/anujsharma/Desktop/Backend/Backend-Development/Theory/Lecture-6/Sessions/app.js):
- **Middleware**: Configures `secret: 'mySecretKey'` and `maxAge: 60000` (1 minute).
- **Login (`/login`)**: Sets `req.session.username = 'JohnDoe'`; logs username and session ID.
- **Profile (`/profile`)**: Authorizes access if `req.session.username` exists; otherwise returns "Please log in first."
- **Logout (`/logout`)**: Calls `req.session.destroy()` to remove session state from server memory.

## 6. Procedure
1. Navigate to directory:
   ```bash
   cd Theory/Lecture-6/Sessions
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start server:
   ```bash
   node app.js
   ```
4. Test endpoints:
   - Visit `http://localhost:3000/profile` (Access denied: "Please log in first.")
   - Visit `http://localhost:3000/login` (Session started for JohnDoe)
   - Revisit `http://localhost:3000/profile` (Access granted: "Welcome JohnDoe")
   - Visit `http://localhost:3000/logout` (Session destroyed)
   - Revisit `http://localhost:3000/profile` (Access denied again)

## 7. Output and Results
Verified against repository screenshots:
- `Server-Started.png.png`: Confirms server listening on port 3000.
- `Session-Started-Login.png`: Displays session start with username and session ID.
- `Session-Destroyed-Logout.png`: Confirms session destroyed successfully.

## 8. Learning Outcomes
- Understood server-side session handling versus client-side cookies.
- Implemented protected route access control based on session state.
- Learned proper session destruction procedures on user logout.

## 9. Conclusion
Experiment 06B demonstrates how `express-session` secures user state on the server, providing a reliable foundation for authentication in web applications.

## 10. Viva Questions
**Q1: Where does `express-session` store session data by default?**  
**Ans:** By default, it stores session data in memory (`MemoryStore`), which is intended for development purposes only.

**Q2: How does the server verify that a session cookie has not been forged?**  
**Ans:** The session ID cookie is cryptographically signed using the configured `secret`. If a client modifies the cookie value, the signature verification fails and the session is discarded.

**Q3: What happens to active sessions if the Node.js process is restarted with the default memory store?**  
**Ans:** All active sessions stored in memory are lost when the process terminates.
