# Theory Experiment 09: Web API Development with Django Framework

## 1. Aim
To study and implement a web application service using the Django full-stack web framework in Python, demonstrating Django project and application architecture, URL routing, view dispatching with `JsonResponse`, and database migration tracking.

## 2. Objectives
- To understand the Model-View-Template (MVT) / Model-View-Controller (MVC) architectural pattern of the Django framework.
- To initialize a structured Django project (`student_system`) and modular application (`students`) using `django-admin` and `manage.py`.
- To configure application settings (`INSTALLED_APPS`, database configuration with SQLite) in `settings.py`.
- To implement URL routing in `urls.py` binding paths to controller view functions.
- To construct API view handlers returning structured JSON data via Django's built-in `JsonResponse`.
- To inspect and apply database migrations using Django CLI commands (`showmigrations`, `migrate`).

## 3. Requirements
- **Language**: Python (v3.10 or higher)
- **Framework**: Django (`^5.0.0` or higher, as verified in environment screenshots)
- **Database**: SQLite 3 (`db.sqlite3`)
- **Tools**: Visual Studio Code, Web Browser, Terminal / CLI

## 4. Theory
Django is a high-level, batteries-included Python web framework that encourages rapid development and clean, pragmatic design:

1. **Django Architectural Pattern (MVT)**:
   - **Model**: Python classes defining database schemas, fields, and relationships. Handled by the Django ORM.
   - **View**: Business logic functions or classes that receive an `HttpRequest` object and return an `HttpResponse` (such as HTML or JSON).
   - **Template**: Presentation layer for rendering dynamic HTML documents.
   *(When acting as a pure API service, the Template layer is replaced by JSON serializers or `JsonResponse` objects).*
2. **Project vs Application**:
   - In Django, a **Project** represents the overarching website or system configuration containing global settings, database credentials, and root routing (`student_system/`).
   - An **Application** represents a modular, self-contained functional component of the project (e.g., `students/`) that can be plugged into any Django project.
3. **Database Migrations**:
   Django tracks model schema modifications through migration files (`makemigrations`), translating Python model changes into reproducible database schema alterations applied via `migrate`.
4. **`JsonResponse`**:
   A subclass of `HttpResponse` that automatically serializes Python dictionaries into JSON format, setting the `Content-Type: application/json` header.

## 5. Implementation
The experiment artifacts reside in `Theory/Lecture26/`:
- **[student_system/](file:///Users/anujsharma/Desktop/Backend/Backend-Development/Theory/Lecture26/student_system)**:
  Main Django project workspace:
  1. **Settings Configuration ([settings.py](file:///Users/anujsharma/Desktop/Backend/Backend-Development/Theory/Lecture26/student_system/student_system/settings.py))**:
     Registers the `students` app in `INSTALLED_APPS` and configures the default SQLite database:
     ```python
     INSTALLED_APPS = [
         'django.contrib.admin',
         'django.contrib.auth',
         'django.contrib.contenttypes',
         'django.contrib.sessions',
         'django.contrib.messages',
         'django.contrib.staticfiles',
         'students',
     ]
     ```
  2. **URL Routing ([urls.py](file:///Users/anujsharma/Desktop/Backend/Backend-Development/Theory/Lecture26/student_system/student_system/urls.py))**:
     Maps the root URL directly to the student index view handler:
     ```python
     from django.contrib import admin
     from django.urls import path
     from students import views

     urlpatterns = [
         path('admin/', admin.site.urls),
         path('', views.index),
     ]
     ```
  3. **View Handler ([students/views.py](file:///Users/anujsharma/Desktop/Backend/Backend-Development/Theory/Lecture26/student_system/students/views.py))**:
     Implements the API endpoint returning system status:
     ```python
     from django.http import JsonResponse

     def index(request):
         return JsonResponse({
             "message": "Welcome to the Student Management API",
             "version": "1.0",
             "status": "running"
         })
     ```
  4. **Database ([db.sqlite3](file:///Users/anujsharma/Desktop/Backend/Backend-Development/Theory/Lecture26/student_system/db.sqlite3))**:
     SQLite database file storing project migration states.
- **[Screenshots/](file:///Users/anujsharma/Desktop/Backend/Backend-Development/Theory/Lecture26/Screenshots)**:
  - `01-django-version.png`: Verification of Django version installed in environment.
  - `02-project-structure.png`: Project directory tree displaying `student_system` and `students`.
  - `03-api-code.png`: View implementation returning structured JSON.
  - `04-api-response.png`: Browser response displaying the live JSON API output.
  - `05-migration-check.png`: CLI output of `showmigrations` confirming database setup.

## 6. Procedure
1. Navigate to the Django project directory:
   ```bash
   cd Theory/Lecture26/student_system
   ```
2. Verify Django installation and version:
   ```bash
   python3 -m django --version
   ```
3. Check and apply database migrations:
   ```bash
   python3 manage.py showmigrations
   python3 manage.py migrate
   ```
4. Start the Django development server:
   ```bash
   python3 manage.py runserver 127.0.0.1:8000
   ```
5. Open your web browser and navigate to:
   ```
   http://127.0.0.1:8000/
   ```
6. Alternatively, test with cURL:
   ```bash
   curl -i http://127.0.0.1:8000/
   ```

## 7. Output and Results
Based on code execution and verified against screenshot artifacts:
- **Version Check (`Screenshots/01-django-version.png`)**:
  Confirms active modern Django runtime environment.
- **Project Structure (`Screenshots/02-project-structure.png`)**:
  Validates directory hierarchy containing `manage.py`, project configuration package, and modular application directory.
- **Migration Verification (`Screenshots/05-migration-check.png`)**:
  `showmigrations` confirms all standard Django migrations (`admin`, `auth`, `contenttypes`, `sessions`) applied successfully (`[X]`).
- **API Response (`Screenshots/04-api-response.png`)**:
  HTTP GET to `http://127.0.0.1:8000/` returns:
  - Status: `200 OK`
  - Content-Type: `application/json`
  - Body:
    ```json
    {
      "message": "Welcome to the Student Management API",
      "version": "1.0",
      "status": "running"
    }
    ```

## 8. Learning Outcomes
- Understood Django's batteries-included philosophy and modular project architecture.
- Learned the workflow of initializing Django projects and registering custom apps.
- Configured URL dispatchers and mapped requests to view controllers.
- Used `JsonResponse` to construct RESTful service endpoints without auxiliary serializer libraries.
- Managed database schemas using Django's migration engine.

## 9. Conclusion
Theory Experiment 09 demonstrates web API development with the Django framework. The experiment highlights Django's modularity, built-in migration management, and ease of routing, establishing it as a powerful framework for enterprise backend web applications.

## 10. Viva Questions
**Q1: What is the purpose of `manage.py` in a Django project?**  
**Ans:** `manage.py` is a command-line utility created automatically with each Django project. It wraps `django-admin` while setting the `DJANGO_SETTINGS_MODULE` environment variable to point to the project's `settings.py`, allowing commands like `runserver`, `migrate`, and `createsuperuser` to be executed easily.

**Q2: What is the difference between `makemigrations` and `migrate` in Django?**  
**Ans:** `makemigrations` inspects models for changes and generates new migration scripts in the `migrations/` folder. `migrate` executes those migration files against the target database, altering the actual physical database schema.

**Q3: How does `JsonResponse` differ from a standard `HttpResponse` in Django?**  
**Ans:** `JsonResponse` is a subclass of `HttpResponse` that automatically serializes its data payload into JSON format using Python's `json.dumps()` and sets the HTTP `Content-Type` header to `application/json`.

**Q4: What is the difference between a Django Project and a Django App?**  
**Ans:** A project is the complete web application instance consisting of configuration, databases, and settings. An app is a portable, modular Python package within the project designed to perform a specific function (e.g., student management, payments, authentication).
