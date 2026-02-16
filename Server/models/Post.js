const mongoose = require("mongoose");
const postSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    content: {
        type: String,
    },
    username: {
        type: String,
    },
    tags: [{
        type: String,
    }]
}, {
    timestamps: true
})

module.exports = mongoose.model("post", postSchema);