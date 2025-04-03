const express = require('express'); 
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const ejsMate = require('ejs-mate');
const ExpressError = require("./utils/ExpressError.js");
const flash = require("connect-flash"); 
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/user.js');

const listingsRouter = require("./routes/listing.js");
const reviewsRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

const MONGO_URL= "mongodb://127.0.0.1:27017/trackEase";

main().then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.log('Error connecting to MongoDB', err);
});

async function main() {
    await mongoose.connect(MONGO_URL);
}

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.urlencoded({extended:true}));
app.engine('ejs',ejsMate);
app.use(express.static(path.join(__dirname,"public")));

const sessionOptions = {
    secret : "mysupersecretecode",
    resave : false,
    saveUninitialized : true,
    cookie : {
        httpOnly : true,
        expires : Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge : 1000 * 60 * 60 * 24 * 7
    },
};

app.get('/', (req, res) => {
    res.send('Hello, I am a root');
});

app.use(session(sessionOptions)); 
app.use(flash());

// Passport configuration
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
});

// app.get("/demouser", async(req,res) =>{
//   let fakeUser = new User ({
//     email: "student@gmail.com",
//     username: "Max"
//   });
//   let registerUser = await User.register(fakeUser, "helloworld");
//   res.send(registerUser);
// });

app.use("/listings", listingsRouter);
app.use("/listings/:id/reviews", reviewsRouter); // Corrected route for reviews
app.use("/", userRouter);

app.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}));

app.all("*",(req,res,next) => {
    next(new ExpressError(404, "Page not found")); 
});

app.use((err,req,res,next) => {
    let {statusCode=500, message="Something went wrong"} = err;
    res.status(statusCode).render("listings/error.ejs", { message })
    // res.status(statusCode).send(message);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});