import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Card, Text, Title, Button, Center, Loader } from "@mantine/core";
import { motion } from "framer-motion";

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookDetails = async () => {
      setLoading(true);
      try {
        const localRes = await axios.get("http://localhost:8080/api/books");
        const localBook = localRes.data.find((b) => b.id === id);

        if (localBook) {
          setBook(localBook);
        } else {
          const googleRes = await axios.get(
            `https://www.googleapis.com/books/v1/volumes/${id}`
          );
          const normalizeBook = (book) => ({
            id: book.id,
            title: book.volumeInfo.title || "Unknown Title",
            author: book.volumeInfo.authors
              ? book.volumeInfo.authors.join(", ")
              : "Unknown Author",
            coverImage: book.volumeInfo.imageLinks?.thumbnail || "",
            description:
              book.volumeInfo.description || "No description available",
          });
          setBook(normalizeBook(googleRes.data));
        }
      } catch (error) {
        console.error("Error fetching book details:", error);
        setBook(null);
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [id]);

  if (loading) {
    return (
      <Center className="min-h-screen">
        <Loader size="lg" />
      </Center>
    );
  }

  if (!book) {
    return (
      <Center className="min-h-screen">
        <Text>Book not found</Text>
      </Center>
    );
  }

  return (
    <Center className="min-h-screen p-4">
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        className="w-full flex justify-center items-center p-2 m-2"
      >
        <Card shadow="md" radius="md" className=" bg-white w-[1200px] h-full">
          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* Book Image */}
            <div className="w-64 h-100 flex-shrink-0">
              <img
                src={
                  book.coverImage.startsWith("http")
                    ? book.coverImage
                    : `http://localhost:8080${book.coverImage}`
                }
                alt={book.title}
                className="w-full h-full object-cover rounded-md shadow-lg"
              />
            </div>

            {/* Book Details */}
            <div className="flex-1 flex flex-col flex-grow gap-4">
              <Title order={2} className="text-2xl font-bold text-gray-800">
                {book.title}
              </Title>
              <Text className="text-lg text-gray-600 mt-2">
                by <span className="font-medium">{book.author}</span>
                <br />
                <span className="text-2xl font-bold text-gray-800">
                  Detials:
                </span>{" "}
              </Text>

              <Text className="text-gray-700 mt-4 max-h-70 overflow-auto">
                {book.description}
              </Text>

              {/* Back Button */}
              <Button
                color="blue"
                fullWidth
                radius="md"
                onClick={() => navigate(-1)}
                className="mt-4 bg-blue-600 hover:bg-blue-700 transition-all"
              >
                Back
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>
    </Center>
  );
};

export default BookDetails;
