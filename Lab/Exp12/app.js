const express = require('express');

const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Hello from Express!');
});

app.get('/user/:id', (req, res) => {
    const userId = req.params.id;

    res.json({
        message: 'User details',
        userId: userId
    });
});

app.get('/product/:category/:id', (req, res) => {
    const { category, id } = req.params;

    res.json({
        category: category,
        productId: id
    });
});

app.get('/search', (req, res) => {
    const { q, page, limit } = req.query;

    res.json({
        searchQuery: q,
        page: page || 1,
        limit: limit || 10
    });
});

app.get('/calculate', (req, res) => {
    const { num1, num2, operation } = req.query;

    const n1 = parseFloat(num1);
    const n2 = parseFloat(num2);

    let result;

    switch (operation) {
        case 'add':
            result = n1 + n2;
            break;
        case 'subtract':
            result = n1 - n2;
            break;
        case 'multiply':
            result = n1 * n2;
            break;
        case 'divide':
            result = n2 !== 0
                ? n1 / n2
                : 'Error: Division by zero';
            break;
        default:
            result = 'Invalid operation';
    }

    res.json({
        num1: n1,
        num2: n2,
        operation: operation,
        result: result
    });
});

app.post('/register', (req, res) => {
    const { username, email, password } = req.body;

    res.json({
        message: 'Registration successful',
        user: {
            username: username,
            email: email
        }
    });
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (email === 'test@example.com' && password === 'password123') {
        res.json({
            success: true,
            message: 'Login successful',
            token: 'sample-jwt-token'
        });
    } else {
        res.status(401).json({
            success: false,
            message: 'Invalid credentials'
        });
    }
});

app.get('/home', (req, res) => {
  res.render('home', {
    title: 'Home Page',
    heading: 'Welcome to EJS Templating',
    message: 'EJS makes it easy to generate dynamic HTML'
  });
});

app.get('/users', (req, res) => {
  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com' }
  ];
  
  res.render('users', { users });
});

app.get('/profile/:id', (req, res) => {
  const userId = req.params.id;
  
  const user = {
    id: userId,
    name: 'John Doe',
    email: 'john@example.com',
    age: 25,
    city: 'New York'
  };
  
  res.render('profile', { user });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});