# Theory Experiment 02: Backend Web Server Implementation with Flask

## 1. Aim
To create and run a lightweight backend web application using Python and the Flask micro-framework, understanding WSGI server architecture, URL routing decorators, and development server configuration.

## 2. Objectives
- To understand the architecture and philosophy of micro-frameworks in Python web development.
- To initialize a Flask application instance and configure development execution parameters (`debug=True`).
- To map URL endpoints to Python view functions using `@app.route()` decorators.
- To execute the development server and test HTTP request-response delivery across network sockets.

## 3. Requirements
- **Language**: Python (v3.8 or higher)
- **Framework**: Flask (`flask`)
- **Server Gateway**: WSGI (Werkzeug development server)
- **Tools**: Visual Studio Code, Web Browser, Terminal / CLI

## 4. Theory
Flask is a lightweight WSGI web application framework in Python designed to make getting started quick and easy, with the ability to scale up to complex applications:

1. **Micro-framework Architecture**:
   Flask is classified as a micro-framework because it does not require particular tools or libraries (such as database abstraction layers or form validation components) out of the box. Extensions can be plugged in as needed, keeping the core codebase minimal and flexible.
2. **WSGI (Web Server Gateway Interface)**:
   Flask implements the WSGI specification (PEP 3333), which defines a universal calling convention for web servers to forward requests to Python web applications.
3. **Route Decorators**:
   Flask uses Python decorators (`@app.route('/path')`) to bind URL patterns to view handler functions. When a matching HTTP request arrives, Flask dispatches the request to the corresponding Python function and returns its response.
4. **Debug Mode**:
   Running Flask with `debug=True` enables an interactive in-browser debugger for tracebacks and enables the Werkzeug file watcher (auto-reloader), which automatically restarts the server whenever code changes are saved.

## 5. Implementation
The application is located in `Theory/Flask/`:
- **[backend-project/app.py](file:///Users/anujsharma/Desktop/Backend/Backend-Development/Theory/Flask/backend-project/app.py)**:
  Complete application implementation:
  ```python
  from flask import Flask

  app = Flask(__name__)

  @app.route("/")
  def home():
      return "Backend Server Running"

  if __name__ == "__main__":
      app.run(debug=True)
  ```

### Breakdown of Implementation Components:
- `Flask(__name__)`: Initializes the core WSGI application instance. The `__name__` argument tells Flask where to locate resources, templates, and static assets.
- `@app.route("/")`: Decorates the `home()` function, instructing Flask to execute it whenever an HTTP GET request arrives at the root path (`/`).
- `def home()`: View function returning a plain text string `"Backend Server Running"`. Flask automatically converts returned strings into valid HTTP responses with `Content-Type: text/html; charset=utf-8` and status code `200 OK`.
- `app.run(debug=True)`: Runs the local Werkzeug HTTP development server bound to `127.0.0.1:5000` with hot-reloading and active debugging.

## 6. Procedure
1. Navigate to the project directory:
   ```bash
   cd Theory/Flask/backend-project
   ```
2. Set up and activate a Python virtual environment:
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
3. Install Flask:
   ```bash
   pip install Flask
   ```
4. Start the Flask application:
   ```bash
   python app.py
   # Or using the Flask CLI:
   # export FLASK_APP=app.py && flask run
   ```
5. Observe terminal output confirming the server is listening:
   ```
   * Serving Flask app 'app'
   * Debug mode: on
   * Running on http://127.0.0.1:5000
   ```
6. Open `http://127.0.0.1:5000/` in a web browser or run cURL:
   ```bash
   curl http://127.0.0.1:5000/
   ```

## 7. Output and Results
- **Terminal Logs**: Confirms WSGI server initialization on port 5000 with debug mode enabled.
- **HTTP Response**:
  - Request: `GET /`
  - Response Code: `200 OK`
  - Response Body: `"Backend Server Running"`
  - Content-Type: `text/html; charset=utf-8`

## 8. Learning Outcomes
- Gained fundamental understanding of Python web application mechanics.
- Learned how Flask leverages Python function decorators for declarative routing.
- Configured local WSGI development environments with live reloading.
- Understood how Python view functions process requests and return HTTP responses.

## 9. Conclusion
Theory Experiment 02 demonstrates how quickly a functional web server can be constructed using Python and Flask. Its simple, unopinionated structure provides an ideal foundation for learning backend concepts and building modular web services.

## 10. Viva Questions
**Q1: What does WSGI stand for and what is its role in Python web applications?**  
**Ans:** WSGI stands for Web Server Gateway Interface. It is a standard specification (PEP 3333) that enables web servers (e.g., Nginx, Apache, Gunicorn) to communicate seamlessly with Python web application frameworks (such as Flask and Django).

**Q2: What is the significance of passing `__name__` to the `Flask` constructor?**  
**Ans:** `__name__` is a Python built-in variable pointing to the current module name. Flask uses it to determine the root path of the application to locate static files and templates relative to the project directory.

**Q3: Why should `debug=True` never be used in a production deployment?**  
**Ans:** Debug mode executes arbitrary code through the interactive browser-based debugger and reveals sensitive environment variables, secret keys, and filesystem structure upon encountering errors, creating a severe security vulnerability.

**Q4: How does Flask convert a returned string into an HTTP response?**  
**Ans:** When a view function returns a string, Flask automatically wraps it inside a `Response` object with an HTTP status code of 200, a MIME type of `text/html; charset=utf-8`, and appropriate content length headers.
