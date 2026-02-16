# 📝 Mini Blog Application

A full-stack Mini Blog application built with:

-   Frontend: React\
-   Backend: Node.js + Express\
-   Database: MongoDB\
-   ODM: Mongoose

This project allows users to create, view, search, paginate, and delete
blog posts.

------------------------------------------------------------------------

# 🚀 Features

## ✅ Backend (Node.js + Express + MongoDB)

### API Endpoints

  Method   Endpoint                 Description
  -------- ------------------------ ------------------------------------
  POST     /api/posts               Create a new blog post
  GET      /api/posts               Fetch all blog posts
  GET      /api/posts?search=term   Search blog posts by title or tags
  GET      /api/posts?page=1        Paginate blog posts (5 per page)
  DELETE   /api/posts/:id           Delete a blog post by ID

------------------------------------------------------------------------

### 📦 Mongoose Schema

``` js
{
  title: String,
  content: String,
  username: String,
  tags: [String],
  createdAt: {
    type: Date,
    default: Date.now
  }
}
```

------------------------------------------------------------------------

## 📁 Project Structure

mini-blog/ ├── client/ \# React frontend └── server/ \# Node/Express
backend

------------------------------------------------------------------------

### 🖥️ Backend Structure (/server)

/server ├── controllers/ │ └── postController.js ├── models/ │ └──
Post.js ├── routes/ │ └── postRoutes.js ├── config/ │ └── db.js ├──
middleware/ │ └── errorHandler.js ├── server.js

------------------------------------------------------------------------

## 🎨 Frontend (React)

### Features

-   Create blog post form:
    -   Title
    -   Content
    -   Username
    -   Tags
-   Display all blog posts
-   Show:
    -   Title
    -   Content
    -   Author
    -   Tags
    -   Created Date
    -   Delete Button
-   Search posts
-   Pagination (5 per page)
-   Optimistic UI update on delete
-   Loading & error states
-   Form validation
-   Form clears after successful submit
-   API Base URL using .env

------------------------------------------------------------------------

# 🛠️ Installation Guide

## 1️⃣ Clone the Repository

git clone `<repository-url>`{=html} cd mini-blog

------------------------------------------------------------------------

## 2️⃣ Backend Setup

cd server npm install

Create .env file inside /server

PORT=5000 MONGO_URI=your_mongodb_connection_string

Run Backend

npm run dev or node server.js

Server runs on: http://localhost:5000

------------------------------------------------------------------------

## 3️⃣ Frontend Setup

cd client npm install

Create .env inside /client

VITE_API_BASE_URL=http://localhost:5000/api

Run Frontend

npm run dev

Frontend runs on: http://localhost:5173

------------------------------------------------------------------------

# 🔍 API Examples

### ➕ Create Post

POST /api/posts

Body:

{ "title": "My First Blog", "content": "This is the content",
"username": "John", "tags": \["react", "node"\] }

------------------------------------------------------------------------

### 📄 Get Posts (Paginated)

GET /api/posts?page=1

------------------------------------------------------------------------

### 🔎 Search Posts

GET /api/posts?search=react

------------------------------------------------------------------------

### ❌ Delete Post

DELETE /api/posts/:id

------------------------------------------------------------------------

# 🧠 Bonus Implementations

-   Optimistic UI update
-   Search by title or tags
-   Pagination (5 per page)
-   Loading states
-   Error handling middleware
-   Environment variables configuration

------------------------------------------------------------------------

# 🧩 Technologies Used

### Backend

-   Node.js
-   Express.js
-   MongoDB
-   Mongoose

### Frontend

-   React
-   Axios
-   useState & useEffect

------------------------------------------------------------------------

# 📌 Future Improvements

-   User authentication
-   Edit post feature
-   Like & comment system
-   Rich text editor
-   Deployment (Render / Vercel / MongoDB Atlas)

------------------------------------------------------------------------

# 👨‍💻 Author

Mini Blog Project -- Full Stack Implementation
