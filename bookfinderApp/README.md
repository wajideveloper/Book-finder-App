# Book Finder App - Frontend

This is the frontend codebase for the **Book Finder App**, a React-based web application for discovering, creating, and managing books. It integrates with a backend API and the Google Books API, offering a responsive UI with light/dark mode support.

## Features

- Search books via a navbar-integrated search bar.
- Create custom books with file uploads.
- Manage a favorites list (authenticated users only).
- View detailed book information on a separate page.
- Smooth animations with Framer Motion.

## Tech Stack

- **React**: v19.0.0
- **Mantine UI**: v7.17.0 (Core, Dropzone, Form, Hooks)
- **Tailwind CSS**: v4.0.9
- **Framer Motion**: v12.4.7
- **React Router**: v7.2.0
- **Axios**: v1.8.1
- **React Icons**: v5.5.0

## Project Structure

- **src/components/**:
  - `BookSearch.jsx`: Main search page with book cards.
  - `BookDetails.jsx`: Displays detailed book info.
  - `CreateBooks.jsx`: Form for adding new books.
  - `Favorites.jsx`: Lists user favorites.
  - `Login.jsx`: User login form.
  - `Navbar.jsx`: Navigation bar with search and theme toggle.
  - `PrivateRoute.jsx`: Protects authenticated routes.
  - `Register.jsx`: User registration form.
  - `SearchBar.jsx`: Reusable search bar component.
- **src/context/**:
  - `AuthContext.jsx`: Manages global state (user, theme, books).

## Prerequisites

- **Node.js**: v16 or higher
- **Backend**: Running at `http://localhost:8080` (see `../backend/README.md`)

## Installation

### Option 1: Use Existing Setup

If cloning from GitHub:

1. Navigate to the `frontend/` folder:
   ```bash
   cd frontend
   ```
