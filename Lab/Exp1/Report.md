# Experiment 01: Web Page Design with HTML5 Elements

## 1. Aim
To design and implement a comprehensive web page demonstrating the semantic structure, text formatting, lists, tables, navigation, and form elements available in HTML5.

## 2. Objectives
- To understand and implement semantic HTML5 layout containers (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`).
- To create and format ordered (`<ol>`), unordered (`<ul>`), and description (`<dl>`) lists.
- To design structured tabular layouts using `<table>`, `<thead>`, `<tbody>`, `<tr>`, `<th>`, and `<td>` for schedules and student records.
- To construct an interactive user contact form containing diverse input elements including text fields, email fields, radio buttons, checkboxes, text areas, and submission controls.
- To implement in-page anchor navigation links (`href="#id"`).

## 3. Requirements
- **Language / Standards**: HTML5
- **Editor**: Visual Studio Code / Any standard text editor
- **Environment**: Any modern web browser (Google Chrome, Mozilla Firefox, Microsoft Edge, Safari)
- **External Dependencies**: None (native HTML5 implementation)

## 4. Theory
HTML5 is the standard markup language for documents designed to be displayed in a web browser. Key concepts demonstrated include:

- **Semantic Layout**: HTML5 introduces tags that clearly describe their meaning to both the browser and the developer. Tags such as `<header>`, `<nav>`, `<main>`, `<section>`, and `<footer>` replace generic `<div>` containers, improving code readability, search engine optimization (SEO), and accessibility for assistive technologies.
- **Document Navigation**: Internal hyperlinks using the anchor tag `<a>` with fragment identifiers (`href="#section-id"`) allow quick jumping between sections on the same page.
- **Lists**:
  - *Ordered List (`<ol>`)*: Represents items where order is significant (e.g., subject priority).
  - *Unordered List (`<ul>`)*: Represents collections where order does not matter.
  - *Description List (`<dl>`)*: Pairs terms (`<dt>`) with corresponding descriptions (`<dd>`), ideal for glossaries or metadata.
- **Tables**: Used for structured, two-dimensional data display. Utilizing `<thead>`, `<tbody>`, column headers (`<th>`), and data cells (`<td>`) ensures proper tabular data representation.
- **Forms**: Forms collect user input and transmit data to a backend handler. Form controls demonstrate input constraints, labeling, selection states (radio and checkbox), multi-line text input (`<textarea>`), and form submission (`<button type="submit">`).

## 5. Implementation
The experiment is implemented in a single standalone file: [index.html](file:///Users/anujsharma/Desktop/Backend/Backend-Development/Lab/Exp1/index.html).

### Structure and Components:
1. **Header & Navigation Bar (`<header>`, `<nav>`)**:
   Contains top-level heading "Student Information" and internal navigation anchors linking to `#home`, `#subjects`, `#timetable`, and `#contact`.
2. **Main Content Container (`<main>`)**:
   Encloses distinct `<section>` components:
   - **Welcome Section (`#home`)**: Introduces the web page and its purpose.
   - **Subjects Section (`#subjects`)**:
     - Ordered list of core computer science subjects (Data Structures, DBMS, OS, Computer Networks).
     - Unordered list of web technologies (HTML, CSS, JavaScript, React).
     - Description list defining HTML, CSS, and JavaScript.
   - **Class Timetable Section (`#timetable`)**: Tabular representation of weekly classes across time slots (9:00 AM, 10:00 AM, 11:00 AM) for Monday, Tuesday, and Wednesday.
   - **Student Details Section**: Tabular representation of student records displaying Name, Roll No., Course, and Marks.
   - **Contact Form Section (`#contact`)**: Interactive form collecting:
     - `name` (text input)
     - `email` (email input)
     - `gender` (radio inputs for Male/Female)
     - `skills` (checkboxes for HTML, CSS, JavaScript)
     - `message` (multi-line textarea)
     - `submit` (button control)
3. **Footer (`<footer>`)**:
   Contains copyright information and document metadata.

### Core Code Snippet:
```html
<!-- Table Structure from Lab/Exp1/index.html -->
<table border="1">
    <thead>
        <tr>
            <th>Day</th>
            <th>9:00 AM</th>
            <th>10:00 AM</th>
            <th>11:00 AM</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Monday</td>
            <td>DBMS</td>
            <td>OS</td>
            <td>DSA</td>
        </tr>
        ...
    </tbody>
</table>
```

## 6. Procedure
1. Navigate to the experiment directory:
   ```bash
   cd Lab/Exp1
   ```
2. Open [index.html](file:///Users/anujsharma/Desktop/Backend/Backend-Development/Lab/Exp1/index.html) in any web browser:
   - **macOS**: `open index.html`
   - **Linux**: `xdg-open index.html`
   - **Windows**: `start index.html`
   - Or directly double-click `index.html` from the file explorer.
3. Test navigation by clicking on the links in the header navigation bar to jump to corresponding sections.
4. Interact with the form by filling out the name, selecting gender and skills, typing a message, and clicking the Submit button.

## 7. Output and Results
- **Page Header**: Displays "Student Information" alongside functional navigation links.
- **Lists**: Renders numbered numbers (1–4), bullet points, and indented definition pairs.
- **Timetable & Records**: Renders two bordered tables displaying the schedule matrix and student marks accurately.
- **Form**: Displays form inputs with operational radio toggling, multi-checkbox selection, and textarea input.
- **Live Output Link**: The page can be viewed directly online at `https://anujsharma32.github.io/Backend-Development/Lab/Exp1/`.

## 8. Learning Outcomes
- Demonstrated proficiency in organizing web content using HTML5 semantic elements.
- Understood the appropriate use cases for ordered, unordered, and description lists.
- Learned how to structure complex tabular information using standard table tags.
- Gained practical knowledge of user input collection and validation mechanisms using HTML5 form controls.

## 9. Conclusion
Experiment 01 successfully validates the implementation of standard HTML5 semantic elements, data structures (lists and tables), and input collection mechanisms in a clean, standards-compliant web page without external dependencies.

## 10. Viva Questions
**Q1: What are semantic HTML elements and why are they preferred over generic `<div>` tags?**  
**Ans:** Semantic elements (such as `<header>`, `<article>`, `<section>`, `<footer>`) clearly describe their meaning to the browser and developer. They improve search engine accessibility, screen reader navigation, and code maintainability compared to non-semantic `<div>` containers.

**Q2: What is the difference between `<ol>`, `<ul>`, and `<dl>`?**  
**Ans:** `<ol>` defines a numbered list where order is meaningful; `<ul>` defines a bulleted list where order is arbitrary; `<dl>` defines a description list consisting of term (`<dt>`) and description (`<dd>`) pairs.

**Q3: Why are `<label>` elements important in HTML forms?**  
**Ans:** `<label>` tags provide textual context for form controls, improve accessibility for screen readers, and increase the clickable hit area for smaller controls like radio buttons and checkboxes.

**Q4: How does the `border="1"` attribute in HTML tables relate to modern CSS styling?**  
**Ans:** In HTML5, presentational attributes like `border` are legacy/deprecated in favor of CSS properties (`border`, `border-collapse`), though browsers continue to support them for backwards compatibility.