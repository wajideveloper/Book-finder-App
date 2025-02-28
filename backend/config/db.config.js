const { PrismaClient } = require("@prisma/client");
require("dotenv").config(); // Load environment variables from .env

// Initialize Prisma Client
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});

// Function to connect to the database (optional, Prisma handles this internally)
const connectDB = async () => {
  try {
    // Prisma connects automatically, but we can test the connection
    await prisma.$connect();
    console.log("Connected to MongoDB successfully");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1); // Exit process if connection fails
  }
};

// Export Prisma client and connect function
module.exports = {
  prisma,
  connectDB,
};
