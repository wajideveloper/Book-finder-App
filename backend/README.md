# Book Finder App - Backend

This is the backend codebase for the **Book Finder App**, a Node.js/Express server that provides API endpoints for book management, user authentication, and file uploads. It uses Prisma with MongoDB for data persistence.

## Features

- **Authentication**: User registration and login with JWT.
- **Books**: CRUD operations for books (create, read).
- **Favorites**: Manage user favorites (create, read, delete).
- **File Uploads**: Handle cover image uploads via Multer.

## Tech Stack

- **Node.js/Express**: v4.21.2
- **Prisma**: v6.4.1 (ORM)
- **MongoDB**: v6.13.1 (database)
- **JWT**: v9.0.2 (authentication)
- **Bcryptjs**: v3.0.2 (password hashing)
- **Multer**: v1.4.5-lts.1 (file uploads)
- **CORS**: v2.8.5
- **Body-parser**: v1.20.3

## Project Structure

- **config/**:
  - `db.config.js`: Database connection setup with Prisma.
- **controllers/**:
  - `authController.js`: Handles authentication logic.
  - `bookController.js`: Manages book CRUD operations.
  - `favoriteController.js`: Manages favorites CRUD operations.
- **middleware/**:
  - `authMiddleware.js`: JWT authentication middleware.
- **prisma/**:
  - `schema.prisma`: Database schema for Prisma.
- **routes/**:
  - `authRoutes.js`: Authentication API routes.
  - `bookRoutes.js`: Book API routes.
  - `favoriteRoutes.js`: Favorites API routes.
- **server.js**: Main Express server file.
- **.env**: Environment variables (not tracked in Git).

## Prerequisites

- **Node.js**: v16 or higher
- **MongoDB**: Local instance or MongoDB Atlas

## Installation

### Option 1: Use Existing Setup

If cloning from GitHub:

1. Navigate to the `backend/` folder:
   ```bash
   cd backend
   ```

### Project Setup

This backend is built using Node.js and Express, with MongoDB for database management and Prisma for ORM.

## Clone the repository:

```bash
git clone https://github.com/wajideveloper/Book-finder-App.git
```

## cd backend

## Install dependencies:

```bash
npm install
```

## Setup Prisma:

```bash
npx prisma generate
```

## Create a .env file and add the required environment variables:

```bash
DATABASE_URL="mongodb+srv://wajid_gis42540:mongodb42540@cluster0.xxlmy.mongodb.net/book-finder?retryWrites=true&w=majority&appName=Cluster0"
PORT=8080
JWT_SECRET='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3YzAzOTM0MjJhZTlmNDFlODc0ZGE3MyIsImlhdCI6MTc0MDY1MTkzNiwiZXhwIjoxNzQwNjU1NTM2fQ.TY-q6JJFWZpoaQQQv5AHPSEIcEFlv35yNsoNxHJCZnc'
```

Ensure MongoDB is running before starting the server.

## Start the development server:

```bash
npm run start:dev
```

## To run in production mode:

```bash
npm start
```

## Server Information

Server runs at: http://localhost:8080

## API Endpoints

## Auth:

- POST /api/auth/register - Register a user.

- POST /api/auth/login - Login a user.

- GET /api/books - Fetch all books.

- POST /api/books - Create a book (authenticated).

## Favorites:

- GET /api/favorites - Fetch user favorites (authenticated).

- POST /api/favorites - Add a favorite (authenticated).

- DELETE /api/favorites/:id - Remove a favorite (authenticated).

## Notes

- The frontend expects the backend at http://localhost:8080.

## ontributing

See the root README.md for contribution guidelines.

```

```
