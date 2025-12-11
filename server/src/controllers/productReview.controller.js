import Product from "../models/product.js";
import UserReview from "../models/productReview.js";


export const getReviewsByProductId = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Missing product id."
      });
    }

    // Fetch all reviews for calculations
    const allReviews = await UserReview.find({ productId: id }).select("rating");

    if (!allReviews || allReviews.length === 0) {
      return res.status(200).json({
        success: true,
        all_reviews: [],
        totalReviews: 0,
        averageRating: 0,
        ratingBreakdown: {
          1: 0,
          2: 0,
          3: 0,
          4: 0,
          5: 0
        }
      });
    }

    // Fetch only last 5 reviews for UI
    const all_reviews = await UserReview.find({ productId: id })
      .select("_id review rating userId createdAt")
      .populate({
        path: "userId",
        select: ["fullName"]
      })
      .sort({ createdAt: -1 })
      .limit(5);

    // Total reviews
    const totalReviews = allReviews.length;

    // Rating breakdown
    const ratingBreakdown = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

    allReviews.forEach(r => {
      ratingBreakdown[r.rating] = (ratingBreakdown[r.rating] || 0) + 1;
    });

    // Average rating
    const totalRating = allReviews.reduce((sum, r) => sum + r.rating, 0);
    const averageRating = (totalRating / totalReviews).toFixed(1);

    return res.status(200).json({
      success: true,
      reviews:all_reviews.length > 0? all_reviews : [],
      totalReviews,
      averageRating,
      ratingBreakdown
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Internal server error: ${error}`
    });
  }
};


export const postReview = async (req, res) => {
    try {
        const { productId, rating, review } = req.body;
        if (!productId  || !rating || !review) {
            return res.status(400).json({
                success: false,
                message: "Missing parameter."
            })
        }
        const product = await Product.findById(productId)
        if (!product) {
            return res.status(400).json({
                success: false,
                message: "Invalide product id"
            })
        }
        const newreview = await UserReview.create({
            productId,
            userId: req.user.userId,
            rating,
            review
        })
        return res.status(201).json({
            success: true,
            review: newreview
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Internal server error: ${error}`
        })
    }
}

export const updateReview = async (req, res) => {
    try {
        const { id } = req.params;
        const { rating, review } = req.body;
        if (!id || !rating || !review) {
            return res.status(400).json({
                success: false,
                message: "Missing parameter."
            })
        }
        const upreview = await UserReview.findById(id)
       
        if (!upreview) {
            return res.status(400).json({
                success: false,
                message: "No review found"
            })
        }
         if (upreview.userId.toString() !== req.user.userId) {
            return res.status(401).json({
                success: false,
                message: "You are not authorized to perfom this action."
            })
        }
        upreview.rating = rating;
        upreview.review = review;
        await upreview.save();
        return res.status(200).json({
            success: true,
            review: upreview
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Internal server error: ${error}`
        })
    }
}
export const deleteReview = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Missing id."
            })
        }
        const review = await UserReview.findById(id)
       
        if (!review) {
            return res.status(400).json({
                success: false,
                message: "No review found"
            })
        }
         if (review.userId.toString() !== req.user.userId) {
            return res.status(401).json({
                success: false,
                message: "You are not authorized to perfom this action."
            })
        }
        await review.deleteOne();
        return res.status(200).json({
            success: true,
            id
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Internal server error: ${error}`
        })
    }
} 
