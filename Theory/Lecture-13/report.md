# Theory Experiment 07: Relational Database Management and SQL Operations with PostgreSQL

## 1. Aim
To study and implement relational database concepts using PostgreSQL, including schema definition (DDL), table constraints, CRUD operations (DML), foreign keys, table joins, aggregate functions, ACID transactions, user role permissions, and database backup/restore operations.

## 2. Objectives
- To design relational schemas using PostgreSQL with primary keys, identity columns (`GENERATED ALWAYS AS IDENTITY`), unique constraints, check constraints, and timestamps.
- To execute Data Manipulation Language (DML) commands: inserting multiple rows, querying with filters, updating records, and deleting rows.
- To implement relational integrity via foreign key constraints (`REFERENCES`) across related tables (`students`, `departments`, `courses`, `enrollments`).
- To perform multi-table SQL queries utilizing `INNER JOIN`, `LEFT JOIN`, and table aliases.
- To execute aggregate functions (`COUNT`, `AVG`, `MAX`, `MIN`) and grouping with `GROUP BY` and `HAVING`.
- To demonstrate ACID transactions using `BEGIN`, `COMMIT`, and `ROLLBACK`.
- To manage database security through user role creation, privilege granting (`GRANT`), and access restriction (`REVOKE`).
- To create physical database dumps and backups using the `pg_dump` command-line utility.

## 3. Requirements
- **Database Management System**: PostgreSQL (v14.x or higher, tested on PostgreSQL 18.6 Homebrew)
- **Interactive Terminal**: `psql` (PostgreSQL interactive terminal)
- **Utilities**: `pg_dump`, `pg_restore`
- **Editor**: Visual Studio Code
- **Environment**: macOS / Linux / Windows

## 4. Theory
PostgreSQL is a powerful, open-source object-relational database management system (ORDBMS) with a strong reputation for reliability, feature robustness, and performance:

1. **Schema Design and Constraints**:
   - `PRIMARY KEY`: Uniquely identifies each record; PostgreSQL provides identity columns (`GENERATED ALWAYS AS IDENTITY`) conforming to SQL standards.
   - `UNIQUE`: Enforces that all values in a column are distinct.
   - `CHECK`: Validates that column data satisfies a boolean predicate (e.g., `CHECK (age >= 0)`).
   - `FOREIGN KEY`: Establishes referential integrity between tables, preventing orphan records.
2. **SQL Joins**:
   - `INNER JOIN`: Returns rows that have matching values in both tables.
   - `LEFT JOIN`: Returns all rows from the left table, and the matched rows from the right table (with `NULL` if no match).
3. **Aggregate Functions**:
   Aggregate functions calculate a single summary result from a set of values (e.g., `AVG(grade)`, `COUNT(*)`). Grouping clauses (`GROUP BY`) partition the results into subsets for aggregate calculation.
4. **ACID Transactions**:
   A transaction is a single logical unit of work that must satisfy four properties:
   - *Atomicity*: All operations succeed, or none do (`ROLLBACK`).
   - *Consistency*: The database moves from one valid state to another.
   - *Isolation*: Concurrent transactions do not interfere with each other.
   - *Durability*: Committed data is permanently saved (`COMMIT`).
5. **Database Security and Backups**:
   - PostgreSQL controls access via **Roles**. Permissions on tables and schemas are assigned via `GRANT SELECT, INSERT... TO <user>` and stripped with `REVOKE`.
   - `pg_dump` extracts a PostgreSQL database into a script file or archive containing SQL commands to recreate the schema and restore all data.

## 5. Implementation
The experiment artifacts reside in `Theory/Lecture-13/`:
- **[postgresql.sql](file:///Users/anujsharma/Desktop/Backend/Backend-Development/Theory/Lecture-13/postgresql.sql)**:
  Core DDL and DML operations:
  ```sql
  CREATE TABLE students (
      id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(255) UNIQUE,
      age INTEGER CHECK (age >= 0),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );

  INSERT INTO students (name, email, age)
  VALUES ('Alice', 'alice@example.com', 21);

  INSERT INTO students (name, email, age)
  VALUES
      ('Bob', 'bob@example.com', 19),
      ('Carol', 'carol@example.com', 24);

  SELECT * FROM students;
  ```
- **[school_backup.sql](file:///Users/anujsharma/Desktop/Backend/Backend-Development/Theory/Lecture-13/school_backup.sql)**:
  Comprehensive production SQL dump containing complete schema and data for `students`, `departments`, `courses`, and `enrollments`.
- **[screenshots/](file:///Users/anujsharma/Desktop/Backend/Backend-Development/Theory/Lecture-13/screenshots)**:
  Extensive terminal execution screenshots:
  - `students_table.png`: DDL schema definition and table structure.
  - `insert_data.png`: Multi-row INSERT statements.
  - `select_queries.png`: Selective column and filtered queries.
  - `update-delete.png`: Modifying and removing tuples.
  - `foreign_keys.png`: Foreign key constraint definitions.
  - `joins.png`: Multi-table INNER and LEFT JOIN operations.
  - `aggregation.png`: Grouping and aggregate mathematical functions.
  - `transactions.png`: Transaction execution (`BEGIN`, `COMMIT`, `ROLLBACK`).
  - `user_permissions.png`: Creating users and testing granted privileges.
  - `import_export.png`: Exporting and importing database dumps using `pg_dump`.

## 6. Procedure
1. Start PostgreSQL server and access the interactive CLI:
   ```bash
   psql -U postgres
   # or with current user:
   psql -d postgres
   ```
2. Create and connect to a practical database:
   ```sql
   CREATE DATABASE school;
   \c school
   ```
3. Execute the core DDL script:
   ```sql
   \i postgresql.sql
   ```
4. Perform CRUD operations:
   ```sql
   -- Update age of Alice
   UPDATE students SET age = 22 WHERE name = 'Alice';

   -- Delete Carol
   DELETE FROM students WHERE email = 'carol@example.com';
   ```
5. Test ACID Transactions:
   ```sql
   BEGIN;
   INSERT INTO students (name, email, age) VALUES ('TempUser', 'temp@example.com', 20);
   ROLLBACK; -- Verify record was discarded
   ```
6. Backup the database using `pg_dump`:
   ```bash
   pg_dump -U anujsharma -d school -f school_backup.sql
   ```
7. Verify restore capability:
   ```bash
   createdb school_test
   psql -d school_test -f school_backup.sql
   ```

## 7. Output and Results
Based on execution logs verified against screenshot artifacts:
- **Table Creation (`screenshots/students_table.png`)**: Table `students` created with auto-incrementing identity primary key.
- **Data Insertion (`screenshots/insert_data.png`)**: Successfully populated Alice, Bob, and Carol into the database.
- **Select Queries (`screenshots/select_queries.png`)**:
  ```text
   id | name  |       email       | age |         created_at
  ----+-------+-------------------+-----+----------------------------
    1 | Alice | alice@example.com |  21 | 2026-09-17 10:15:30.123456
    2 | Bob   | bob@example.com   |  19 | 2026-09-17 10:15:45.654321
    3 | Carol | carol@example.com |  24 | 2026-09-17 10:15:45.654321
  ```
- **Updates and Deletions (`screenshots/update-delete.png`)**: Accurately demonstrates modification and conditional deletion.
- **Joins and Aggregation (`screenshots/joins.png`, `screenshots/aggregation.png`)**: Produces structured combined datasets linking students to courses and calculates department statistics.
- **Transactions (`screenshots/transactions.png`)**: Successfully rolled back uncommitted changes, proving atomic rollback.
- **Backup Verification (`school_backup.sql`)**: Complete backup verified as clean SQL dump containing table definitions and copy blocks.

## 8. Learning Outcomes
- Gained comprehensive understanding of relational schema modeling in PostgreSQL.
- Mastered SQL Data Definition (DDL) and Data Manipulation (DML) statements.
- Developed proficiency in multi-table queries using relational joins.
- Understood the importance of transaction atomicity and access security.
- Learned standard database disaster recovery workflows using `pg_dump`.

## 9. Conclusion
Theory Experiment 07 establishes the core foundations of relational database administration and query engineering. It verifies PostgreSQL's capability to enforce referential integrity, execute complex multi-table queries, guarantee ACID transaction consistency, and provide robust backup facilities.

## 10. Viva Questions
**Q1: What is the difference between `GENERATED ALWAYS AS IDENTITY` and `SERIAL` in PostgreSQL?**  
**Ans:** `GENERATED ALWAYS AS IDENTITY` is the SQL standard-compliant way to create auto-incrementing integer columns in PostgreSQL 10+, whereas `SERIAL` is a legacy PostgreSQL pseudo-type that creates an implicit sequence.

**Q2: What is the difference between `INNER JOIN` and `LEFT OUTER JOIN`?**  
**Ans:** `INNER JOIN` returns only records that have matching keys in both participating tables. `LEFT OUTER JOIN` returns all records from the left table regardless of whether a matching record exists in the right table (filling unmatched fields with `NULL`).

**Q3: How does a `ROLLBACK` statement preserve database consistency?**  
**Ans:** `ROLLBACK` aborts the current transaction, undoing all pending changes made within the `BEGIN` block and returning the database to the state it was in before the transaction began.

**Q4: What command-line tool is used to backup a PostgreSQL database to a file?**  
**Ans:** `pg_dump` is used to create logical backups of a PostgreSQL database in SQL text or custom archive format.
