import React, { useState, useEffect } from "react";
import { useAddProductMutation } from "../../../../redux/Products/productapi";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { products } from "../../../../data/products";
import imagePreview from "../../../../assets/imgpreview.png";
import { useDropzone } from "react-dropzone";

function AddProduct() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    color: "",
  });
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => state.auth);
  const [addProduct] = useAddProductMutation();

  const categories = [...new Set(products.map((item) => item.category))];
  const colors = [...new Set(products.map((item) => item.color))];

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) return toast.error("Please upload an image");

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => data.append(key, value));
    data.append("image", image);
    data.append("author", user.id);

    try {
      setLoading(true);
      await addProduct(data).unwrap();
      toast.success("Product added!");
      navigate("/shop");
    } catch (err) {
      console.error(err);
      toast.error("Failed to add product");
    }finally{
      setLoading(false);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/*": [] },
    multiple: false,
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        setImage(file);
      }
    },
  });

  // Revoke previous preview URL to prevent memory leaks
  useEffect(() => {
    if (!image) {
      setPreviewUrl(null);
      return;
    }

    const objectUrl = URL.createObjectURL(image);
    setPreviewUrl(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [image]);

  return (
    <div className="mt-1 flex items-center justify-center px-4 py-8 sm:px-6 lg:px-8 bg-gray-100">
      <div className="w-full max-w-5xl bg-white rounded-xl shadow-lg overflow-hidden md:flex">
        {/* Form Section */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            Add New Product
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Product Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="e.g. Air Max Shoes"
                className="mt-1 block w-full px-4 py-2 border rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Price */}
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                Price ($)
              </label>
              <input
                id="price"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                required
                placeholder="e.g. 79.99"
                className="mt-1 block w-full px-4 py-2 border rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows="3"
                maxLength="300"
                value={formData.description}
                onChange={handleChange}
                required
                placeholder="Brief description of the product"
                className="mt-1 block w-full px-4 py-2 border rounded-md resize-none border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              ></textarea>
              <p className="text-xs text-gray-500 text-right">
                {formData.description.length}/300
              </p>
            </div>

            {/* Category */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-4 py-2 border rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Color */}
            <div>
              <label htmlFor="color" className="block text-sm font-medium text-gray-700">
                Color
              </label>
              <select
                id="color"
                name="color"
                value={formData.color}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-4 py-2 border rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select color</option>
                {colors.map((color) => (
                  <option key={color} value={color}>
                    {color}
                  </option>
                ))}
              </select>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 px-4 rounded-md text-white flex items-center justify-center ${
                loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading ? (
                <>
                 <svg
                  className="animate-spin h-5 w-5 text-white ml-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg> Adding...
                </>
               
              ) : (
                "Add Product"
              )}
            </button>
          </form>
        </div>

        {/* Image Upload Section */}
        <div className="w-full md:w-1/2 bg-gray-100 flex flex-col justify-center items-center px-6 py-8">
          <div
            {...getRootProps()}
            className="w-full border-2 border-dashed border-gray-400 rounded-md cursor-pointer p-6 bg-white text-center hover:bg-gray-50 transition"
          >
            <input {...getInputProps()} />
            <p className="text-sm text-gray-600">
              {isDragActive ? "Drop the image here..." : "Drag & drop or click to upload image"}
            </p>
          </div>

          <div className="mt-6 text-center">
            <img
              src={previewUrl || imagePreview}
              alt="Preview"
              className="w-40 h-40 object-cover rounded border mx-auto shadow-sm"
            />
            {image && (
              <button
                type="button"
                onClick={() => setImage(null)}
                className="mt-2 text-sm text-red-600 hover:underline"
              >
                Remove Image
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;

{
  /* <div>
//           <label htmlFor="productImage" className="block text-sm font-medium text-gray-700">
//             Product Image
//           </label>
//           <input
//             id="productImage"
//             type="file"
//             accept="image/*"
//             onChange={(e) => setImage(e.target.files[0])}
//             required
//             className="mt-1 block w-full text-sm text-gray-600"
//           /> */
}
