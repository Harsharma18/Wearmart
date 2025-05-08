
import React, { useState } from "react";
import Postreview from "./Postreview";
import moment from "moment";
import {
  useLikeReviewMutation,
  useDislikeReviewMutation,
  useDeleteReviewMutation,
  useFetchAllReviewsByProductIdQuery,
} from "../../../redux/Reviews/reviewApi";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function Reviewcard() {
  const [ismodel, setismodel] = useState(false);
  const [likeReview] = useLikeReviewMutation();
  const [dislikeReview] = useDislikeReviewMutation();
  const [deleteReview] = useDeleteReviewMutation();
  const { user } = useSelector((state) => state.auth);
  const { id } = useParams();

  const { data, refetch } = useFetchAllReviewsByProductIdQuery(id);
  const productreviews = data || [];

  const handleopenModel = () => setismodel(true);
  const handlecloseModel = () => setismodel(false);

  const handleLike = async (reviewId) => {
    try {
      await likeReview(reviewId).unwrap();
      refetch();
    } catch (err) {
      console.error("Error liking review:", err);
    }
  };

  const handleDislike = async (reviewId) => {
    try {
      await dislikeReview(reviewId).unwrap();
      refetch();
    } catch (err) {
      console.error("Error disliking review:", err);
    }
  };

  const handleDelete = async (reviewId) => {
    try {
      await deleteReview(reviewId).unwrap();
      refetch();
    } catch (err) {
      console.error("Error deleting review:", err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

      {productreviews.length === 0 ? (
        <p className="text-gray-500 text-sm mt-4">No reviews available.</p>
      ) : (
        <div className="space-y-4">
          {productreviews.map((item, index) => {
            const isUpdated = item.createdAt !== item.updatedAt;
            return (
              <div
                key={index}
                className="p-4 border border-gray-200 rounded-md shadow-sm bg-white"
              >
                <div className="flex items-center gap-3 mb-2">
                  {item?.author?.profileImg ? (
                    <img
                      className="w-10 h-10 rounded-full object-cover"
                      src={item.author.profileImg}
                      alt="Profile"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gray-400 flex items-center justify-center text-white font-semibold">
                      {item?.author?.username?.slice(0, 2).toUpperCase() || "?"}
                    </div>
                  )}
                  <div>
                    <p className="font-medium text-gray-800 text-sm">
                      {item?.author?.username || "Anonymous"}
                    </p>
                    <p className="text-xs text-gray-500">
                      {isUpdated ? (
                        <>
                          Updated: {moment(item?.updatedAt).format("DD MMM YYYY")} (
                          {moment(item?.updatedAt).fromNow()})
                        </>
                      ) : (
                        <>
                          Created: {moment(item?.createdAt).format("DD MMM YYYY")} (
                          {moment(item?.createdAt).fromNow()})
                        </>
                      )}
                    </p>
                  </div>
                </div>

                <p className="text-yellow-600 font-medium text-sm mb-1">
                  Rating: {item?.rating || "-"}
                </p>
                <p className="text-gray-700 text-sm">{item?.comment}</p>

                <div className="flex items-center justify-between mt-3 text-sm">
                  <div className="flex gap-4">
                    <button
                      onClick={() => handleLike(item._id)}
                      className={`flex items-center gap-1 text-green-600 hover:text-green-700 ${
                        item?.likes?.includes(user._id) ? "font-semibold" : ""
                      }`}
                    >
                      <i className="fas fa-thumbs-up"></i>
                      {item?.likes?.length || 0}
                    </button>
                    <button
                      onClick={() => handleDislike(item._id)}
                      className={`flex items-center gap-1 text-red-600 hover:text-red-700 ${
                        item?.dislikes?.includes(user._id) ? "font-semibold" : ""
                      }`}
                    >
                      <i className="fas fa-thumbs-down"></i>
                      {item?.dislikes?.length || 0}
                    </button>
                  </div>

                  {user && user?.id === item?.author?._id && (
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="text-gray-500 hover:text-black"
                    >
                      <i className="fas fa-trash-alt"></i>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="mt-8 text-center">
        <button
          onClick={handleopenModel}
          className="px-5 py-2 bg-red-500 hover:bg-red-600 text-sm font-medium text-white rounded"
        >
          Add A Review
        </button>
      </div>

      <Postreview ismodel={ismodel} handlecloseModel={handlecloseModel} />
    </div>
  );
}

export default Reviewcard;

// import React, { useState } from "react";
// import Postreview from "./Postreview";
// import moment from "moment";
// import {
//   useLikeReviewMutation,
//   useDislikeReviewMutation,
//   useDeleteReviewMutation,
//   useFetchAllReviewsByProductIdQuery,
// } from "../../../redux/Reviews/reviewApi";
// import { useSelector } from "react-redux";
// import { useParams } from "react-router-dom";

// function Reviewcard() {
//   const [ismodel, setismodel] = useState(false);
//   const [likeReview] = useLikeReviewMutation();
//   const [dislikeReview] = useDislikeReviewMutation();
//   const [deleteReview] = useDeleteReviewMutation();
//   const { user } = useSelector((state) => state.auth);
//   const { id } = useParams();

//   const { data, refetch } = useFetchAllReviewsByProductIdQuery(id);
//   const productreviews = data || [];
//   console.log("Review Data:", productreviews);


//   const handleopenModel = () => setismodel(true);
//   const handlecloseModel = () => setismodel(false);

//   const handleLike = async (reviewId) => {
//     try {
//       await likeReview(reviewId).unwrap();
//       refetch();
//     } catch (err) {
//       console.error("Error liking review:", err);
//     }
//   };

//   const handleDislike = async (reviewId) => {
//     try {
//       await dislikeReview(reviewId).unwrap();
//       refetch();
//     } catch (err) {
//       console.error("Error disliking review:", err);
//     }
//   };

//   const handleDelete = async (reviewId) => {
//     try {
//       await deleteReview(reviewId).unwrap();
//       refetch();
//     } catch (err) {
//       console.error("Error deleting review:", err);
//     }
//   };

//   return (
//     <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
//       {productreviews.length === 0 ? (
//         <p className="text-gray-500">No reviews available.</p>
//       ) : (
//         productreviews.map((item, index) => (
//           <div
//             key={index}
//             className="p-4 border border-gray-200 rounded-md shadow-sm bg-white relative"
//           >
//             <div className="flex items-center gap-2 mb-2">
//               {item?.author?.profileImg ? (
//                 <img
//                   className="size-12 rounded-full"
//                   src={item.author.profileImg}
//                   alt="Profile"
//                 />
//               ) : (
//                 <div className="size-12 rounded-full bg-gray-300 flex items-center justify-center text-white font-bold">
//                   {item?.author?.username?.slice(0, 2).toUpperCase() || "?"}
//                 </div>
//               )}
//               <p className="font-semibold text-blue-600">
//                 {item?.author?.username || "Anonymous"}
//               </p>
//             </div>

//             <p className="text-yellow-500">Rating: {item?.rating || "-"}</p>
//             <p className="text-sm text-gray-500">
//               {moment(item?.createdAt).format("DD MMM YYYY")} (
//               {moment(item?.createdAt).fromNow()})
//             </p>
//             <p className="text-gray-700 mt-2">{item?.comment}</p>

//             <div className="flex items-center gap-4 mt-4">
//               <button
//                 onClick={() => handleLike(item._id)}
//                 className={`text-green-600 hover:text-green-800 ${
//                   item?.likes?.includes(user._id) ? "font-bold" : ""
//                 }`}
//               >
//                 <i className="fas fa-thumbs-up"></i> {item?.likes?.length || 0}
//               </button>

//               <button
//                 onClick={() => handleDislike(item._id)}
//                 className={`text-red-600 hover:text-red-800 ${
//                   item?.dislikes?.includes(user._id) ? "font-bold" : ""
//                 }`}
//               >
//                 <i className="fas fa-thumbs-down"></i>{" "}
//                 {item?.dislikes?.length || 0}
//               </button>

//               {user && user?.id === item?.author?._id && (
//                 <button
//                   onClick={() => handleDelete(item._id)}
//                   className="text-gray-600 hover:text-black ml-auto"
//                 >
//                   <i className="fas fa-trash-alt"></i>
//                 </button>
//               )}
//             </div>
//           </div>
//         ))
//       )}

//       <div className="mt-12">
//         <button
//           onClick={handleopenModel}
//           className="px-6 py-3 bg-red-500 text-white rounded-md"
//         >
//           Add A Review
//         </button>
//       </div>

//       <Postreview ismodel={ismodel} handlecloseModel={handlecloseModel} />
//     </div>
//   );
// }

// export default Reviewcard;