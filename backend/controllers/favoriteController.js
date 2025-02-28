const { prisma } = require("../config/db.config");

const addFavorite = async (req, res) => {
  const { bookId, title, author, coverImage } = req.body;

  console.log("Request body in favorite:", req.body);

  try {
    let book = await prisma.book.findUnique({
      where: { id: bookId },
    });

    if (!book) {
      book = await prisma.book.create({
        data: {
          id: bookId,
          title,
          author,
          coverImage,
          user: {
            connect: { id: req.user.id },
          },
          isFavourite: true,
        },
      });
      return res.status(201).json(book);
    }

    const favorite = await prisma.book.update({
      where: { id: bookId },
      data: {
        isFavourite: true,
        user: {
          connect: { id: req.user.id },
        },
      },
    });

    res.status(201).json(favorite);
  } catch (error) {
    console.error("Error adding favorite:", error);
    res.status(400).json({ message: "Failed to add favorite" });
  }
};

const getFavorites = async (req, res) => {
  try {
    const favorites = await prisma.book.findMany({
      where: { userId: req.user.id, isFavourite: true },
    });
    res.json(favorites);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch favorites" });
  }
};

const removeFavorite = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.book.update({
      where: { id },
      data: {
        isFavourite: false,
      },
    });
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ message: "Failed to delete favorite" });
  }
};

module.exports = { addFavorite, getFavorites, removeFavorite };
