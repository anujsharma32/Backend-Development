# Theory Experiment 08: Object-Relational Mapping (ORM) with SQLAlchemy and SQLite

## 1. Aim
To study and implement Object-Relational Mapping (ORM) principles in Python using SQLAlchemy and an SQLite database, demonstrating declarative schema modeling, relational foreign keys, bi-directional relationships, and complete CRUD (Create, Read, Update, Delete) lifecycle operations through an ORM Session.

## 2. Objectives
- To understand the architectural advantages of Object-Relational Mapping over raw SQL queries.
- To configure an SQLite database connection engine and initialize a scoped session factory (`sessionmaker`).
- To define declarative ORM models (`Department`, `Student`, `Course`, `Enrollment`) using SQLAlchemy's `declarative_base`.
- To establish one-to-many and many-to-many relationship mappings using `ForeignKey` and `relationship(back_populates=...)`.
- To generate physical relational database tables from Python class definitions via `Base.metadata.create_all()`.
- To execute full CRUD operations through the SQLAlchemy session: creating entities (`session.add`), querying with filter expressions (`session.query().filter()`), updating mapped object attributes, and deleting entities (`session.delete()`).

## 3. Requirements
- **Language**: Python (v3.8 or higher)
- **ORM Library**: SQLAlchemy (`sqlalchemy`)
- **Database Engine**: SQLite 3 (built-in Python driver)
- **Editor / IDE**: Visual Studio Code
- **Environment**: macOS / Linux / Windows

## 4. Theory
Object-Relational Mapping (ORM) is a programming technique that connects the object-oriented domain model of an application with a relational database schema:

1. **Why Use an ORM?**:
   - In raw SQL, developers must write database-specific string queries and manually map tabular tuples into program data structures.
   - An ORM automates this translation: database tables map to Python classes, rows map to class instances, and table columns map to object attributes.
   - ORMs provide compile-time type safety, prevent SQL injection vulnerabilities through automated query parameterization, and offer database portability (e.g., swapping SQLite for PostgreSQL without altering application code).
2. **Key SQLAlchemy Components**:
   - *Engine (`create_engine`)*: Manages database connections and dialect communication.
   - *Declarative Base (`declarative_base`)*: Base class that maintains a catalog of mapped classes and database tables.
   - *Session (`sessionmaker`)*: Represents the "Unit of Work" pattern. The session manages the lifecycle of persistence operations and transactions, caching objects and synchronizing changes with the database upon `commit()`.
3. **Relationships**:
   - *One-to-Many (`1:N`)*: One department has many students. Modeled using `ForeignKey("departments.id")` on `Student` and `relationship("Student", back_populates="department")` on `Department`.
   - *Many-to-Many (`M:N`)*: Students and courses share an association modeled through the junction entity `Enrollment` with composite foreign keys.

## 5. Implementation
The experiment artifacts reside in `Theory/Lecture15/`:
- **[sqlalchemy_demo.py](file:///Users/anujsharma/Desktop/Backend/Backend-Development/Theory/Lecture15/sqlalchemy_demo.py)**:
  Full script implementing models and CRUD lifecycle:

  1. **Connection and Base Initialization**:
     ```python
     from sqlalchemy import create_engine, Column, Integer, String, Date, ForeignKey
     from sqlalchemy.orm import declarative_base, sessionmaker, relationship
     from datetime import date

     engine = create_engine("sqlite:///students.db")
     Base = declarative_base()
     Session = sessionmaker(bind=engine)
     session = Session()
     ```

  2. **Model Definitions**:
     - `Department`: `id` (PK), `name` (unique).
     - `Student`: `id` (PK), `name`, `email` (unique), `branch`, `enrollment_date`, `department_id` (FK).
     - `Course`: `id` (PK, string), `title`, `credits`, `department_id` (FK).
     - `Enrollment`: Composite PK (`student_id`, `course_id`), `semester`, `grade`.

  3. **Table Creation**:
     ```python
     Base.metadata.create_all(engine)
     ```

  4. **CRUD Execution**:
     - *Create*:
       ```python
       new_student = Student(
           name="Aarav",
           email="aarav2026@upes.ac.in",
           branch="CSE",
           enrollment_date=date(2024, 8, 1),
           department_id=department.id
       )
       session.add(new_student)
       session.commit()
       ```
     - *Read*:
       ```python
       students = session.query(Student).filter(Student.branch == "CSE").all()
       for s in students:
           print(f"ID: {s.id} | Name: {s.name} | Email: {s.email} | Branch: {s.branch}")
       ```
     - *Update*:
       ```python
       student = session.query(Student).filter_by(email="aarav2026@upes.ac.in").first()
       student.branch = "ECE"
       session.commit()
       ```
     - *Delete*:
       ```python
       session.delete(student)
       session.commit()
       ```
- **[students.db](file:///Users/anujsharma/Desktop/Backend/Backend-Development/Theory/Lecture15/students.db)**:
  Physical SQLite database generated by the script.
- **[Screenshots](file:///Users/anujsharma/Desktop/Backend/Backend-Development/Theory/Lecture15/)**:
  - `01-SQLAlchemy-Installation.png`: Installation via pip.
  - `02-SQLAlchemy-Models.png`: Code architecture of declarative models.
  - `03-SQLAlchemy-Database-Created.png`: Terminal output confirming table creation.
  - `04-SQLAlchemy-Create.png`: Output of student record insertion.
  - `05-SQLAlchemy-Read.png`: Query output filtering CSE students.
  - `06-SQLAlchemy-Update.png`: Output verifying branch modification.
  - `07-SQLAlchemy-Delete.png`: Output verifying record deletion.

## 6. Procedure
1. Navigate to the project directory:
   ```bash
   cd Theory/Lecture15
   ```
2. Activate a Python environment and install SQLAlchemy:
   ```bash
   pip install sqlalchemy
   ```
3. Run the demonstration script:
   ```bash
   python sqlalchemy_demo.py
   ```
4. Observe the step-by-step console outputs confirming:
   - Database tables creation.
   - Department insertion.
   - Student creation and commit.
   - Query retrieval of filtered student records.
   - Attribute update from `CSE` to `ECE`.
   - Record deletion and session cleanup.
5. Inspect the generated SQLite database `students.db` using the SQLite CLI or VS Code SQLite Viewer extension:
   ```bash
   sqlite3 students.db ".schema"
   ```

## 7. Output and Results
Based on code execution and verified against screenshot artifacts:
- **Table Creation (`03-SQLAlchemy-Database-Created.png`)**:
  Output: `"Database and tables created successfully!"`
- **Create Operation (`04-SQLAlchemy-Create.png`)**:
  Output:
  ```
  --- CREATE OPERATION ---
  Student created successfully.
  Name: Aarav
  Email: aarav2026@upes.ac.in
  Branch: CSE
  ```
- **Read Operation (`05-SQLAlchemy-Read.png`)**:
  Output:
  ```
  --- READ OPERATION ---
  CSE Students:
  ID: 1 | Name: Aarav | Email: aarav2026@upes.ac.in | Branch: CSE
  ```
- **Update Operation (`06-SQLAlchemy-Update.png`)**:
  Output:
  ```
  --- UPDATE OPERATION ---
  Before Update:
  Branch: CSE
  After Update:
  Branch: ECE
  Student branch updated successfully.
  ```
- **Delete Operation (`07-SQLAlchemy-Delete.png`)**:
  Output:
  ```
  --- DELETE OPERATION ---
  Student deleted successfully.

  CRUD operations completed successfully!
  ```

## 8. Learning Outcomes
- Understood the architecture and practical benefits of Object-Relational Mapping with SQLAlchemy.
- Defined relational database schemas directly using Python object classes.
- Established one-to-many and junction relationships with foreign key constraints.
- Executed database CRUD operations through the SQLAlchemy Session unit of work.
- Learned how changes to object properties automatically translate to SQL UPDATE statements.

## 9. Conclusion
Theory Experiment 08 demonstrates the effectiveness of SQLAlchemy ORM in modern Python backend development. By bridging the gap between relational databases and object-oriented code, SQLAlchemy enhances developer productivity, provides query safety, and simplifies complex relational modeling.

## 10. Viva Questions
**Q1: What is the Unit of Work pattern as implemented by SQLAlchemy's `Session`?**  
**Ans:** The Unit of Work pattern keeps track of everything you do during a business transaction that can affect the database. It maintains an in-memory identity map of loaded objects and automatically batches and emits the necessary SQL INSERT, UPDATE, and DELETE statements only when `session.commit()` or `flush()` is called.

**Q2: What is the purpose of `back_populates` in SQLAlchemy `relationship()`?**  
**Ans:** `back_populates` explicitly establishes a bi-directional relationship between two models, ensuring that modifying the relationship on one side automatically synchronizes the corresponding attribute on the other side in memory.

**Q3: How does SQLAlchemy safeguard against SQL injection attacks?**  
**Ans:** SQLAlchemy automatically utilizes parameterized queries under the hood, ensuring user inputs are treated strictly as data literals rather than executable SQL code.

**Q4: What does `Base.metadata.create_all(engine)` do?**  
**Ans:** It inspects all model classes inheriting from `Base` and issues the required DDL `CREATE TABLE IF NOT EXISTS` statements to the target database engine.
