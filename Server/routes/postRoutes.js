const express = require("express");
const { createBlog, getAllBlogs, deleteBlog } = require("../controllers/postController");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");


router.post("/", createBlog)
router.get("/", getAllBlogs)
router.delete("/:id", deleteBlog)


module.exports = router;