var mongoose = require("mongoose");


var librarianSchema = new mongoose.Schema({
    name: String,
    image: String,
    author: String,
    edition: String,
    publisher: String,
    reviews: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "Review"
        }
    ]
});

module.exports = mongoose.model("librarian", librarianSchema);