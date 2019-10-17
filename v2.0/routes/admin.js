var express = require("express");
var router = express.Router();
var Librarian = require("../models/book");

router.get("/", function(req, res){
    res.redirect("admin/bookList");
});
router.get("/bookList",  function(req, res){

    //get all data from DB
    Librarian.find({}, function(err, allBook){
        if(err){
            console.log(err);
        } else {
            res.render("admin/bookList", {librarians:allBook});
        }
    });
});
module.exports = router;