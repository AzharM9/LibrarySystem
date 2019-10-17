var express = require("express"),
    router = express.Router(),
    Librarian = require("../models/book");

//menampilkan index.ejs di localhost:3000/home
router.get("/",function(req, res){

    //get all data from DB
    Librarian.find({}, function(err, allBook){
        if(err){
            console.log(err);
        } else {
            res.render("index", {librarians:allBook});
        }
    });
    
});

// //pagination -> masih testing dan blm bisa dipakai
// router.get("/home/:page", async (req, res, next) => {
// 	const resPerPage = 4;
// 	const page = req.params.page || 1;
	
// 	try {
// 		const foundBook = await Book.find({})
//       	.skip((resPerPage * page) - resPerPage)
//       	.limit(resPerPage);
		
// 		res.render("index", { 
// 			book: foundBook,
// 			currentPage: page
// 			});
		
// 	} catch(err) {
// 		throw new Error(err);
// 	}
// });

//menampilkan halaman form addBook.ejs di address localhost:3000/book/new
router.get("/new", function(req, res) {
    res.render("book/addBook");
});

//memPOST data yg di submit di form addBook ke database
router.post("/", function(req, res){
    var name = req.body.username,
        image = req.body.image,
        author = req.body.author,
        edition = req.body.edition,
        publisher = req.body.publisher,
        newLibrarian = {name: name, image: image, author:author,
        edition: edition, publisher: publisher};
    Librarian.create(newLibrarian, function(err, newlyCreated){
         if(err){
             console.log(err);
         } else {
             res.redirect("/admin");
         }
    });
});

//menarik data detail buku apabila mengklik "More info"
router.get("/:id", function(req, res) {
    Librarian.findById(req.params.id).populate("reviews").exec(function(err, foundBook){
        if(err){
            console.log(err);
        } else {
            res.render("book/bookDetail", {librarians: foundBook});
        }
    });
});

//DESTROY ROUTES
router.delete("/:id", function(req, res){
    Librarian.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/admin");
        } else {
            res.redirect("/admin");
        }
    });
});
module.exports = router;