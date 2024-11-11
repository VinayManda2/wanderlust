const Review = require("../models/reviewModel.js");
const Listing = require("../models/listingModel.js");

module.exports.createReview = async (req, res) => {
    try {
        let listing = await Listing.findById(req.params.id);
        let newReview = new Review(req.body.review);
        newReview.author = req.user._id;
        listing.reviews.push(newReview);
        await newReview.save();
        await listing.save();
        res.status(201).json(newReview);
    } catch (err) {
        res.status(500).json({ error: 'Server Error' });
    }
};

module.exports.deleteReview = async (req, res) => {
    try {
        let { id, reviewId } = req.params;
        await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
        await Review.findByIdAndDelete(reviewId);
        res.json({ message: 'Review deleted' });
    } catch (err) {
        res.status(500).json({ error: 'Server Error' });
    }
};
