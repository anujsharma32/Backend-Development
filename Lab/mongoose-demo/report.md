# Experiment 13A: MongoDB and Mongoose ODM Integration

## 1. Aim
To develop a backend web application using Node.js, Express.js, MongoDB, and Mongoose Object Data Modeling (ODM) to demonstrate database connection management, schema definition, model creation, user registration with duplicate key validation, credential verification (login), and document querying.

## 2. Objectives
- To establish an asynchronous connection between an Express application and a MongoDB database using Mongoose (`mongoose.connect`).
- To define strongly typed database schemas with validation rules (`required`, `unique`, `default`) using `mongoose.Schema`.
- To instantiate and compile Mongoose Models for collection-level database operations.
- To implement user registration (`POST /signup`) with error handling for duplicate key constraints (MongoServerError E11000).
- To implement authentication verification (`POST /login`) using document queries (`User.findOne`).
- To retrieve and render stored user collections (`GET /users`) using `User.find()`.

## 3. Requirements
- **Runtime**: Node.js (v16.x or higher)
- **Framework**: Express.js (`^4.18.2`)
- **ODM Library**: Mongoose (`^8.0.0`)
- **Database**: MongoDB (Local standalone instance running at `mongodb://localhost:27017` or MongoDB Atlas URI)
- **Tools**: Visual Studio Code, Web Browser, Terminal / CLI

## 4. Theory
MongoDB is a document-oriented NoSQL database that stores data in flexible, JSON-like BSON (Binary JSON) documents. Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js that provides a schema-based solution to model application data:

1. **Schemas vs Models**:
   - *Schema*: Defines the structure of the document, default values, validators, and data types.
   - *Model*: A wrapper on the Mongoose schema that provides an interface to the database for creating, querying, updating, and deleting records.
2. **Schema Constraints & Validations**:
   Mongoose provides built-in validation options:
   - `required: true`: Ensures the field cannot be omitted or null.
   - `unique: true`: Directs MongoDB to create a unique index ensuring no two documents share the same value. If violated, MongoDB throws an `E11000` duplicate key error.
3. **Mongoose Query Methods**:
   - `save()`: Asynchronously persists a document instance to the database collection.
   - `findOne(conditions)`: Finds and returns the first single document matching the specified criteria.
   - `find()`: Retrieves all documents in the collection matching query criteria.

## 5. Implementation
The experiment is implemented in `Lab/mongoose-demo/`:
- **[package.json](file:///Users/anujsharma/Desktop/Backend/Backend-Development/Lab/mongoose-demo/package.json)**: Declares dependencies for `express` and `mongoose`.
- **[server.js](file:///Users/anujsharma/Desktop/Backend/Backend-Development/Lab/mongoose-demo/server.js)**:

  1. **Database Connection**:
     ```javascript
     const DB_URL = 'mongodb://localhost:27017/userdb';

     mongoose.connect(DB_URL)
       .then(() => console.log('Connected to MongoDB successfully'))
       .catch(err => console.error('MongoDB connection error:', err));
     ```

  2. **Schema & Model Definition**:
     ```javascript
     const userSchema = new mongoose.Schema({
       username: {
         type: String,
         required: true,
         unique: true
       },
       email: {
         type: String,
         required: true,
         unique: true
       },
       password: {
         type: String,
         required: true
       },
       createdAt: {
         type: Date,
         default: Date.now
       }
     });

     const User = mongoose.model('User', userSchema);
     ```

  3. **Application Routes**:
     - `GET /`: Serves an HTML page featuring registration, login, and user listing forms.
     - `POST /signup`: Extracts user input, instantiates a `new User()`, and saves it. Handles error code `11000` explicitly:
       ```javascript
       app.post('/signup', async (req, res) => {
         try {
           const { username, email, password } = req.body;
           const newUser = new User({ username, email, password });
           await newUser.save();
           res.send(`<h2 class="success">User registered successfully!</h2>...`);
         } catch (error) {
           if (error.code === 11000) {
             res.send(`<h2 class="error">Error: Username or email already exists</h2>...`);
           } else {
             res.send(`<h2 class="error">Error: ${error.message}</h2>...`);
           }
         }
       });
       ```
     - `POST /login`: Validates user existence and password equivalence:
       ```javascript
       app.post('/login', async (req, res) => {
         try {
           const { username, password } = req.body;
           const user = await User.findOne({ username });
           if (!user) return res.send(`<h2 class="error">User not found</h2>...`);
           if (user.password !== password) return res.send(`<h2 class="error">Incorrect password</h2>...`);
           res.send(`<h2 class="success">Login successful!</h2>...`);
         } catch (error) {
           res.send(`<h2 class="error">Error: ${error.message}</h2>...`);
         }
       });
       ```
     - `GET /users`: Fetches and lists all users using `await User.find()`.

## 6. Procedure
1. Ensure a local MongoDB daemon (`mongod`) is running or configure a valid MongoDB Atlas connection string in `server.js`:
   ```bash
   # Check if MongoDB is running locally
   brew services list  # on macOS with Homebrew
   # or: mongosh
   ```
2. Navigate to the experiment directory:
   ```bash
   cd Lab/mongoose-demo
   ```
3. Install project dependencies:
   ```bash
   npm install
   ```
4. Start the Express server:
   ```bash
   node server.js
   ```
   Verify console outputs:
   ```
   Server running on http://localhost:3000
   Connected to MongoDB successfully
   ```
5. Open `http://localhost:3000` in a browser:
   - Register a user via the registration form.
   - Attempt to register the exact same username or email to verify duplicate constraint detection.
   - Log in using valid and invalid credentials.
   - Click "Show All Registered Users" to view all records in the collection.

## 7. Output and Results
- **Console Log**: Confirms MongoDB connectivity: `"Connected to MongoDB successfully"`.
- **User Registration**:
  - Success: Displays *"User registered successfully!"* alongside username and email.
  - Duplicate Submission: Displays *"Error: Username or email already exists"*.
- **Authentication**:
  - Valid Credentials: Displays *"Login successful!"*, welcoming the user and showing account creation date.
  - Invalid Credentials: Accurately identifies whether user was not found or if the password was incorrect.
- **User Listing**: Renders an unordered HTML list with all registered users formatted as:
  `Username: <name> | Email: <email> | Joined: <Date>`.

## 8. Learning Outcomes
- Understood NoSQL database paradigms and document storage architecture.
- Gained practical expertise integrating Mongoose ODM within an Express.js server.
- Mastered asynchronous database operations using modern JavaScript `async`/`await`.
- Implemented robust error handling for database schema constraints and duplicate key errors.

## 9. Conclusion
Experiment 13A establishes the end-to-end integration of Node.js, Express, and MongoDB using Mongoose. The experiment confirms that Mongoose schemas provide structural integrity and data validation to otherwise schema-less NoSQL databases.

## 10. Viva Questions
**Q1: What is the primary role of an Object Data Modeling (ODM) library like Mongoose?**  
**Ans:** Mongoose acts as an abstraction layer between Node.js and MongoDB. It provides schema validation, type casting, query building, business logic hooks (middleware), and model instantiation for structured document handling.

**Q2: What is the significance of error code 11000 in MongoDB?**  
**Ans:** Error code 11000 represents a duplicate key error, which occurs when an operation attempts to insert or update a document with a value that violates a unique index constraint (such as duplicate `username` or `email`).

**Q3: How does `findOne()` differ from `find()` in Mongoose?**  
**Ans:** `findOne()` returns a single document object matching the criteria (or `null`), while `find()` returns an array containing all matching documents (or an empty array if none match).

**Q4: In a production environment, why should passwords not be stored as plain text strings as done in this demonstration?**  
**Ans:** Storing plain text passwords exposes user credentials to catastrophic security breaches. Passwords should always be securely hashed using salted one-way hashing algorithms such as `bcrypt` or `Argon2` before persistence.
