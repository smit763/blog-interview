import React, { useState } from "react";
import axios from "../helpers/Axios";

const BlogCard = ({ blogData, onDeleteSuccess }) => {
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this blog?"
    );

    if (!confirmDelete) return;

    try {
      setDeleting(true);

      await axios.delete(`/posts/${blogData._id}`);

      if (onDeleteSuccess) {
        onDeleteSuccess(blogData._id);
      }

    } catch (error) {
      console.log(error);
      alert("Failed to delete blog");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="w-full bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition duration-300 relative">

      {/* Delete Button */}
      <button
        onClick={handleDelete}
        disabled={deleting}
        className="absolute top-4 right-4 text-red-500 hover:text-red-700 font-medium text-sm"
      >
        {deleting ? "Deleting..." : "Delete"}
      </button>

      {/* Title */}
      <h2 className="text-2xl font-bold text-gray-800 mb-2">
        {blogData?.title}
      </h2>

      {/* Author + Date */}
      <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
        <span>By {blogData?.username}</span>
        <span>
          {new Date(blogData?.createdAt).toLocaleDateString()}
        </span>
      </div>

      {/* Content */}
      <p className="text-gray-700 leading-relaxed mb-4">
        {blogData?.content}
      </p>

      {/* Tags */}
      <div className="flex gap-2 flex-wrap">
        {blogData?.tags?.map((tag, index) => (
          <span
            key={index}
            className="bg-blue-100 text-blue-600 px-3 py-1 text-xs rounded-full font-medium"
          >
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default BlogCard;
