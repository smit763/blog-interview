const Post = require("../models/Post");
const mongoose = require("mongoose");
exports.createBlog = async (req, res) => {
    try {
        const { title, content, username, tags } = req.body;

        // 🔎 Validation
        if (!title || title.trim() === "") {
            return res.status(400).json({ message: "Title is required" });
        }

        const newPost = new Post({
            title: title.trim(),
            content,
            username,
            tags
        });

        const savedPost = await newPost.save();

        res.status(201).json({
            success: true,
            data: savedPost
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

exports.getAllBlogs = async (req, res) => {
    try {
        // 🔹 Get page & limit from query
        let page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 5;

        // 🔹 Prevent negative values
        if (page < 1) page = 1;
        if (limit < 1) limit = 5;

        const skip = (page - 1) * limit;

        // 🔹 Get total count
        const totalBlogs = await Post.countDocuments();

        // 🔹 Fetch paginated data
        const blogs = await Post.find()
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const totalPages = Math.ceil(totalBlogs / limit);

        res.status(200).json({
            success: true,
            pagination: {
                currentPage: page,
                totalPages,
                totalBlogs,
                hasNextPage: page < totalPages,
                hasPrevPage: page > 1,
            },
            data: blogs
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};



exports.deleteBlog = async (req, res) => {
    try {
        const { id } = req.params;

        // 🔎 ID Validation
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid Blog ID" });
        }

        const deletedBlog = await Post.findByIdAndDelete(id);

        if (!deletedBlog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        res.status(200).json({
            success: true,
            message: "Blog deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
