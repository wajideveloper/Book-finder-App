#### `backend/README.md`

````markdown
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
````
