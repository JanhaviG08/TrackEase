const  mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Review = require("./review.js");
const { ref  } = require("joi");

const listingSchema= new Schema({
    title: {
        type: String,
        required: true
    },
    image: 
    {
        url: String,
        filename: String,
    },
    description: String,
    location: String,
    contact: String,
    city: String,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        },
    ],
});

listingSchema.post("findOneAndDelete",async (listing) =>{
    if(listing)
    {
        await Review.deleteMany({_id : {$in: listing.reviews}});
    }
});

const Listing = mongoose.model('Listing', listingSchema);
module.exports = Listing;