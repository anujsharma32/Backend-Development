const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();

app.use(cookieParser());

// Set Cookie
app.get('/setcookie', (req, res) => {
    res.cookie('username', 'JohnDoe', {
        maxAge: 3600000,
        httpOnly: true,
        secure: false
    });

    res.send(`
        <h2>Cookie has been set!</h2>

        <script>
            console.log("===== SET COOKIE =====");
            console.log("Cookie Name: username");
            console.log("Cookie Value: JohnDoe");
            console.log("Cookie Duration: 1 hour");
            console.log("Cookie set successfully");
        </script>
    `);
});

// Read Cookie
app.get('/getcookie', (req, res) => {
    const user = req.cookies.username;

    if (user) {
        res.send(`
            <h2>Welcome back, ${user}</h2>

            <script>
                console.log("===== READ COOKIE =====");
                console.log("Cookie Name: username");
                console.log("Cookie Value: ${user}");
                console.log("Cookie read successfully");
            </script>
        `);
    } else {
        res.send(`
            <h2>No cookie found.</h2>

            <script>
                console.log("===== READ COOKIE =====");
                console.log("No cookie found");
            </script>
        `);
    }
});

// Delete Cookie
app.get('/deletecookie', (req, res) => {
    res.clearCookie('username');

    res.send(`
        <h2>Cookie deleted.</h2>

        <script>
            console.log("===== DELETE COOKIE =====");
            console.log("Cookie Name: username");
            console.log("Cookie deleted successfully");
        </script>
    `);
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});