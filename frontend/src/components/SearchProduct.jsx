import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchProduct = () => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!url) {
      setError("Please enter a valid Amazon URL");
      return;
    }
  
    setLoading(true);
    setError("");
  
    try {
      const response = await fetch("http://localhost:8000/api/products/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        navigate(`/products/${data._id}`);
      } else {
        setError(data.message || "Failed to fetch product details");
      }
    } catch (err) {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-indigo-100">
      <div className="bg-white p-8 sm:p-10 rounded-xl shadow-lg w-full max-w-xl">
        <div className="text-center">
          <h2 className="text-4xl sm:text-5xl font-semibold text-gray-800 mb-6">
            Search for Your Amazon Product
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Enter the Amazon product URL to view the product details, price history, and more.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
            {/* Search bar */}
            <input
              type="text"
              placeholder="Enter Amazon product URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full sm:w-96 px-6 py-3 text-lg rounded-xl border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ease-in-out"
            />
            {/* Search button */}
            <button
              onClick={handleSearch}
              className="w-full sm:w-auto py-3 px-6 bg-blue-600 text-white text-lg rounded-xl shadow-md hover:bg-blue-700 focus:ring-4 focus:ring-blue-500 transition-all ease-in-out"
              disabled={loading}
            >
              {loading ? "Searching..." : "Search"}
            </button>
          </div>
          {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default SearchProduct;
