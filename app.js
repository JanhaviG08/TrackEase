if(process.env.NODE_ENV != "production")
{
    require('dotenv').config();
}

const express = require('express'); 
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const ejsMate = require('ejs-mate');
const ExpressError = require("./utils/ExpressError.js");
const session = require('express-session');
const flash = require("connect-flash"); 
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/user.js');

const listingsRouter = require("./routes/listing.js");
const reviewsRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");
const chatbotRoutes = require('./routes/chatbot.js');

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
    secret : "mysupersecretecodes",
    resave : false,
    saveUninitialized : true,
    cookie : {
        httpOnly : true,
        expires : Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge : 1000 * 60 * 60 * 24 * 7
    },
};

// app.get('/', (req, res) => {
//     res.send('Hello, I am a root');
// });

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
    res.locals.currUser = req.user; // Add this line to make current user available in views
    next();
});

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });

app.use("/listings", listingsRouter);
app.use("/listings/:id/reviews", reviewsRouter); // Corrected route for reviews
app.use("/", userRouter);
app.use("/chatbot", chatbotRoutes);

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
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});