# Lab Practical Examination 01: Full-Stack Notes Management System with Express.js, MongoDB Native Driver, and EJS

## 1. Aim
To architect and implement a full-stack, database-backed Notes Management web application using Node.js, Express.js, the official MongoDB native driver (`mongodb`), and EJS server-side templating to perform complete Create, Read, and Delete (CRUD) operations with server-side validation.

## 2. Objectives
- To establish asynchronous connection pooling to a local MongoDB database (`notes_lab`) using the native `MongoClient` class.
- To configure an Express.js application with EJS view engine and serve static stylesheets from a `public` directory.
- To implement server-side validation ensuring required fields (`title`, `content`) are non-empty before persistence.
- To perform document insertion (`insertOne`) with auto-generated timestamps and categorization.
- To query and sort documents chronologically (`find().sort({ createdAt: -1 })`) and render them into dynamic EJS card grids.
- To perform document deletion by unique MongoDB Object Identifier (`_id: new ObjectId(id)`).

## 3. Requirements
- **Runtime Environment**: Node.js (v18.x or higher)
- **Web Framework**: Express.js (`^5.2.1`)
- **Database Driver**: MongoDB Native Driver (`^7.6.0`)
- **Templating Engine**: EJS (`^6.0.1`)
- **Database Server**: MongoDB Community Server running at `mongodb://127.0.0.1:27017`
- **Development Tools**: Visual Studio Code, Web Browser, Terminal / CLI

## 4. Theory
Modern web applications frequently adopt a three-tier architecture comprising Presentation (HTML/CSS/EJS), Application Logic (Express.js), and Data Tier (MongoDB):

1. **MongoDB Native Driver vs ODM**:
   Unlike higher-level ODMs (such as Mongoose), the official `mongodb` driver connects directly to the database engine using `MongoClient`, offering lower overhead and fine-grained control over BSON serialization, query cursors, and collection commands.
2. **Document Identification (`ObjectId`)**:
   MongoDB automatically assigns each document a unique 12-byte hexadecimal identifier stored in the `_id` field. To query or delete an existing document by its string identifier, the string must be converted into a native BSON `ObjectId` instance via `new ObjectId(id)`.
3. **Server-Side Validation**:
   Client-side validation can be bypassed; therefore, robust applications enforce validation on the server before mutating database state. If `title` or `content` is missing, the server re-renders the input form displaying descriptive error feedback without crashing.
4. **Chronological Sorting**:
   In document querying, sorting by `{ createdAt: -1 }` orders results in descending order so that the most recent note appears first in the UI.

## 5. Implementation
The application structure is organized in `Lab/Exam-01/`:
- **[package.json](file:///Users/anujsharma/Desktop/Backend/Backend-Development/Lab/Exam-01/package.json)**: Declares project dependencies `express`, `mongodb`, and `ejs`.
- **[server.js](file:///Users/anujsharma/Desktop/Backend/Backend-Development/Lab/Exam-01/server.js)**:
  Main application entry point orchestrating database connectivity, middleware setup, and route handlers:

  1. **Database Initialization**:
     ```javascript
     const { MongoClient, ObjectId } = require("mongodb");
     const mongoURL = "mongodb://127.0.0.1:27017";
     const client = new MongoClient(mongoURL);
     let notesCollection;

     async function connectDB() {
         try {
             await client.connect();
             const database = client.db("notes_lab");
             notesCollection = database.collection("notes");
             console.log("Connected to MongoDB");
             app.listen(PORT, () => {
                 console.log(`Server running at http://localhost:${PORT}`);
             });
         } catch (error) {
             console.error("MongoDB connection failed:", error);
         }
     }
     connectDB();
     ```

  2. **View All Notes (`GET /`)**:
     Retrieves notes sorted newest-first and renders `views/index.ejs`:
     ```javascript
     app.get("/", async (req, res) => {
         try {
             const notes = await notesCollection.find().sort({ createdAt: -1 }).toArray();
             res.render("index", { notes });
         } catch (error) {
             res.status(500).send("Error retrieving notes");
         }
     });
     ```

  3. **Create Note Form and Action (`GET /notes/new` & `POST /notes`)**:
     Validates inputs and saves document with creation timestamp:
     ```javascript
     app.post("/notes", async (req, res) => {
         const { title, content, category } = req.body;
         if (!title || !title.trim() || !content || !content.trim()) {
             return res.render("new", { error: "Title and content are required." });
         }
         await notesCollection.insertOne({
             title: title.trim(),
             content: content.trim(),
             category: category ? category.trim() : "General",
             createdAt: new Date()
         });
         res.redirect("/");
     });
     ```

  4. **Delete Note (`POST /notes/:id/delete`)**:
     Parses string ID to `ObjectId` and removes document:
     ```javascript
     app.post("/notes/:id/delete", async (req, res) => {
         const id = req.params.id;
         await notesCollection.deleteOne({ _id: new ObjectId(id) });
         res.redirect("/");
     });
     ```
- **[views/index.ejs](file:///Users/anujsharma/Desktop/Backend/Backend-Development/Lab/Exam-01/views/index.ejs)**:
  Renders dashboard containing notes grid, category badges, creation timestamps, and individual delete buttons.
- **[views/new.ejs](file:///Users/anujsharma/Desktop/Backend/Backend-Development/Lab/Exam-01/views/new.ejs)**:
  Renders note creation form with validation error banner and input fields for title, category, and content.
- **[public/style.css](file:///Users/anujsharma/Desktop/Backend/Backend-Development/Lab/Exam-01/public/style.css)**:
  Provides clean card-based CSS styling, responsive grid layout, badge styles, and button hover states.

## 6. Procedure
1. Verify that MongoDB daemon is running locally on port 27017:
   ```bash
   mongosh --eval "db.adminCommand('ping')"
   ```
2. Navigate to the exam folder:
   ```bash
   cd Lab/Exam-01
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the server:
   ```bash
   node server.js
   ```
   Confirm console output:
   ```
   Connected to MongoDB
   Server running at http://localhost:3000
   ```
5. Open `http://localhost:3000` in a web browser:
   - Observe the empty state if no notes exist.
   - Click **+ Add Note** to navigate to `http://localhost:3000/notes/new`.
   - Attempt to submit an empty form to test validation error display.
   - Enter a title, select a category, write content, and submit.
   - Verify that the new note appears in the dashboard grid.
   - Click the **Delete** button to verify note removal.

## 7. Output and Results
- **Connection**: Server connects cleanly to database `notes_lab` and listens on port 3000.
- **Empty State**: Displays *"No notes available. Start by creating your first note."* with a CTA button.
- **Form Validation**: Submitting blank inputs renders an alert: *"Title and content are required."*
- **Note Rendering**: Notes display with card layout, category badge (e.g., "College", "General"), formatted timestamp (`new Date().toLocaleString()`), and note content.
- **Deletion**: Clicking Delete immediately deletes the record by `_id` and redirects to updated dashboard.

## 8. Learning Outcomes
- Demonstrated ability to build a full-stack CRUD application during a timed practical examination.
- Mastered direct MongoDB native driver operations (`MongoClient`, `insertOne`, `find`, `deleteOne`).
- Handled BSON `ObjectId` instantiation and query matching.
- Implemented server-side form validation and dynamic template rendering with EJS.

## 9. Conclusion
Lab Practical Exam 01 successfully verifies the end-to-end integration of Node.js, Express.js, MongoDB native driver, and EJS. The application provides an intuitive user interface for managing notes with persistent database storage and error validation.

## 10. Viva Questions
**Q1: Why is `new ObjectId(id)` required when deleting a document in MongoDB?**  
**Ans:** MongoDB stores document `_id` fields as 12-byte BSON `ObjectId` binary types. A query matching a raw string against `_id` will fail; the string must first be converted into a BSON `ObjectId` instance.

**Q2: What is the benefit of using `find().sort({ createdAt: -1 })`?**  
**Ans:** The sort modifier orders documents in descending order of creation time at the database engine level, ensuring the newest records are served to the user without requiring client-side array sorting.

**Q3: How does the MongoDB native driver differ from Mongoose?**  
**Ans:** The native driver is the official low-level driver providing direct access to MongoDB commands without schema enforcement. Mongoose is an ODM built on top of the native driver that adds schema definitions, validation, and lifecycle hooks.

**Q4: How does `app.use(express.static("public"))` serve assets?**  
**Ans:** It configures static file middleware, allowing files located in the `public` directory (such as `style.css`) to be served directly to the browser at the root path (e.g., `/style.css`).
