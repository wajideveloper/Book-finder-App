const { ObjectId } = require("mongodb");
const { prisma } = require("../config/db.config");

const testDB = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json({ message: "Database connected", users });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createBook = async (req, res) => {
  console.log("Request body:", req.body);
  console.log("Request file:", req.file);

  const { title, author } = req.body;
  const coverImage = req.file ? `/uploads/${req.file.filename}` : null;

  if (!title || !author || !coverImage) {
    return res
      .status(400)
      .json({ message: "Title, author, and image are required" });
  }

  try {
    const book = await prisma.book.create({
      data: {
        id: new ObjectId().toString(),
        title,
        author,
        coverImage,
        user: {
          connect: { id: req.user.id },
        },
        isFavourite: false,
      },
    });
    res.status(201).json(book);
  } catch (error) {
    console.error("Error creating book:", error);
    res.status(500).json({ message: "Failed to create book" });
  }
};

const getBooks = async (req, res) => {
  const { search } = req.query;
  try {
    const books = await prisma.book.findMany({
      where: {
        isFavourite: false,
        ...(search
          ? {
              OR: [
                { title: { contains: search, mode: "insensitive" } },
                { author: { contains: search, mode: "insensitive" } },
              ],
            }
          : {}),
      },
    });
    res.json(books);
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).json({ message: "Failed to fetch books" });
  }
};

module.exports = { testDB, createBook, getBooks };
