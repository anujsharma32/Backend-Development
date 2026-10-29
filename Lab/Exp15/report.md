# Experiment 15: Django To-Do List Web Application with MTV Architecture and SQLite

## 1. Aim
To develop a database-driven server-side web application using the Python Django framework, implementing the Model-Template-View (MTV) architectural pattern, SQLite persistence, Django Template Inheritance, and full CRUD operations with status toggling.

## 2. Objectives
- To configure and organize a multi-tier Django project (`todo_project`) with an encapsulated modular application (`todo`).
- To define a persistent database model (`Task`) with `CharField`, `BooleanField`, and auto-timestamped `DateTimeField`.
- To generate and execute database migrations creating tables in SQLite (`0001_initial.py`).
- To implement URL routing and dispatching across project and application levels.
- To write Django view controller functions handling task listing, filtering, task addition, state toggling, and deletion.
- To apply Django Template Inheritance using a base layout (`base.html`), partials (`header.html`, `footer.html`), and child templates (`task_list.html`, `add_task.html`).
- To secure HTML forms against Cross-Site Request Forgery (CSRF) using Django's built-in `{% csrf_token %}` tag.

## 3. Requirements
- **Language / Runtime**: Python 3.10+
- **Framework**: Django 4.x / 5.x
- **Database**: SQLite3
- **Tools**: Visual Studio Code, Web Browser, Terminal / CLI

## 4. Theory & Architecture
Django is a high-level, batteries-included Python web framework designed to encourage rapid development and clean, pragmatic design. It adheres to the **Model-Template-View (MTV)** pattern:

1. **Model (M)**:
   The single, definitive source of truth about your data. It contains the essential fields and behaviors of the data being stored. Django's Object-Relational Mapper (ORM) maps Python classes to database tables.
2. **Template (T)**:
   The presentation layer. Django's Template Language (DTL) separates business logic from HTML design, supporting template inheritance via `{% extends %}`, `{% block %}`, and `{% include %}` directives.
3. **View (V)**:
   The business logic layer. A view is a Python callable (function or class) that takes an HTTP request and returns an HTTP response (such as an HTML document or a redirect).
4. **URLconf (URL Configuration)**:
   Maps URL patterns to Python view functions.
5. **CSRF Protection**:
   Protects applications against Cross-Site Request Forgery by issuing a cryptographically signed user-specific token in forms.

## 5. Implementation Details

### Project Structure
```
Lab/Exp15/
├── manage.py
├── db.sqlite3
├── todo_project/
│   ├── __init__.py
│   ├── settings.py
│   ├── urls.py
│   ├── asgi.py
│   └── wsgi.py
└── todo/
    ├── __init__.py
    ├── admin.py
    ├── apps.py
    ├── models.py
    ├── urls.py
    ├── views.py
    ├── tests.py
    ├── migrations/
    │   ├── __init__.py
    │   └── 0001_initial.py
    └── templates/
        └── todo/
            ├── base.html
            ├── header.html
            ├── footer.html
            ├── task_list.html
            └── add_task.html
```

### 1. Data Model (`todo/models.py`)
```python
from django.db import models

class Task(models.Model):
    title = models.CharField(max_length=200)
    completed = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
```

### 2. View Functions (`todo/views.py`)
```python
from django.shortcuts import get_object_or_404, redirect, render
from django.views.decorators.http import require_POST
from .models import Task

def task_list(request):
    tasks = Task.objects.all().order_by("-created_at")
    completed_count = tasks.filter(completed=True).count()
    pending_count = tasks.filter(completed=False).count()

    return render(request, "todo/task_list.html", {
        "tasks": tasks,
        "completed_count": completed_count,
        "pending_count": pending_count,
    })

def add_task(request):
    if request.method == "POST":
        title = request.POST.get("title", "").strip()
        if title:
            Task.objects.create(title=title)
        return redirect("task_list")
    return render(request, "todo/add_task.html")

@require_POST
def toggle_task(request, task_id):
    task = get_object_or_404(Task, pk=task_id)
    task.completed = not task.completed
    task.save(update_fields=["completed"])
    return redirect("task_list")

@require_POST
def delete_task(request, task_id):
    task = get_object_or_404(Task, pk=task_id)
    task.delete()
    return redirect("task_list")
```

### 3. URL Dispatcher (`todo/urls.py`)
```python
from django.urls import path
from . import views

urlpatterns = [
    path("", views.task_list, name="task_list"),
    path("add/", views.add_task, name="add_task"),
    path("toggle/<int:task_id>/", views.toggle_task, name="toggle_task"),
    path("delete/<int:task_id>/", views.delete_task, name="delete_task"),
]
```

### 4. Template Inheritance Layout
- **`base.html`**: Sets up global HTML5 document structure, meta tags, and loads reusable `header.html` and `footer.html`.
- **`task_list.html`**: Extends `base.html`, displays summary statistics (total, completed, pending), iterates through tasks with status tags, and provides action buttons with CSRF tokens.
- **`add_task.html`**: Extends `base.html`, provides an accessible form with POST method and CSRF protection to submit new tasks.

## 6. How to Run the Project
1. Open terminal and navigate to the project directory:
   ```bash
   cd Lab/Exp15
   ```
2. Activate Python environment and run migrations:
   ```bash
   python3 manage.py migrate
   ```
3. Start the Django development server:
   ```bash
   python3 manage.py runserver 8000
   ```
4. Open web browser and visit:
   `http://127.0.0.1:8000/`

## 7. Observations & Results
1. The application successfully connects to the local SQLite database via Django ORM.
2. New tasks submitted via `POST /add/` are validated, trimmed, and inserted with automatic timestamps.
3. State toggling (`POST /toggle/<id>/`) seamlessly swaps `completed` between `True` and `False` with partial field saving (`update_fields=['completed']`).
4. Task deletion removes the record from the database table and immediately refreshes the task list.
5. Computed metrics dynamically update counts for total, completed, and pending items.
6. CSRF middleware ensures security against unauthorized cross-site submissions.

## 8. Conclusion
The Django MTV architecture provides an exceptionally organized, scalable foundation for database-driven web development. By combining Django Models, QuerySet filtering, URL routing, and Template Inheritance, a complete, robust To-Do tracking system was implemented successfully.
