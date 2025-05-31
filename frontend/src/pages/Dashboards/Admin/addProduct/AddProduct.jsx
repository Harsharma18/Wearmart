
import React, { useState } from "react";
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
  const { user } = useSelector((state) => state.auth);
  const [addProduct] = useAddProductMutation();

  const categories = ["all", ...new Set(products.map((item) => item.category))];
  const colors = ["all", ...new Set(products.map((item) => item.color))];

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
      await addProduct(data).unwrap();
      toast.success("Product added!");
      navigate("/shop");
    } catch (err) {
      toast.error("Failed to add product");
      console.error(err);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/*": [] },
    multiple: false,
    onDrop: (acceptedFiles) => {
      setImage(acceptedFiles[0]);
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-2xl w-full bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Add New Product</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Product Name</label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 border-gray-300"
            />
          </div>

          {/* Price */}
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price ($)</label>
            <input
              id="price"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 border-gray-300"
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              id="description"
              name="description"
              rows="3"
              maxLength="300"
              value={formData.description}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border rounded-md resize-none focus:ring-blue-500 focus:border-blue-500 border-gray-300"
            ></textarea>
            <p className="text-xs text-gray-500 text-right">
              {formData.description.length}/300 characters
            </p>
          </div>

          {/* Category */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 border-gray-300"
            >
              <option value="">Select category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Color */}
          <div>
            <label htmlFor="color" className="block text-sm font-medium text-gray-700">Color</label>
            <select
              id="color"
              name="color"
              value={formData.color}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 border-gray-300"
            >
              <option value="">Select color</option>
              {colors.map((color) => (
                <option key={color} value={color}>{color}</option>
              ))}
            </select>
          </div>

          {/* Image Upload */}
          <div {...getRootProps()} className="mt-4 flex justify-center items-center px-4 py-10 border-2 border-dashed border-gray-400 rounded-md cursor-pointer bg-gray-50 hover:bg-gray-100 transition">
            <input {...getInputProps()} />
            <p className="text-sm text-gray-600">{isDragActive ? "Drop the image here..." : "Drag & drop or click to upload image"}</p>
          </div>

          {/* Image Preview */}
          <div className="mt-4 text-center">
            <img
              src={image ? URL.createObjectURL(image) : imagePreview}
              alt="Preview"
              className="w-32 h-32 object-cover rounded border mx-auto"
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

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;

//         {/* <div>
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
//           /> */}