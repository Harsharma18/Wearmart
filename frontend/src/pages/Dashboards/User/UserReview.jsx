import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useFetchAllReviewByUseridQuery } from '../../../redux/Reviews/reviewApi';
import { UserReviewsSkeleton } from '../../../components/DashboardSkelton';

const UserReviews = () => {
  const { user } = useSelector((state) => state.auth);
  const { data: reviews, error, isLoading } = useFetchAllReviewByUseridQuery(user?.id);
  const navigate = useNavigate();

  if (isLoading) return <UserReviewsSkeleton />;
  if (error) return <div className="text-red-500 text-center py-4">Failed to load reviews!</div>;

  const handleCardClick = () => {
    navigate('/shop');
  };

  return (
    <div className="py-10 px-4 max-w-7xl mx-auto">
      <h2 className="text-4xl font-semibold text-gray-800 mb-10 border-b-2 pb-3 border-gray-200">
        Your Product Reviews
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {reviews?.map((review, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-2xl p-6 border border-gray-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <Ratingstar ratings={review?.rating} />
              <span className="text-gray-400 text-xs">{new Date(review?.createdAt).toLocaleDateString()}</span>
            </div>
            <p className="text-gray-700 mb-3 line-clamp-3">
              <strong className="text-gray-900">Comment:</strong> {review?.comment}
            </p>
            <p className="text-sm text-gray-500">
              <strong>Product ID:</strong> {review?.productId}
            </p>
          </div>
        ))}

        <div
          onClick={handleCardClick}
          className="flex flex-col items-center justify-center bg-gradient-to-r from-gray-100 to-gray-200 text-gray-600 hover:bg-red-500 hover:text-white transition-all duration-300 border-dashed border-2 border-gray-300 rounded-2xl cursor-pointer p-8"
        >
          <span className="text-4xl font-bold mb-2">+</span>
          <p className="text-sm font-medium">Add New Review</p>
        </div>
      </div>
    </div>
  );
};

export default UserReviews;

function Ratingstar({ ratings }) {
  const getStarColor = (ratings) => {
    if (ratings <= 2) return "text-red-500";
    if (ratings === 3) return "text-yellow-500";
    return "text-green-500";
  };

  const stars = [];
  for (let i = 0; i < 5; i++) {
    stars.push(
      <span key={i}>
        <i
          className={
            i < ratings
              ? `fa-solid fa-star ${getStarColor(ratings)} text-lg`
              : "fa-regular fa-star text-lg text-gray-400"
          }
        ></i>
        {/* <i className={`fa-star ${i < ratings ? `fa-solid ${getStarColor(ratings)}` : "fa-regular text-gray-400"} text-lg`}></i> */}
      </span>
    );
  }

  return <div>{stars}</div>;
}
