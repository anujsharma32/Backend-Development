from sqlalchemy import (
    create_engine,
    Column,
    Integer,
    String,
    Date,
    ForeignKey
)
from sqlalchemy.orm import declarative_base, sessionmaker, relationship
from datetime import date


# =========================================================
# DATABASE CONNECTION
# =========================================================

engine = create_engine("sqlite:///students.db")

Base = declarative_base()

Session = sessionmaker(bind=engine)
session = Session()


# =========================================================
# DEPARTMENT MODEL
# =========================================================

class Department(Base):
    __tablename__ = "departments"

    id = Column(Integer, primary_key=True)
    name = Column(
        String(100),
        unique=True,
        nullable=False
    )

    students = relationship(
        "Student",
        back_populates="department"
    )

    courses = relationship(
        "Course",
        back_populates="department"
    )


# =========================================================
# STUDENT MODEL
# =========================================================

class Student(Base):
    __tablename__ = "students"

    id = Column(Integer, primary_key=True)

    name = Column(
        String(100),
        nullable=False
    )

    email = Column(
        String(100),
        unique=True,
        nullable=False
    )

    branch = Column(String(50))

    enrollment_date = Column(Date)

    department_id = Column(
        Integer,
        ForeignKey("departments.id")
    )

    department = relationship(
        "Department",
        back_populates="students"
    )

    enrollments = relationship(
        "Enrollment",
        back_populates="student"
    )


# =========================================================
# COURSE MODEL
# =========================================================

class Course(Base):
    __tablename__ = "courses"

    id = Column(
        String(10),
        primary_key=True
    )

    title = Column(
        String(100),
        nullable=False
    )

    credits = Column(
        Integer,
        nullable=False
    )

    department_id = Column(
        Integer,
        ForeignKey("departments.id")
    )

    department = relationship(
        "Department",
        back_populates="courses"
    )

    enrollments = relationship(
        "Enrollment",
        back_populates="course"
    )


# =========================================================
# ENROLLMENT MODEL
# =========================================================

class Enrollment(Base):
    __tablename__ = "enrollments"

    student_id = Column(
        Integer,
        ForeignKey("students.id"),
        primary_key=True
    )

    course_id = Column(
        String(10),
        ForeignKey("courses.id"),
        primary_key=True
    )

    semester = Column(String(20))

    grade = Column(String(2))

    student = relationship(
        "Student",
        back_populates="enrollments"
    )

    course = relationship(
        "Course",
        back_populates="enrollments"
    )


# =========================================================
# CREATE DATABASE TABLES
# =========================================================

Base.metadata.create_all(engine)

print("Database and tables created successfully!")


# =========================================================
# CREATE DEPARTMENT
# =========================================================

department = session.query(Department).filter_by(
    name="Computer Science"
).first()

if not department:

    department = Department(
        name="Computer Science"
    )

    session.add(department)
    session.commit()

    print("Department created successfully.")

else:

    print("Department already exists.")


# =========================================================
# CREATE OPERATION
# =========================================================

print("\n--- CREATE OPERATION ---")

# Use a unique email for this practical
student_email = "aarav2026@upes.ac.in"

existing_student = session.query(Student).filter_by(
    email=student_email
).first()


if existing_student:

    print("Student already exists.")

else:

    new_student = Student(
        name="Aarav",
        email=student_email,
        branch="CSE",
        enrollment_date=date(2024, 8, 1),
        department_id=department.id
    )

    session.add(new_student)
    session.commit()

    print("Student created successfully.")
    print("Name:", new_student.name)
    print("Email:", new_student.email)
    print("Branch:", new_student.branch)


# =========================================================
# READ OPERATION
# =========================================================

print("\n--- READ OPERATION ---")

students = session.query(Student).filter(
    Student.branch == "CSE"
).all()

print("CSE Students:")

for student in students:

    print(
        "ID:",
        student.id,
        "| Name:",
        student.name,
        "| Email:",
        student.email,
        "| Branch:",
        student.branch
    )


# =========================================================
# UPDATE OPERATION
# =========================================================

print("\n--- UPDATE OPERATION ---")

student = session.query(Student).filter_by(
    email=student_email
).first()


if student:

    print("Before Update:")
    print("Branch:", student.branch)

    student.branch = "ECE"

    session.commit()

    print("After Update:")
    print("Branch:", student.branch)

    print("Student branch updated successfully.")

else:

    print("Student not found.")


# =========================================================
# DELETE OPERATION
# =========================================================

print("\n--- DELETE OPERATION ---")

student_to_delete = session.query(Student).filter_by(
    email=student_email
).first()


if student_to_delete:

    session.delete(student_to_delete)

    session.commit()

    print("Student deleted successfully.")

else:

    print("Student not found.")


# =========================================================
# CLOSE SESSION
# =========================================================

session.close()

print("\nCRUD operations completed successfully!")