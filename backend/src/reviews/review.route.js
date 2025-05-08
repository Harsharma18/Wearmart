const express = require("express");
const ReviewModel = require("./review.model");
const router = express.Router();
const ProductModel = require("../products/products.model");
const verifyToken = require("../middleware/verifyToken");
router.post("/post-review", async (req, res) => {
  try {
    const { comment, rating, productId, author } = req.body;
    if (!comment || !rating || !productId || !author) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }
    const existingReview = await ReviewModel.findOne({ productId, author });
    if (existingReview) {
      //updateReview
      existingReview.comment = comment;
      existingReview.rating = rating;
      await existingReview.save();
    } else {
      //create Review
      const newReview = await ReviewModel.create({
        comment,
        rating,
        productId,
        author,
      });
    }
    const reviews = await ReviewModel.find({ productId }).populate("author", "username profileImg"); 
    // console.log(reviews);
    if (reviews.length > 0) {
      const totalRating = reviews.reduce((acc, item) => item.rating + acc, 0);
      const averageRating = totalRating / reviews.length;
      const product = await ProductModel.findById(productId);
      if (product) {
        product.rating = averageRating;
        await product.save();
      } else {
        return res.status(400).send({ message: "Product Not Found" });
      }
    }
    //calculate average rating
    res.status(200).send({
      message: "Review posted successfully",
      reviews,
    });
  } catch (err) {
    res.status(500).send({ message: "Failed to post review" });
  }
});
//total Review for a product
router.get("/total-review", async (req, res) => {
  try {
    const totalReview = await ReviewModel.countDocuments({});
    if (totalReview > 0) {
      return res.status(200).send({ message: "total Review", totalReview });
    } else {
      return res.status(400).send({ message: "No Review Found" });
    }
  } catch (err) {
    res.status(500).send({ message: "Failed to get total review" });
  }
});

//show all review of single product by multiple user

router.get("/product/:productId", async (req, res) => {
  try {
    const reviews = await ReviewModel.find({
      productId: req.params.productId,
    }).populate("author", "username profileImg"); 
    res.status(200).send(reviews);
  } catch (err) {
    res.status(500).send({ message: "Failed to get reviews" });
  }
});

//get all Review for a product
router.get("/:userId", async (req, res) => {
  const { userId } = req.params;
  if (!userId) {
    return res.status(400).send({ message: "User ID is required" });
  }
  try {
    const review = await ReviewModel.find({ author: userId });
    if (review.length === 0) {
      return res.status(404).send({ message: "No reviews found" });
    }
    res.status(200).send(review);
  } catch (err) {
    res.status(500).send({ message: "Failed to get review" });
  }
});
router.put("/edit-review/:reviewId", verifyToken, async (req, res) => {
  const { comment, rating } = req.body;
  const { reviewId } = req.params;

  try {
    const review = await ReviewModel.findById(reviewId);

    if (!review) return res.status(404).json({ message: "Review not found" });

    // Only review owner can edit
    if (review.author.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Not authorized to edit this review" });
    }

    review.comment = comment || review.comment;
    review.rating = rating || review.rating;

    await review.save();

    res.status(200).json({ message: "Review updated successfully", review });
  } catch (err) {
    res.status(500).json({ message: "Failed to update review" });
  }
});

router.delete("/delete-review/:reviewId", verifyToken, async (req, res) => {
  const { reviewId } = req.params;

  try {
    const review = await ReviewModel.findById(reviewId).populate("author");

    if (!review) return res.status(404).json({ message: "Review not found" });

    // console.log("User :", req.user.userid);
    // console.log("Author:", review.author._id.toString());

    if (review.author._id.toString() !== req.user.userid) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this review" });
    }

    await ReviewModel.findByIdAndDelete(reviewId);

    res.status(200).json({ message: "Review deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete review" });
  }
});

//like and dislike review
router.post("/like-review/:reviewId", verifyToken, async (req, res) => {
  const { reviewId } = req.params;
  const userId = req.user.userid;
  // console.log("like",userId);
  

  try {
    const review = await ReviewModel.findById(reviewId);
    if (!review) return res.status(404).json({ message: "Review not found" });

    const hasLiked = review.likes.includes(userId);
    const hasDisliked = review.dislikes.includes(userId);

    if (hasLiked) {
      // Remove like
      review.likes.pull(userId);
    } else {
      // Add like
      review.likes.push(userId);

      // If user has disliked → remove dislike
      if (hasDisliked) review.dislikes.pull(userId);
    }

    await review.save();
    res.status(200).json({
      message: "Like updated",
      likesCount: review.likes.length,
      dislikesCount: review.dislikes.length,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});
router.post("/dislike-review/:reviewId", verifyToken, async (req, res) => {
  const { reviewId } = req.params;
  const userId = req.user.userid;
  // console.log("dislike",userId);
  

  try {
    const review = await ReviewModel.findById(reviewId);
    if (!review) return res.status(404).json({ message: "Review not found" });

    const hasDisliked = review.dislikes.includes(userId);
    const hasLiked = review.likes.includes(userId);

    if (hasDisliked) {
      // Remove dislike
      review.dislikes.pull(userId);
    } else {
      // Add dislike
      review.dislikes.push(userId);

      // If liked before → remove like
      if (hasLiked) review.likes.pull(userId);
    }

    await review.save();
    res.status(200).json({
      message: "Dislike updated",
      likesCount: review.likes.length,
      dislikesCount: review.dislikes.length,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
