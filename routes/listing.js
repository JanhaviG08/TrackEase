const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const {listingSchema }= require("../schema.js");


const validateListing = (req,res,next) => {
    const {error} =listingSchema.validate(req.body);
    if(error)
    {
        let errMsg = error.details.map(el => el.message).join(',');
        throw new ExpressError(400, errMsg);
    }
    else
    {
        next();
    }
}

//index route
router.get(
    "/", 
    wrapAsync (async (req,res) => {
    const allListings = await Listing.find({})
    res.render("./listings/index.ejs",{allListings});
}));

//show route
router.get(
    "/:id", 
    wrapAsync (async (req,res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id).populate("reviews");
    if(!listing){
        req.flash("error","Station you requested does not exist!");
        return res.redirect("/listings");
    }
    res.render("./listings/show.ejs",{listing});
}));

module.exports = router;
