# Theory Experiment 06A: Cookie Management with Express.js

## 1. Aim
To implement and analyze client-side state persistence in Node.js and Express.js using the `cookie-parser` middleware, demonstrating how to set, read, configure security attributes for, and delete HTTP cookies.

## 2. Objectives
- To understand the role of HTTP cookies in client-side state persistence.
- To configure the `cookie-parser` middleware in an Express.js application.
- To set cookies with security flags (`httpOnly`, `maxAge`) via `res.cookie()`.
- To read incoming cookies from request headers via `req.cookies`.
- To delete cookies using `res.clearCookie()` and verify expiration behavior.

## 3. Requirements
- **Runtime Environment**: Node.js
- **Framework**: Express.js (`^4.19.2`)
- **Middleware**: `cookie-parser` (`^1.4.6`)
- **Tools**: Visual Studio Code, Web Browser with DevTools (Application > Cookies)

## 4. Theory
An HTTP cookie is a small piece of data that a server sends to the user's web browser:
- The browser stores the cookie and sends it back to the server with later requests to the same domain.
- `maxAge`: Specifies cookie lifespan in milliseconds.
- `httpOnly: true`: Blocks client-side JavaScript access via `document.cookie` to prevent XSS-based credential theft.
- `secure: false`: Allows transmission over unencrypted HTTP for local development.

## 5. Implementation
Implemented in [Theory/Lecture-6/Cookies/app.js](file:///Users/anujsharma/Desktop/Backend/Backend-Development/Theory/Lecture-6/Cookies/app.js):
- **Set Cookie (`/setcookie`)**: Sets `username` to `'JohnDoe'` with `maxAge: 3600000` (1 hour) and `httpOnly: true`.
- **Read Cookie (`/getcookie`)**: Checks `req.cookies.username` and returns greeting or "No cookie found."
- **Delete Cookie (`/deletecookie`)**: Clears cookie via `res.clearCookie('username')`.

## 6. Procedure
1. Navigate to directory:
   ```bash
   cd Theory/Lecture-6/Cookies
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
   - `http://localhost:3000/setcookie` (Sets cookie)
   - `http://localhost:3000/getcookie` (Reads cookie)
   - `http://localhost:3000/deletecookie` (Clears cookie)
   - `http://localhost:3000/getcookie` (Confirms deletion)

## 7. Output and Results
Verified against repository screenshots:
- `01-Cookie-Set.png`: Logs cookie creation (`username: JohnDoe`, duration 1 hour).
- `02-Cookie-Read.png`: Displays "Welcome back, JohnDoe".
- `03-Cookie-Deleted.png`: Confirms cookie deletion.
- `04-Cookie-Not-Found.png`: Confirms cookie no longer exists.

## 8. Learning Outcomes
- Mastered setting, reading, and clearing cookies in Express.js.
- Understood the importance of `httpOnly` for web application security.
- Inspected cookie transmission in HTTP request/response headers.

## 9. Conclusion
Experiment 06A demonstrates how cookies provide a straightforward mechanism for client-side state persistence across HTTP requests.

## 10. Viva Questions
**Q1: What is the purpose of `cookie-parser`?**  
**Ans:** It parses the `Cookie` header on incoming requests and populates `req.cookies` with an object keyed by cookie names.

**Q2: What is the default lifespan of a session cookie if `maxAge` is not specified?**  
**Ans:** A session cookie without an expiration or maxAge attribute is stored in memory and deleted when the browser closes.

**Q3: Can client-side JavaScript access an `httpOnly` cookie?**  
**Ans:** No, `httpOnly` cookies cannot be accessed via `document.cookie`, protecting them from XSS attacks.
