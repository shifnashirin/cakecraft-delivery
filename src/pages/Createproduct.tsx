import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Upload } from "lucide-react";
import { db } from "@/config/firebase";
import { collection, addDoc } from "firebase/firestore";

export default function CreateProduct() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    quantity: "",
    image: null,
    rating: 0,
    ordersCount: 0,
    inStock: true
  });

  const [imageUrl, setImageUrl] = useState("");

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProductData({ ...productData, image: file });
      setImageUrl(URL.createObjectURL(file));
    }
  };

  // Upload image to Cloudinary
  const handleImageUpload = async (file) => {
    if (!file) return null;
  
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", 'Cakedelight'); // Using the same preset as in original code
  
    try {
      const response = await fetch('https://api.cloudinary.com/v1_1/dlcfrqmqc/image/upload', {
        method: "POST",
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log("Cloudinary Response:", data);
  
      return data.secure_url || null;
    } catch (error) {
      console.error("Error uploading image:", error);
      return null;
    }
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const imageUrl = await handleImageUpload(productData.image);

      if (!imageUrl) {
        alert("Failed to upload product image. Please try again.");
        setLoading(false);
        return;
      }

      // Add document to Firestore
      const docRef = await addDoc(collection(db, "products"), {
        name: productData.name,
        description: productData.description,
        price: parseFloat(productData.price),
        category: productData.category,
        quantity: parseInt(productData.quantity),
        imageURL: imageUrl,
        rating: 0, // Default rating for new products
        reviews: [], // Empty reviews array
        ordersCount: 0, // Default orders count
        inStock: parseInt(productData.quantity) > 0,
        createdAt: new Date()
      });

      console.log("Product Created with ID:", docRef.id);

      alert("Product Created Successfully!");
      navigate("/"); // Adjust this route as needed
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to create product.");
    }

    setLoading(false);
  };

  // Category options
  const categories = [
    "Choclate Cakes",
    "Fruit Cake",
    "Wedding Cakes",
    "Vegan Cakes",
    "Special Cake"
    
  ];

  return (
    <div className="min-h-screen flex items-center justify-center px-4 m-4">
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
      <h1 className="text-center text-xl font-semibold mb-6">Add New Product</h1>
      
      <form onSubmit={(e) => handleSubmit(e)} className="space-y-4">
        {/* Two Columns Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Product Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Product Name</label>
            <input
              type="text"
              placeholder="Enter product name"
              value={productData.name}
              onChange={(e) => setProductData({ ...productData, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <select
              value={productData.category}
              onChange={(e) => setProductData({ ...productData, category: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Price ($)</label>
            <input
              type="number"
              step="0.01"
              min="0"
              placeholder="Enter price"
              value={productData.price}
              onChange={(e) => setProductData({ ...productData, price: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Quantity */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Quantity in Stock</label>
            <input
              type="number"
              min="0"
              placeholder="Enter quantity"
              value={productData.quantity}
              onChange={(e) => setProductData({ ...productData, quantity: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
        </div>

        {/* Product Description (Full Width) */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Product Description</label>
          <textarea
            placeholder="Enter product description"
            value={productData.description}
            onChange={(e) => setProductData({ ...productData, description: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            rows={4}
            required
          />
        </div>

        {/* File Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Product Image</label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer relative">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              id="fileUpload"
              required={!productData.image}
            />
            <label htmlFor="fileUpload" className="block cursor-pointer">
              <Upload className="mx-auto text-gray-400 mb-2" size={24} />
              <p className="text-sm text-gray-600">Upload Product Image</p>
            </label>

            {/* Image Preview */}
            {imageUrl && (
              <img
                src={imageUrl}
                alt="Product Preview"
                className="mt-3 mx-auto rounded-md max-h-40 object-contain"
              />
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-4 mt-6">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="px-4 py-2 border border-gray-400 rounded-md hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "Creating Product..." : "Create Product"}
          </button>
        </div>
      </form>
    </div>
  </div>
  );
}