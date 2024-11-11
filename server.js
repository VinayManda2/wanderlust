const express = require("express");
const methodOverride = require("method-override");
const morgan = require("morgan");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const localStrategy = require("passport-local");
const cors = require("cors");
const User = require("./models/userModel.js");
const connectDB = require("./config/db.js");
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

// Constants
const SESSION_SECRET = process.env.SESSION_SECRET || "mysupersecretcode";
const PORT = process.env.PORT || 8080;

// MongoDB connection
connectDB();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(methodOverride("_method"));
app.use(morgan("dev"));
app.use(cors());



// Session configuration
const sessionOptions = {
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  }
};

app.use(session(sessionOptions));
app.use(flash());

// Passport configuration
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Flash messages and current user middleware
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  
  next();
});

// Middleware to handle CORS preflight requests
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Change * to your desired origin
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Routes
app.use("/api/listings", require("./routes/listingRoute.js"));
app.use("/api/listings/:id/reviews", require("./routes/reviewRoute.js"));
app.use("/api/", require("./routes/UserRoute.js"));

// 404 error handling
app.all("*", (req, res) => {
  res.status(404).send("Page not found");
});

// Server initialization
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
