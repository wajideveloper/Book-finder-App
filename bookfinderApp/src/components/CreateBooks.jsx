import React, { useContext } from "react";
import { useForm } from "@mantine/form";
import {
  TextInput,
  Button,
  Group,
  Title,
  Paper,
  FileInput,
  Text,
  Center,
} from "@mantine/core";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const CreateBooks = () => {
  const navigate = useNavigate();
  const { user, setAllBooks, setError } = useContext(AuthContext);

  if (!user || !user.token) {
    navigate("/login");
    return null;
  }

  const form = useForm({
    initialValues: {
      title: "",
      author: "",
      coverImage: null,
    },
    validate: {
      title: (value) => (value.length < 1 ? "Title is required" : null),
      author: (value) => (value.length < 1 ? "Author is required" : null),
      coverImage: (value) => (!value ? "Image is required" : null),
    },
  });

  const handleSubmit = async (values) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("author", values.author);
    formData.append("coverImage", values.coverImage);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/books",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      console.log("Book created:", response.data);
      setAllBooks((prev) => [...prev, response.data]); // Update global books state
      setError("");
      navigate("/");
    } catch (error) {
      console.error(
        "Error creating book:",
        error.response?.data || error.message
      );
      setError(error.response?.data?.message || "Failed to create book");
      form.setErrors({
        submit: error.response?.data?.message || "Failed to create book",
      });
    }
  };

  return (
    <Center style={{ minHeight: "100vh", padding: "20px" }}>
      <Paper
        shadow="md"
        p="lg"
        radius="md"
        style={{ maxWidth: 500, width: "100%" }}
      >
        <Title order={2} align="center" mb="lg" className="text-black">
          Add a New Book
        </Title>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            className="text-gray-600"
            label="Book Title"
            placeholder="Enter book title"
            required
            mb="md"
            {...form.getInputProps("title")}
          />
          <TextInput
            className="text-gray-600"
            label="Author"
            placeholder="Enter author name"
            required
            mb="md"
            {...form.getInputProps("author")}
          />
          <FileInput
            className="text-gray-600"
            label="Cover Image"
            placeholder="Upload book cover"
            accept="image/*"
            required
            mb="md"
            {...form.getInputProps("coverImage")}
          />
          {form.errors.submit && (
            <Text color="red" size="sm" mb="md">
              {form.errors.submit}
            </Text>
          )}
          <Group position="center">
            <Button type="submit" color="blue" fullWidth>
              Create Book
            </Button>
          </Group>
        </form>
      </Paper>
    </Center>
  );
};

export default CreateBooks;
