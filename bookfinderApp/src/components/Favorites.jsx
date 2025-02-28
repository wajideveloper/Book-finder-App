import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import {
  Card,
  Image,
  SimpleGrid,
  Text,
  Title,
  Group,
  Center,
  Loader,
  Button,
} from "@mantine/core";
import { motion } from "framer-motion";

const Favorites = () => {
  const { user } = useContext(AuthContext);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
    hover: { scale: 1.05, transition: { duration: 0.3 } },
    tap: { scale: 0.95 },
  };

  useEffect(() => {
    if (user) {
      setLoading(true);
      axios
        .get("http://localhost:8080/api/favorites", {
          headers: { Authorization: `Bearer ${user.token}` },
        })
        .then((res) => setFavorites(res.data))
        .finally(() => setLoading(false));
    }
  }, [user]);

  const removeFavorite = async (id) => {
    await axios.delete(`http://localhost:8080/api/favorites/${id}`, {
      headers: { Authorization: `Bearer ${user.token}` },
    });
    setFavorites(favorites.filter((fav) => fav.id !== id));
  };

  if (!user) return <p>Please log in to view favorites.</p>;

  return (
    <div className="p-6 min-h-screen">
      {loading ? (
        <Center className="min-h-[50vh]">
          <Loader size="lg" />
        </Center>
      ) : favorites.length === 0 ? (
        <Text className="text-center text-gray-500 text-lg">
          No favorites yet.
        </Text>
      ) : (
        <SimpleGrid
          cols={{ base: 1, sm: 2, md: 3 }}
          spacing="lg"
          className="gap-6 max-w-6xl mx-auto"
        >
          {favorites.map((book) => (
            <motion.div
              key={book.id}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              whileTap="tap"
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <Card withBorder radius="md" className="p-0">
                <div className="flex justify-space-between w-full">
                  <div className="w-1/3 min-w-[120px] flex-shrink-0">
                    {/* <Card.Section className="relative"> */}
                    <motion.img
                      src={
                        book.coverImage.startsWith("http")
                          ? book.coverImage
                          : `http://localhost:8080${book.coverImage}`
                      }
                      alt={book.title}
                      className="w-85 h-60 object-cover rounded-t-xl"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1, transition: { duration: 0.5 } }}
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/60x60?text=No+Image";
                      }}
                    />
                    {/* </Card.Section> */}
                  </div>
                  <div className="p-4 flex flex-col justify-between w-2/3">
                    <Title
                      order={3}
                      className="text-lg font-semibold text-gray-800 truncate"
                    >
                      {book.title}
                    </Title>
                    <Text className="text-sm text-gray-600 mt-1">
                      {book.author}
                    </Text>
                    <Button
                      onClick={() => removeFavorite(book.id)}
                      className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition-colors duration-300"
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </SimpleGrid>
      )}
    </div>
  );
};

export default Favorites;
