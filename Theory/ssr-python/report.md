# Theory Experiment 05: Server-Side Rendering (SSR) with FastAPI and Jinja2

## 1. Aim
To design and implement a Server-Side Rendered (SSR) web application using Python, the FastAPI framework, and the Jinja2 template engine, demonstrating how dynamic HTML documents are compiled on the server before client transmission.

## 2. Objectives
- To understand the architectural distinction between Client-Side Rendering (CSR) and Server-Side Rendering (SSR).
- To configure Jinja2 template directory resolution within FastAPI using `Jinja2Templates`.
- To inject dynamic Python runtime data contexts (`name: "Aarav"`) into Jinja2 template variables.
- To handle incoming HTTP requests using Starlette `Request` objects required by FastAPI template responses.
- To execute and serve HTML pages via the Uvicorn ASGI server.

## 3. Requirements
- **Language**: Python (v3.8 or higher)
- **Web Framework**: FastAPI
- **Template Engine**: Jinja2 (`jinja2`)
- **ASGI Web Server**: Uvicorn (`uvicorn`)
- **Configuration**: Listed in `requirements.txt`
- **Tools**: Visual Studio Code, Web Browser, Terminal / CLI

## 4. Theory
Web rendering architectures dictate where HTML markup is assembled:

1. **Server-Side Rendering (SSR) vs Client-Side Rendering (CSR)**:
   - In *Client-Side Rendering (CSR)*, the server transmits a minimal HTML shell along with JavaScript bundles. The client browser executes JavaScript to fetch data via APIs and constructs the DOM dynamically.
   - In *Server-Side Rendering (SSR)*, the server compiles the template together with backend data directly into a complete HTML string and transmits the fully rendered page to the browser.
2. **Advantages of SSR**:
   - *Faster First Contentful Paint (FCP)*: The browser can render the document immediately upon receipt without waiting for client-side JavaScript execution or supplementary API fetches.
   - *Search Engine Optimization (SEO)*: Search engine crawlers receive complete, populated HTML content directly.
3. **FastAPI & Jinja2 Integration**:
   FastAPI leverages Starlette's `Jinja2Templates` utility. In FastAPI, `templates.TemplateResponse` requires passing the active `Request` instance within the context dictionary so that template helper functions (like `url_for`) can resolve absolute paths.

## 5. Implementation
The project files reside in `Theory/ssr-python/`:
- **[requirements.txt](file:///Users/anujsharma/Desktop/Backend/Backend-Development/Theory/ssr-python/requirements.txt)**:
  ```text
  fastapi
  jinja2
  uvicorn
  ```
- **[templates/home.html](file:///Users/anujsharma/Desktop/Backend/Backend-Development/Theory/ssr-python/templates/home.html)**:
  HTML template containing title and heading:
  ```html
  <!DOCTYPE html>
  <html>
  <head>
    <title>SSR Demo</title>
  </head>
  <body>
    <h1>Hello, Aarav!</h1>
  </body>
  </html>
  ```
- **[main.py](file:///Users/anujsharma/Desktop/Backend/Backend-Development/Theory/ssr-python/main.py)**:
  FastAPI server configuring Jinja2 and dispatching the home route:
  ```python
  from fastapi import FastAPI
  from fastapi.responses import HTMLResponse
  from fastapi.templating import Jinja2Templates
  from starlette.requests import Request
  import uvicorn

  app = FastAPI()
  templates = Jinja2Templates(directory="templates")

  @app.get("/", response_class=HTMLResponse)
  def home(request: Request):
      return templates.TemplateResponse("home.html", {
          "request": request,
          "name": "Aarav"
      })

  if __name__ == "__main__":
      uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
  ```

## 6. Procedure
1. Navigate to the project directory:
   ```bash
   cd Theory/ssr-python
   ```
2. Create and activate a Python virtual environment:
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
3. Install dependencies from `requirements.txt`:
   ```bash
   pip install -r requirements.txt
   ```
4. Start the application:
   ```bash
   python main.py
   # Or using uvicorn directly:
   # uvicorn main:app --host 127.0.0.1 --port 8000 --reload
   ```
5. Open your web browser and navigate to:
   ```
   http://127.0.0.1:8000/
   ```
6. Right-click the page and select **View Page Source** (or press `Cmd+Option+U` / `Ctrl+U`) to confirm that the HTML delivered over the network already contains the rendered content (`<h1>Hello, Aarav!</h1>`).

## 7. Output and Results
- **Terminal Execution**:
  Uvicorn starts and displays:
  ```
  INFO:     Started server process [PID]
  INFO:     Waiting for application startup.
  INFO:     Application startup complete.
  INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)
  ```
- **Browser Output**:
  - Page Title: `SSR Demo`
  - Body Content: `Hello, Aarav!`
  - Header: `Content-Type: text/html; charset=utf-8`
- **Network Verification**:
  cURL inspection confirms complete HTML is transmitted directly:
  ```bash
  curl -i http://127.0.0.1:8000/
  ```

## 8. Learning Outcomes
- Understood the core concepts and operational benefits of Server-Side Rendering.
- Configured Jinja2 templating with FastAPI and Starlette.
- Learned the requirement of passing the `Request` object into Jinja2 context dictionaries.
- Verified how SSR improves page load performance and SEO friendliness.

## 9. Conclusion
Theory Experiment 05 demonstrates server-side rendering in Python using FastAPI and Jinja2. The experiment proves that FastAPI is not only adept at building high-speed JSON APIs, but also fully capable of rendering full dynamic HTML templates for web applications.

## 10. Viva Questions
**Q1: Why is `request: Request` mandatory in the context dictionary passed to `templates.TemplateResponse()`?**  
**Ans:** Starlette's `Jinja2Templates` requires the `request` instance in the template context to correctly build URLs (via `url_for`), manage CSRF tokens, and read request-specific headers or cookies during template evaluation.

**Q2: What is the primary difference between how Jinja2 renders templates and how React/Vue render web pages?**  
**Ans:** Jinja2 compiles templates on the server before transmitting finished HTML to the browser (SSR), whereas standard React/Vue apps send a JavaScript bundle to the browser which renders the DOM on the client's machine (CSR).

**Q3: What template tags does Jinja2 use for variable interpolation and control structures?**  
**Ans:** Jinja2 uses `&#123;&#123; variable &#125;&#125;` for outputting expressions and variables, `&#123;% for ... %&#125;` or `&#123;% if ... %&#125;` for control logic, and `&#123;# comment #&#125;` for template comments.

**Q4: How does FastAPI specify that an endpoint returns HTML rather than default JSON?**  
**Ans:** By specifying `response_class=HTMLResponse` in the route decorator, which sets the `Content-Type` header to `text/html`.
