import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import axios from "../helpers/Axios"


const CreateBlog = ({ open, setOpen, callBackOnSuccess }) => {
  const [formData, setFormData] = useState({
    title: "",
    username: "",
    content: "",
  });

  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    if (!loading) {
      setOpen(false);
    }
  };

  // Handle text field change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Add tag
  const handleAddTag = (e) => {
    if (e.key === "Enter" && tagInput.trim() !== "") {
      e.preventDefault();

      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }

      setTagInput("");
    }
  };

  // Remove tag
  const handleDeleteTag = (tagToDelete) => {
    setTags(tags.filter((tag) => tag !== tagToDelete));
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.username || !formData.content) {
      alert("All fields are required");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        ...formData,
        tags,
      };

      const res = await axios.post("/posts", payload);

      await callBackOnSuccess()

      // Reset form
      setFormData({
        title: "",
        username: "",
        content: "",
      });
      setTags([]);
      setTagInput("");

      setOpen(false);

    } catch (error) {
      console.error(error);
      alert(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Create Blog</DialogTitle>

      <form
        onSubmit={handleSubmit}
        className="min-w-[500px] p-3 pt-0 flex flex-col gap-4"
      >
        
        <TextField
          label="User Name"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
          fullWidth
        />

        <TextField
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          fullWidth
        />

        <TextField
          label="Content"
          name="content"
          value={formData.content}
          onChange={handleChange}
          multiline
          rows={4}
          required
          fullWidth
        />

        {/* Tags Input */}
        <TextField
          label="Add Tag (Press Enter)"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          onKeyDown={handleAddTag}
          fullWidth
        />

        {/* Tags Display */}
        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
          {tags.map((tag, index) => (
            <Chip
              key={index}
              label={tag}
              onDelete={() => handleDeleteTag(tag)}
            />
          ))}
        </Box>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="contained"
          disabled={loading}
          sx={{ mt: 2 }}
        >
          {loading ? <CircularProgress size={24} /> : "Create Blog"}
        </Button>
      </form>
    </Dialog>
  );
};

export default CreateBlog;
