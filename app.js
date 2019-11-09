//- File Name: apps.js
//- Author: Steven Davies
//- Website Name: www.sdavies.ca
//- Description: This is the app.js for the site and contains all the required in modules.
//- Updated : 2019-10-13
// Vairable Definitions
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

// add the session 
var session = require("express-session");
// add coneection to mongoose
var mongoose = require("mongoose");
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var flash = require('connect-flash');
var User = require('./models/user');

// mongoose.connect(
// 	"mongodb+srv://stevenjdavies2013:Bonnied029$$$@cluster0-rneum.mongodb.net/test?retryWrites=true&w=majority",
// 	{
// 		useNewUrlParser: true,
// 		useUnifiedTopology: true
// 	}
// );

mongoose.connect(
	'mongodb+srv://test:test@comp2068-qabzd.mongodb.net/test?retryWrites=true&w=majority',
	{ useNewUrlParser: true, useUnifiedTopology: true }
);

var db = mongoose.connection;

db.on("error", () => console.log("There was a connection error"));
db.once("open", () => console.log("You are connected to the DB"));

var authRouter = require('./routes/auth');
var indexRouter = require("./routes/index");

// Create the APP instance
var app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(session({
	secret: "unicorn",
	resave: false,
	saveUninitialized: true
})
);

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.post('/login', passport.authenticate('local', {
	failureRedirect: '/login',
	successRedirect: '/'
})
);

app.get('/login', (req, res) => res.render('auth/login'));

app.get('/register', (req, res) => res.render('auth/register'));

app.use((req, res, next) => {
	console.log(`REQ.USER: ${req.user}`);
	next();
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render("error");
});


// var GitHubStrategy = require('passport-github').Strategy;

// // var usersRouter = require('./routes/users');
// const bodyParser = require("body-parser");

// // body parser for nodemailer.
// app.use(bodyParser.urlencoded({ extended: true }));
// // view engine setup

app.use('/', authRouter);
app.use("/", indexRouter);

// error handler

module.exports = app;
