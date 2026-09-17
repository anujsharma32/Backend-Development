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