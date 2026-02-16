# Mini Blog Application

A full-stack Mini Blog application built with:

-   Frontend: React
-   Backend: Node.js + Express
-   Database: MongoDB

------------------------------------------------------------------------

SETUP INSTRUCTIONS

1.  Clone the Repository

git clone `<repository-url>`{=html} cd mini-blog

------------------------------------------------------------------------

2.  Backend Setup

cd server npm install

Create a .env file inside /server:

PORT=5000 MONGO_URI=your_mongodb_connection_string

Run backend:

npm run dev or node server.js

Backend runs on: http://localhost:5000

------------------------------------------------------------------------

3.  Frontend Setup

cd client npm install

Create a .env file inside /client:

VITE_API_BASE_URL=http://localhost:5000/api

Run frontend:

npm run dev

Frontend runs on: http://localhost:5173

------------------------------------------------------------------------

API DOCUMENTATION

Base URL: http://localhost:5000/api

1.  Create Post POST /api/posts

Body: { "title": "My Blog Title", "content": "Blog content here",
"username": "John", "tags": \["react", "node"\] }

------------------------------------------------------------------------

2.  Get All Posts GET /api/posts

------------------------------------------------------------------------

3.  Search Posts GET /api/posts?search=react

------------------------------------------------------------------------

4.  Pagination GET /api/posts?page=1

-   5 posts per page

------------------------------------------------------------------------

5.  Delete Post DELETE /api/posts/:id

------------------------------------------------------------------------

DATABASE SCHEMA

{ title: String, content: String, username: String, tags: \[String\],
createdAt: { type: Date, default: Date.now } }

------------------------------------------------------------------------

NOTES / ASSUMPTIONS

-   Pagination limit is fixed at 5 posts per page
-   Search works on title and tags
-   Tags are stored as an array of strings
-   Posts are sorted by createdAt (newest first)
-   Environment variables are required
-   No authentication system implemented
-   Optimistic UI update is implemented on delete
