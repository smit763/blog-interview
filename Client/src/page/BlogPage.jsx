import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import BlogCard from "../components/BlogCard";
import axios from "../helpers/Axios";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const BlogPage = () => {
  const [blogData, setBlogData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const limit = 5; // blogs per page

  const fetchData = async (pageNumber = 1) => {
    try {
      setLoading(true);
      setError("");

      const res = await axios.get(
        `/posts?page=${pageNumber}&limit=${limit}`
      );

      if (res.status === 200) {
        setBlogData(res.data.data);
        setTotalPages(res.data.pagination.totalPages);
      }
    } catch (err) {
      console.log(err);
      setError("Failed to fetch blogs");
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (event, value) => {
    setPage(value);
    fetchData(value);
  };


  useEffect(() => {
    fetchData(page);
  }, []);

  return (
    <>
      <Header callBack={fetchData} />

      <div className="max-w-6xl mx-auto p-6">

        {loading && (
          <div className="text-center text-lg font-semibold">
            Loading blogs...
          </div>
        )}

        {error && (
          <div className="text-center text-red-500 font-semibold">
            {error}
          </div>
        )}

        {!loading && blogData.length === 0 && (
          <div className="text-center text-gray-500">
            No blogs found.
          </div>
        )}

        {/* Blog List */}
        <div className="flex flex-col gap-6 mt-6">
          {blogData.map((blog) => (
            <BlogCard
              key={blog._id}
              blogData={blog}
              onDeleteSuccess={()=>fetchData(blogData.length === 1 ? page-1:page)}
            />
          ))}
        </div>

        {/* Pagination */}
        {!loading && totalPages > 1 && (
          <Stack spacing={2} className="mt-8 items-center">
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              color="primary"
            />
          </Stack>
        )}

      </div>
    </>
  );
};

export default BlogPage;
