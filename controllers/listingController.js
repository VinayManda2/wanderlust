const Listing = require("../models/listingModel.js");

module.exports.index = async (req, res) => {
    try {
        const allListings = await Listing.find({}).populate('owner');
        res.json(allListings);
    } catch (err) {
        res.status(500).json({ error: 'Server Error' });
    }
};



module.exports.createListing = async (req, res) => {
    try {
        // Parse form data
        const { userId, title, description, price, country, location } = req.body;
        const file = req.file;
        console.log("file details ",file);
        if (!file) {
            return res.status(400).json({ error: "File is required" });
        }

        // Create a new Listing object
        const newListing = new Listing({
            title,
            description,
            price,
            country,
            location,
            owner: userId, 
            image: { url: file.path, filename: file.filename }
        });
        console.log("new listing",newListing);
        // Save the new listing to the database
        await newListing.save();

        // Respond with the created listing
        res.status(201).json(newListing);
    } catch (err) {
        // If there's an error, respond with a 400 status and an error message
        console.error("Error creating listing:", err);
        res.status(400).json({ error: 'Bad Request' });
    }
};


module.exports.delete = async (req, res) => {
    try {
        let { id } = req.params;
        let deletedListing = await Listing.findByIdAndDelete(id);
        if (!deletedListing) {
            return res.status(404).json({ error: "Listing doesn't exist" });
        }
        res.json({ message: "Listing deleted" });
    } catch (err) {
        res.status(500).json({ error: 'Server Error' });
    }
};


module.exports.show = async (req, res) => {
    try {
        const { id } = req.params;
        const listing = await Listing.findById(id)
            .populate({
                path: 'reviews',
                populate: {
                    path: 'author'
                }
            })
            .populate('owner');
        console.log("in show route");
        console.log(listing);
        if (!listing) {
            return res.status(404).json({ error: "Listing doesn't exist" });
        }

        res.status(200).json({ listing });
    } catch (error) {
        console.error('Error fetching listing:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};



module.exports.update = async (req, res) => {
  try {
    const { id, title, description, price, country, location } = req.body;
    
    let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    if (!listing) {
      return res.status(404).json({ error: "Listing doesn't exist" });
    }

    
    if (typeof req.file != "undefined") {
      
      const url = req.file.path;
      const filename = req.file.filename;
      listing.image = { url, filename };
      
    }
    // Update other fields if they exist in req.body
    if (title) listing.title = title;
    if (description) listing.description = description;
    if (price) listing.price = price;
    if (country) listing.country = country;
    if (location) listing.location = location;

    await listing.save();
    res.json(listing);
  } catch (err) {
    console.error("Error updating listing:", err);
    res.status(400).json({ error: 'Bad Request' });
  }
};
