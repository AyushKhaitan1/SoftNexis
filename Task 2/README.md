# TaskFlow Lite - Soft Nexis Task 2

A fully modular, client-side task manager built with Vanilla JavaScript.

## Architecture
- **MVC Pattern**: Separates state (localStorage), view (render.js), and controllers (app.js event listeners).
- **Modules**: Utilizes ES6 modules for clean, maintainable file structures.
- **Security**: Custom escapeHTML function to prevent XSS injection attacks from user input.

## Features implemented:
- Full CRUD capabilities.
- LocalStorage Data persistence.
- Dynamic filtering (All / Active / Completed).
- Event Delegation for high-performance DOM manipulation.
- Dark/Light mode toggle.
