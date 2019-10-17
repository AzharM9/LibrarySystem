//Include package biar bisa pakai methodnya
var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
	User		= require("./models/user"),
	Librarian	= require("./models/book"),
	Review		= require("./models/review"),
	passport	= require("passport"),
	mongoPaging = require("mongo-cursor-pagination"),
	LocalStrategy = require("passport-local"),
	methodOverride  = require("method-override"),
	passportLocalMongoose = require("passport-local-mongoose");
	

	var bookRoutes = require("./routes/books");
	var indexRoutes = require("./routes/index");
	var adminRoutes = require("./routes/admin");

app.use(require("express-session")({
    secret: "testing session",
    resave: false,
    saveUninitialized: false
}));

//Connect ke MongoDB
mongoose.connect("mongodb://localhost/librarian", { 
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindAndModify: false
	}, function(err,res){
		if(err){
			console.log(err);
		} else {
			console.log("Connected to DB!");
		}
});

//agar bisa menarik data menggunakan req. di method ketika memPOST data
app.use(bodyParser.urlencoded({extended: true}));

//mereserve folder public untuk file .css agar tak perlu menyertakan address lengkap file cssnya
app.use(express.static("public"));

//agar file .ejs ketika di .render() tidak perlu ditulis .ejs nya lagi
app.set("view engine", "ejs");

//agar bisa update & delete
app.use(methodOverride("_method"));

app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	next();
 });

//agar buka localhost:3000 langsung redirect ke localhost:3000/home
app.get("/", function(req, res) {
    res.redirect("/book");
});

app.use("/book", bookRoutes);
// app.use("/book/:id")
app.use("/", indexRoutes);
app.use("/admin", adminRoutes);

//COMMENT ROUTES
app.get("/book/:id/reviews/new", function(req, res){
	//find book by ID
	Librarian.findById(req.params.id, function(err, librarian){
		if(err){
			console.log(err);
		} else {
			res.render("review/addReview", {librarian: librarian});
		}
	});
	
});

app.post("book/:id/reviews", function(req, res){
	Librarian.findById(req.params.id, function(err, librarian){
		if(err){
			console.log(err);
			res.redirect("/book");
		} else {
			Review.create(req.body.review, function(err, review){
				if(err){
					console.log(err);
				} else {
					librarian.reviews.push(review);
					librarian.save();
					res.redirect("/book/" + librarian._id);
				}
			});
		}
	});
});


//listen port yang yg dipakai sebagai alamat web, alamat webnya localhost:3000
app.listen(3000, function(){
    console.log("Server is Up!");
});