const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const {listingSchema }= require("../schema.js");

const listingController = require("../controllers/listing.js");

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
};

// Search route
router.get("/search", async (req, res) => {
    try {
      const query = req.query.q?.toLowerCase() || "";
      const allListings = await Listing.find({
        $or: [
          { title: { $regex: query, $options: "i" } },
          { city: { $regex: query, $options: "i" } },
          { location: { $regex: query, $options: "i" } }
        ]
      });
      
      // Get ALL unique cities (not just from search results)
      const allCities = await Listing.distinct("city");
      
      res.render("listings/index", { 
        allListings,
        uniqueCities: allCities, // Pass all cities for dropdown
        query: query,
        selectedCity: null // No city selected during search
      });
    } catch (err) {
      req.flash("error", "Search failed");
      res.redirect("/listings");
    }
  });
  
  // Filter by city route
  router.get("/city/:city", async (req, res) => {
    try {
      const allListings = await Listing.find({ city: req.params.city });
      const allCities = await Listing.distinct("city");
      
      res.render("listings/index", { 
        allListings,
        uniqueCities: allCities,
        selectedCity: req.params.city
      });
    } catch (err) {
      req.flash("error", "Filter failed");
      res.redirect("/listings");
    }
  });
  
  // Main index route (keep your existing but modify slightly)
  router.get("/", async (req, res) => {
    try {
      const allListings = await Listing.find({});
      const allCities = await Listing.distinct("city");
      
      res.render("listings/index", { 
        allListings,
        uniqueCities: allCities,
        selectedCity: null
      });
    } catch (err) {
      req.flash("error", "Failed to load stations");
      res.redirect("/");
    }
  });

router
  .route("/")
  .get(wrapAsync(listingController.index))

//show route
router.get("/:id", wrapAsync (listingController.showListing));



module.exports = router;