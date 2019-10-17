var express = require("express");
var router = express.Router();
var passport = require("passport")
var User = require("../models/user");

//menampilkan halaman form dari register.ejs pada halaman localhost:3000/register/new
router.get("/register/new",function(req, res){
    res.render("register");
});

//memPOST data yg disubmit di form register ke database
router.post("/register", function(req, res){
	var newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password, function(err, user){
		if(err){
			console.log(err);
			return res.render("register");
		}
		passport.authenticate("local")(req, res, function(){
			res.redirect("/book");
		});
	});
});

//menampilkan form dari login.ejs di halaman localhost:3000/login
router.get("/login",function(req, res){
    res.render("login");
});

//middleware: code yg jalan sblm callback function
router.post("/login", passport.authenticate("local", {
		successRedirect: "/book",
		failureRedirect: "/login"
	}));

// logout route
router.get("/logout", function(req, res){
	req.logout();
	res.redirect("/book");
});

module.exports = router;