import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import {
  Button,
  SimpleGrid,
  Card,
  Text,
  Title,
  Loader,
  Center,
  Pagination,
} from "@mantine/core";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

// Animation variants for cards
const cardVariants = {
  hidden: { opacity: 0, y: 50, rotate: -5 },
  visible: {
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      type: "spring",
      stiffness: 100,
    },
  },
  hover: {
    scale: 1.05,
    boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
    transition: { duration: 0.3, ease: "easeInOut" },
  },
  tap: { scale: 0.95, transition: { duration: 0.2 } },
};

const BookSearch = () => {
  const navigate = useNavigate();
  const booksPerPage = 9;
  const { user, filteredBooks, loading, currentPage, setCurrentPage } =
    useContext(AuthContext);

  const addFavorite = async (book) => {
    if (!user) {
      alert("Please log in to add favorites");
      return;
    }
    try {
      await axios.post(
        "http://localhost:8080/api/favorites",
        {
          bookId: book.id,
          title: book.title,
          author: book.author,
          coverImage: book.coverImage,
        },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
    } catch (error) {
      console.error("Error adding favorite:", error);
      alert("Failed to add to favorites");
    }
  };

  // Pagination logic
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

  return (
    <main className="container mx-auto px-4 py-10 min-h-screen">
      {/* Books Grid */}
      {loading ? (
        <Center className="min-h-[50vh]">
          <Loader size="lg" />
        </Center>
      ) : (
        <>
          <motion.div
            key={currentPage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            // className=" mx-auto"
          >
            <SimpleGrid
              cols={{ base: 1, sm: 2, md: 3 }}
              spacing="xl"
              className="gap-8"
            >
              {currentBooks.map((book, index) => (
                <motion.div
                  key={book.id}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                  whileTap="tap"
                  className="rounded-2xl shadow-md overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300 cursor-pointer flex"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => navigate(`/bookdetails/${book.id}`)}
                >
                  <Card
                    withBorder={false}
                    radius="md"
                    className="p-0 flex w-full"
                  >
                    {/* Image on Left */}
                    <div className="flex justify-space-between w-full">
                      <div className="w-1/3 min-w-[120px] flex-shrink-0">
                        <motion.img
                          src={
                            book.coverImage.startsWith("http")
                              ? book.coverImage
                              : `http://localhost:8080${book.coverImage}`
                          }
                          alt={book.title}
                          className="w-full h-full object-cover rounded-l-2xl"
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{
                            opacity: 1,
                            scale: 1,
                            transition: { duration: 0.5 },
                          }}
                        />
                      </div>

                      {/* Content on Right */}
                      <div className="p-4 flex flex-col justify-between w-2/3">
                        <div>
                          <Title
                            order={4}
                            className="text-lg font-semibold text-gray-800 truncate hover:text-blue-600 transition-colors duration-200"
                          >
                            {book.title}
                          </Title>
                          <Text className="text-sm text-gray-600 mt-1">
                            by {book.author}
                          </Text>
                        </div>

                        {user && (
                          <Button
                            variant="light"
                            color="green"
                            fullWidth
                            radius="md"
                            onClick={(e) => {
                              e.stopPropagation();
                              addFavorite(book);
                            }}
                            className="bg-green-100 text-green-700 hover:bg-green-200 hover:text-green-800 transition-all duration-300 shadow-sm mt-4"
                          >
                            Add to Favorites
                          </Button>
                        )}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </SimpleGrid>
          </motion.div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-10">
              <Pagination
                total={totalPages}
                page={currentPage}
                onChange={setCurrentPage}
                color="blue"
                size="md"
                radius="md"
                className="shadow-sm bg-white p-2 rounded-lg"
              />
            </div>
          )}
        </>
      )}
    </main>
  );
};

export default BookSearch;
