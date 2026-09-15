const express = require('express');
const session = require('express-session');

const app = express();

// Session middleware
app.use(session({
    secret: 'mySecretKey',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 60000
    }
}));

// Login - Start Session
app.get('/login', (req, res) => {
    req.session.username = 'JohnDoe';

    res.send(`
        <h2>Session Started</h2>
        <p>Welcome ${req.session.username}</p>

        <script>
            console.log("===== LOGIN =====");
            console.log("Session started successfully");
            console.log("Username:", "${req.session.username}");
            console.log("Session ID:", "${req.sessionID}");
        </script>
    `);
});

// Profile - Access Session
app.get('/profile', (req, res) => {

    if (req.session.username) {

        res.send(`
            <h2>Profile</h2>
            <p>Welcome ${req.session.username}</p>

            <script>
                console.log("===== PROFILE =====");
                console.log("Session is active");
                console.log("Username:", "${req.session.username}");
                console.log("Session ID:", "${req.sessionID}");
            </script>
        `);

    } else {

        res.send(`
            <h2>Please log in first.</h2>

            <script>
                console.log("===== PROFILE =====");
                console.log("No active session");
            </script>
        `);
    }
});

// Logout - Destroy Session
app.get('/logout', (req, res) => {

    const sessionID = req.sessionID;

    req.session.destroy((err) => {

        if (err) {
            return res.send(`
                <script>
                    console.log("Error destroying session");
                </script>
            `);
        }

        res.send(`
            <h2>Session Destroyed</h2>

            <script>
                console.log("===== LOGOUT =====");
                console.log("Session ID:", "${sessionID}");
                console.log("Session destroyed successfully");
            </script>
        `);
    });
});

// Start server
app.listen(3000, () => {
    console.log("Server running on port 3000");
});