var mongoose = require("mongoose");

var reviewsSchema = mongoose.Schema({
    author: String,
    text: String
});

module.exports = mongoose.model("Review", reviewsSchema);