// const express = require("express");
// const cors = require("cors");
// const bodyParser = require("body-parser");

// const app = express();
// const PORT = 8080;

// // Middleware
// app.use(cors());
// app.use(bodyParser.json());

// const users = [
//   { email: "user@example.com", password: "user123", role: "user" },
//   { email: "admin@example.com", password: "admin123", role: "admin" },
// ];

// app.get("/", (req, res) => {
//   res.send("Hello world");
// });

// // Login Route
// app.post("/login", (req, res) => {
//   const { email, password } = req.body;
//   const user = users.find((u) => u.email === email && u.password === password);

//   if (!user) {
//     return res.status(401).json({ message: "Invalid credentials" });
//   }

//   // Return role in response
//   res.json({ message: "Login successful", role: user.role });
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });
// const express = require("express");
// const cors = require("cors");
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcryptjs");
// const { PrismaClient } = require("@prisma/client");
// const prisma = new PrismaClient();
// const app = express();
// const port = process.env.PORT ? process.env.PORT : 8080;

// app.use(cors({ origin: "*" }));
// app.use(express.json());

// app.get("/test-db", async (req, res) => {
//   try {
//     const users = await prisma.user.findMany();
//     res.json(users);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });
// // Middleware to verify JWT
// const authenticateToken = (req, res, next) => {
//   const token = req.headers["authorization"]?.split(" ")[1];
//   if (!token) return res.status(401).json({ message: "No token provided" });

//   jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//     if (err) return res.status(403).json({ message: "Invalid token" });
//     req.user = user;
//     next();
//   });
// };

// // Auth API
// app.post("/register", async (req, res) => {
//   console.log(req.body);
//   const { email, password } = req.body;
//   const hashedPassword = await bcrypt.hash(password, 10);
//   try {
//     const user = await prisma.user.create({
//       data: { email, password: hashedPassword },
//     });
//     res.status(201).json({ message: "User registered" });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Email already exists" });
//   }
// });

// app.post("/api/auth/login", async (req, res) => {
//   const { email, password } = req.body;
//   const user = await prisma.user.findUnique({ where: { email } });
//   if (!user || !(await bcrypt.compare(password, user.password))) {
//     return res.status(401).json({ message: "Invalid credentials" });
//   }
//   const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
//     expiresIn: "1h",
//   });
//   res.json({ token });
// });

// // Book API (Mock external API with Google Books or static data)
// app.get("/api/books", async (req, res) => {
//   const { search } = req.query;
//   // Simulate fetching from Google Books API
//   const books = [
//     { id: "1", title: "Book Title", author: "Author Name", coverImage: "url" },
//   ].filter((book) => book.title.toLowerCase().includes(search.toLowerCase()));
//   res.json(books);
// });

// app.get("/api/books/:id", async (req, res) => {
//   const { id } = req.params;
//   // Fetch book details (mocked)
//   res.json({
//     id,
//     title: "Book Title",
//     author: "Author Name",
//     coverImage: "url",
//   });
// });

// // Favorites API (Protected)
// app.post("/api/favorites", authenticateToken, async (req, res) => {
//   const { bookId, title, author, coverImage } = req.body;
//   const favorite = await prisma.book.create({
//     data: { id: bookId, title, author, coverImage, userId: req.user.id },
//   });
//   res.status(201).json(favorite);
// });

// app.get("/api/favorites", authenticateToken, async (req, res) => {
//   const favorites = await prisma.book.findMany({
//     where: { userId: req.user.id },
//   });
//   res.json(favorites);
// });

// app.delete("/api/favorites/:id", authenticateToken, async (req, res) => {
//   const { id } = req.params;
//   await prisma.book.delete({ where: { id, userId: req.user.id } });
//   res.status(204).send();
// });

// app.listen(port, () => console.log(`Server running on port ${port}`));
// const express = require("express");
// const cors = require("cors");
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcryptjs");
// const multer = require("multer");
// const { ObjectId } = require("mongodb");
// const { prisma, connectDB } = require("./config/db.config");
// const app = express();
// const port = process.env.PORT || 8080;

// // Multer setup for file uploads
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/");
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });
// const upload = multer({ storage });

// app.use(cors({ origin: "*" }));
// app.use(express.json());
// app.use("/uploads", express.static("uploads"));

// const fs = require("fs");
// if (!fs.existsSync("uploads")) {
//   fs.mkdirSync("uploads");
// }

// connectDB();

// // Middleware to verify JWT
// const authenticateToken = (req, res, next) => {
//   const token = req.headers["authorization"]?.split(" ")[1];
//   if (!token) return res.status(401).json({ message: "No token provided" });
//   jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//     if (err) return res.status(403).json({ message: "Invalid token" });
//     req.user = user;
//     next();
//   });
// };

// // Test Database Connection Endpoint
// app.get("/api/test-db", async (req, res) => {
//   try {
//     const users = await prisma.user.findMany();
//     res.json({ message: "Database connected", users });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // Create Book Endpoint (Protected)
// app.post(
//   "/api/books",
//   authenticateToken,
//   upload.single("coverImage"),
//   async (req, res) => {
//     console.log("Request body:", req.body);
//     console.log("Request file:", req.file);

//     const { title, author } = req.body;
//     const coverImage = req.file ? `/uploads/${req.file.filename}` : null;

//     if (!title || !author || !coverImage) {
//       return res
//         .status(400)
//         .json({ message: "Title, author, and image are required" });
//     }

//     try {
//       const book = await prisma.book.create({
//         data: {
//           id: new ObjectId().toString(), // Generate a valid ObjectID for local books
//           title,
//           author,
//           coverImage,
//           user: {
//             connect: { id: req.user.id },
//           },
//           isFavourite: false,
//         },
//       });
//       res.status(201).json(book);
//     } catch (error) {
//       console.error("Error creating book:", error);
//       res.status(500).json({ message: "Failed to create book" });
//     }
//   }
// );

// // Fetch All Books (Updated to filter non-favorites)
// app.get("/api/books", async (req, res) => {
//   const { search } = req.query;
//   try {
//     const books = await prisma.book.findMany({
//       where: {
//         isFavourite: false, // Only return non-favorite books
//         ...(search
//           ? {
//               OR: [
//                 { title: { contains: search, mode: "insensitive" } },
//                 { author: { contains: search, mode: "insensitive" } },
//               ],
//             }
//           : {}),
//       },
//     });
//     res.json(books);
//   } catch (error) {
//     console.error("Error fetching books:", error);
//     res.status(500).json({ message: "Failed to fetch books" });
//   }
// });

// // Auth API
// app.post("/api/auth/register", async (req, res) => {
//   const { email, password } = req.body;
//   if (!email || !password) {
//     return res.status(400).json({ message: "Email and password are required" });
//   }
//   const hashedPassword = await bcrypt.hash(password, 10);
//   try {
//     const user = await prisma.user.create({
//       data: { email, password: hashedPassword },
//     });
//     res.status(201).json({ message: "User registered", userId: user.id });
//   } catch (error) {
//     console.error("Registration error:", error);
//     res.status(400).json({ message: "Email already exists or database error" });
//   }
// });

// app.post("/api/auth/login", async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const user = await prisma.user.findUnique({ where: { email } });
//     if (!user || !(await bcrypt.compare(password, user.password))) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }
//     const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
//       expiresIn: "1h",
//     });
//     res.json({ token });
//   } catch (error) {
//     res.status(500).json({ message: "Login failed" });
//   }
// });

// // Favorites API (Updated to handle Google Books)
// app.post("/api/favorites", authenticateToken, async (req, res) => {
//   const { bookId, title, author, coverImage } = req.body;

//   console.log(req.body, "in favorites");

//   console.log("Request body in favorite:", req.body);

//   try {
//     // Check if the book already exists
//     let book = await prisma.book.findUnique({
//       where: { id: bookId },
//     });

//     if (!book) {
//       // Create new book if it doesn’t exist
//       book = await prisma.book.create({
//         data: {
//           id: bookId, // Use Google Books ID directly
//           title,
//           author,
//           coverImage, // Store URL directly from Google Books
//           user: {
//             connect: { id: req.user.id },
//           },
//           isFavourite: true,
//         },
//       });
//       return res.status(201).json(book);
//     }

//     // Update existing book to mark as favorite
//     const favorite = await prisma.book.update({
//       where: { id: bookId },
//       data: {
//         isFavourite: true,
//         user: {
//           connect: { id: req.user.id },
//         },
//       },
//     });

//     res.status(201).json(favorite);
//   } catch (error) {
//     console.error("Error adding favorite:", error);
//     res.status(400).json({ message: "Failed to add favorite" });
//   }
// });

// app.get("/api/favorites", authenticateToken, async (req, res) => {
//   try {
//     const favorites = await prisma.book.findMany({
//       where: { userId: req.user.id, isFavourite: true },
//     });
//     res.json(favorites);
//   } catch (error) {
//     res.status(500).json({ message: "Failed to fetch favorites" });
//   }
// });

// app.delete("/api/favorites/:id", authenticateToken, async (req, res) => {
//   const { id } = req.params;
//   try {
//     await prisma.book.update({
//       where: { id },
//       data: {
//         isFavourite: false,
//       },
//     });
//     res.status(204).send();
//   } catch (error) {
//     res.status(400).json({ message: "Failed to delete favorite" });
//   }
// });

// app.listen(port, () => console.log(`Server running on port ${port}`));
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const { connectDB } = require("./config/db.config");
const authRoutes = require("./routes/authRoutes");
const bookRoutes = require("./routes/bookRoutes");
const favoriteRoutes = require("./routes/favoriteRoutes");

const app = express();
const port = process.env.PORT || 8080;

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Create uploads directory if it doesn’t exist
const fs = require("fs");
if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

// Connect to database
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes(upload)); // Pass multer upload middleware
app.use("/api/favorites", favoriteRoutes);

// Start server
app.listen(port, () => console.log(`Server running on port ${port}`));
