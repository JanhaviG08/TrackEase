const geocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const Listing = require("../models/listing");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapToken = process.env.MAP_TOKEN;

const geocodingClient = mbxGeocoding({ accessToken: mapToken });

module.exports.index = async (req,res) => {
    const allListings = await Listing.find({})
    res.render("./listings/index.ejs",{allListings});
};

module.exports.showListing = async (req,res) => {
    // let response = await geocodingClient.forwardGeocode({
    //     query: req.body.listing.location,
    //     limit: 1
    // })
    // .send()
    
    let {id} = req.params;
    const listing = await Listing.findById(id)
      .populate({
        path:"reviews",
        populate: {
            path:"author",
        },
    });

    // const listings = new Listing(req.body.listing);
    // listings.geometry = response.body.features[0].geometry.coordinates;
    // let savedListing = await listings.save();

    if(!listing){
        req.flash("error","Station you requested does not exist!");
        return res.redirect("/listings");
    }

    if (!listing.geometry?.coordinates || listing.geometry.coordinates[0] === 0) {
        try {
          const response = await geocodingClient.forwardGeocode({
            query: `${listing.title} Railway Station, ${listing.location}`,
            limit: 1,
            types: ['poi'],
            poiCategory: ['railway']
          }).send();
  
          const listings = new Listing(req.body.listing);
          listings.geometry = response.body.features[0].geometry.coordinates;
          let savedListing = await listings.save();

          if (response.body.features.length > 0) {
            listing.geometry = {
              type: "Point",
              coordinates: response.body.features[0].geometry.coordinates
            };
            await listing.save();
            console.log('Geocoded coordinates:', listing.geometry.coordinates);
          }
        } catch (geocodeErr) {
          console.error('Geocoding failed:', geocodeErr);
        }
    }
    res.render("./listings/show.ejs",{listing});
};