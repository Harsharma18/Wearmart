import React, { useState } from "react";
import { useSelector } from "react-redux";
import { usePostReviewMutation } from "../../../redux/Reviews/reviewApi";
import { useParams } from "react-router-dom";
import { useFetchProductByIdQuery } from "../../../redux/Products/productapi";
import toast from "react-hot-toast";
function Postreview({ ismodel, handlecloseModel }) {
  const { id } = useParams();

  const [rating, setrating] = useState(0);
  const [comment, setcomment] = useState("");
  const { user } = useSelector((state) => state.auth || {});

  // console.log(user);

  const { refetch } = useFetchProductByIdQuery(id, { skip: !id });
  const [postReview] = usePostReviewMutation();

  if (!ismodel) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!rating || !comment.trim()) {
      return toast.error("Please add both rating and comment.");
    }
    const newComment = {
      comment,
      rating,
      author: user?.id,

      productId: id,
    };
    console.log(newComment);

    try {
      const res = await postReview(newComment).unwrap();
      toast.success("Your review has been posted successfully!");

      setcomment("");
      setrating(0);
      refetch();
    } catch (err) {
      toast.error(
        err?.data?.message || "Failed to post review. Please try again."
      );
    }

    handlecloseModel();
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black/90 px-2  `}
    >
      <div className="bg-white p-6 rounded-md shadow-lg w-96 z-50 ">
        <h2 className="text-lg font-medium mb-4">Post A Review</h2>
        {[1, 2, 3, 4, 5].map((item, index) => (
          <span
            className="cursor-pointer text-yellow-500 text-xl"
            onClick={() => setrating(item)}
            key={index}
          >
            {rating >= item ? (
              <i className="fa-solid fa-star"></i>
            ) : (
              <i className="fa-regular fa-star"></i>
            )}
          </span>
        ))}
        <textarea
          value={comment}
          onChange={(e) => setcomment(e.target.value)}
          rows="4"
          className="w-full border border-gray-300 mt-3 rounded-md mb-4 focus:outline-none resize-none"
        ></textarea>
        <div className="flex justify-between">
          <button
            onClick={handlecloseModel}
            className="cursor-pointer px-4 py-2 bg-gray-300 rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="cursor-pointer px-4 py-2 bg-red-500 text-white rounded-md"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default Postreview;
