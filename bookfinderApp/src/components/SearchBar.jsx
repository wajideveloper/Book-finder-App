import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { TextInput, Button, Group } from "@mantine/core";

const SearchBar = () => {
  const { query, setQuery, handleSearchBooks } = useContext(AuthContext);

  return (
    <Group
      position="center"
      className="flex items-center w-full max-w-md" // Limits width and centers items
      noWrap // Prevents wrapping to ensure button stays on the right
    >
      <TextInput
        placeholder="Search for books..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-grow shadow-sm" // Takes remaining space
        size="md"
        radius="md"
      />
      <Button
        onClick={handleSearchBooks}
        color="blue"
        size="md"
        radius="md"
        className="bg-blue-600 hover:bg-blue-700 transition-colors duration-300"
      >
        Search
      </Button>
    </Group>
  );
};

export default SearchBar;
