require('dotenv').config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require('body-parser')

const app = express();
const port = process.env.PORT || 3000;

const postsRouter = require("./routes/postRoutes");
const authRoutes = require("./routes/authRoutes");


app.use(cors({
    origin: process.env.ALLOWED_ORIGIN,
    credentials: true,
}));
app.use(bodyParser.json())

app.use("/api/posts", postsRouter);
app.use("/api/auth", authRoutes);


mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("Database connected successfully!")
})
app.listen(port, () => {
    console.log(`application is running on port: ${port}`)
})