import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();
import axios from "axios";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem("user")) || null;
  });
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  // const [allBooks, setAllBooks] = useState([]); // Combined books
  // const [favorites, setFavorites] = useState([]); // Favorites list
  // const [loading, setLoading] = useState(false); // Global loading state
  // const [error, setError] = useState(""); // Global error state
  const [allBooks, setAllBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.className = theme;
  }, [theme]);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const login = (token) => {
    setUser({ token });
  };

  const logout = () => {
    setUser(null);
    setFavorites([]);
    localStorage.removeItem("token");
  };

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  useEffect(() => {
    const fetchInitialBooks = async () => {
      setLoading(true);
      try {
        const localRes = await axios.get("http://localhost:8080/api/books");
        const normalizedLocalBooks = localRes.data.map(normalizeBook);

        const googleRes = await axios.get(
          `https://www.googleapis.com/books/v1/volumes?q=best+books&maxResults=40&key=AIzaSyA6SaT23KNiiA6DnUfUQTvFeyAcQEkwnSU`
        );
        const googleBooks = (googleRes.data.items || []).map(normalizeBook);

        const combinedBooks = [...normalizedLocalBooks, ...googleBooks];
        const uniqueBooks = Array.from(
          new Map(combinedBooks.map((book) => [book.id, book])).values()
        );

        setAllBooks(uniqueBooks);
        setFilteredBooks(uniqueBooks);
      } catch (error) {
        console.error("Error fetching initial books:", error);
      }
      setLoading(false);
    };
    fetchInitialBooks();
  }, []);

  const normalizeBook = (book) => {
    if (book.volumeInfo) {
      return {
        id: book.id,
        title: book.volumeInfo.title || "Unknown Title",
        author: book.volumeInfo.authors
          ? book.volumeInfo.authors.join(", ")
          : "Unknown Author",
        coverImage: book.volumeInfo.imageLinks?.thumbnail || "",
      };
    } else {
      return {
        id: book.id,
        title: book.title || "Unknown Title",
        author: book.author || "Unknown Author",
        coverImage: book.coverImage || "",
      };
    }
  };

  const handleSearchBooks = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=40&key=AIzaSyA6SaT23KNiiA6DnUfUQTvFeyAcQEkwnSU`
      );
      const googleBooks = (res.data.items || []).map(normalizeBook);

      const localRes = await axios.get("http://localhost:8080/api/books");
      const localBooks = localRes.data.map(normalizeBook);

      const combinedBooks = [...localBooks, ...googleBooks];
      const uniqueBooks = Array.from(
        new Map(combinedBooks.map((book) => [book.id, book])).values()
      );

      setAllBooks(uniqueBooks);
      setFilteredBooks(uniqueBooks);
      setError("");
    } catch (err) {
      setError("Failed to search books");
      console.error("Error searching books:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const filtered = allBooks.filter(
      (book) =>
        book.title.toLowerCase().includes(query.toLowerCase()) ||
        book.author.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredBooks(filtered);
    setCurrentPage(1);
  }, [query, allBooks]);

  return (
    <AuthContext.Provider
      value={{
        allBooks,
        setAllBooks,
        filteredBooks,
        setFilteredBooks,
        favorites,
        setFavorites,
        loading,
        setLoading,
        error,
        setError,
        user,
        login,
        logout,
        theme,
        currentPage,
        setCurrentPage,
        toggleTheme,
        setQuery, // Added setQuery
        handleSearchBooks, // Added search handler
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
