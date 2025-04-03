const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Review = require("../models/review.js");
const { reviewSchema } = require("../schema.js");
const Listing = require("../models/listing.js");

const validateReview = (req, res, next) => {
    let { error } = reviewSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map(el => el.message).join(",");
        console.error("Validation Error:", errMsg); // Debugging log
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
};

// Review
// Post review route
router.post(
    "/",
    validateReview,
    wrapAsync(async (req, res) => {
        try {
            console.log("Request Body:", req.body); // Debugging log
            let listing = await Listing.findById(req.params.id);
            if (!listing) {
                console.error("Listing not found"); // Debugging log
                req.flash('error', 'Listing not found!');
                return res.redirect('/listings');
            }
            let newReview = new Review(req.body.review);
            listing.reviews.push(newReview);
            await newReview.save();
            await listing.save();
            req.flash('success', 'Successfully added a new review!');
            res.redirect(`/listings/${listing._id}`);
        } catch (err) {
            console.error("Error adding review:", err); // Debugging log
            throw err;
        }
    })
);
 
// Delete review route
router.delete(
    "/:reviewId",
    wrapAsync(async (req, res) => {
        try {
            let { id, reviewId } = req.params;
            console.log("Deleting review:", { id, reviewId }); // Debugging log

            let listing = await Listing.findById(id);
            if (!listing) {
                console.error("Listing not found"); // Debugging log
                req.flash('error', 'Listing not found!');
                return res.redirect('/listings');
            }

            await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
            await Review.findByIdAndDelete(reviewId);

            console.log("Review deleted successfully"); // Debugging log
            req.flash('success', 'Successfully deleted the review!');
            res.redirect(`/listings/${id}`);
        } catch (err) {
            console.error("Error deleting review:", err); // Debugging log
            throw err;
        }
    })
);

module.exports = router;