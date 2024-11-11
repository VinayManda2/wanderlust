const Listing = require("../models/listingModel.js");
const Review = require("../models/reviewModel.js");
const ExpressError = require("../utils/ExpressError.js");
const { listingSchema, reviewSchema } = require("./schemaMiddleware.js");

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.status(401).json({ error: "Unauthorized, please log in" });
    }
    next();
};



module.exports.isOwner = async (req, res, next) => {
    let { id } = req.params;
    let list = await Listing.findById(id);
    if (!list.owner._id.equals(res.locals.currentUser._id)) {
        return res.status(403).json({ error: "You don't have permission to edit this resource" });
    }
    next();
};

module.exports.validateListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        return res.status(400).json({ error: errMsg });
    }
    next();
};

module.exports.validateReview = (req, res, next) => {
    let { error } = reviewSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        return res.status(400).json({ error: errMsg });
    }
    next();
};

module.exports.isReviewAuthor = async (req, res, next) => {
    let { id, reviewId } = req.params;
    let review = await Review.findById(reviewId);
    if (!review.author._id.equals(res.locals.currentUser._id)) {
        return res.status(403).json({ error: "You did not create this review" });
    }
    next();
};
