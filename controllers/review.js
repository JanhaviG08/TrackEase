const Review = require("../models/review");
const Listing = require("../models/listing.js");

module.exports.createReview =async (req, res) => {
        try {
            let listing = await Listing.findById(req.params.id);
            if (!listing) {
                req.flash('error', 'Listing not found!');
                return res.redirect('/listings');
            }
            let newReview = new Review(req.body.review);
            newReview.author = req.user._id;
            console.log(newReview);
            listing.reviews.push(newReview);

            await newReview.save();
            await listing.save();
            req.flash('success', 'Successfully added a new review!');
            res.redirect(`/listings/${listing._id}`);
        } catch (err) {
            throw err;
        }
    };

module.exports.deleteReview = async (req, res) => {
        try {
            let { id, reviewId } = req.params;

            let listing = await Listing.findById(id);
            if (!listing) {
                req.flash('error', 'Listing not found!');
                return res.redirect('/listings');
            }

            await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId }});
            await Review.findByIdAndDelete(reviewId);

            req.flash('success', 'Successfully deleted the review!');
            res.redirect(`/listings/${id}`);
        } catch (err) {
            throw err;
        }
    };