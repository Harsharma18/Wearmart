import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEditProfileMutation } from "../../../redux/Auth/authapi";
import { setUser } from "../../../redux/Auth/authSlice";
import avatarImg from "../../../assets/avtar.png";

const UserProfile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [editProfile, { isLoading }] = useEditProfileMutation();
  const [formData, setFormData] = useState({
    username: "",
    bio: "",
    profession: "",
    id: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        username: user?.username || "",
        bio: user?.bio || "",
        profession: user?.profession || "",
        id: user?.id || "",
      });
      setPreview(user?.profileImg || "");
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("username", formData.username);
    data.append("bio", formData.bio);
    data.append("profession", formData.profession);
    data.append("id", formData.id);
    if (imageFile) data.append("image", imageFile);

    try {
      const res = await editProfile(data).unwrap();

      const token = localStorage.getItem("auth")
        ? JSON.parse(localStorage.getItem("auth")).token
        : null;
      console.log;
      dispatch(setUser({ user: res.user, token }));
      localStorage.setItem("auth", JSON.stringify({ user: res.user, token }));

      alert("Profile updated successfully!");
      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
      alert("Failed to update profile");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start mb-4">
          <img
            src={preview || avatarImg}
            alt="Profile"
            className="w-32 h-32 object-cover rounded-full"
          />
          <div className="mt-4 sm:mt-0 sm:ml-6 text-center sm:text-left">
            <h3 className="text-2xl font-semibold">
              Username: {formData?.username}
            </h3>
            <p className="text-gray-700">Bio: {formData.bio}</p>
            <p className="text-gray-700">Profession: {formData.profession}</p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="mt-4 sm:mt-0 sm:ml-auto text-blue-500 hover:text-blue-700"
          >
            Edit
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-xl mx-4 relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 text-gray-500"
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label>Username</label>
                <input
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  className="w-full border p-2 rounded"
                />
              </div>
              <div className="mb-4">
                <label>Profession</label>
                <input
                  name="profession"
                  value={formData.profession}
                  onChange={handleChange}
                  required
                  className="w-full border p-2 rounded"
                />
              </div>
              <div className="mb-4">
                <label>Bio</label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                />
              </div>
              <div className="mb-4">
                <label>Profile Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                {preview && (
                  <img
                    src={preview}
                    alt="Preview"
                    className="mt-2 w-24 h-24 rounded-full object-cover"
                  />
                )}
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                {isLoading ? "Saving..." : "Save"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
