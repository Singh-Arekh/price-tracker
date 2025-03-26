import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/products/${id}`);
        if (!response.ok) throw new Error("Product not found");
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError("Product not found");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <p className="text-center mt-10 text-lg">Loading...</p>;
  if (error) return <p className="text-center text-red-500 mt-10 text-lg">{error}</p>;

  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      {/* Product Section */}
      <div className="flex flex-col md:flex-row items-center space-y-8 md:space-y-0 md:space-x-8">
        {/* Image Section */}
<div className="bg-white p-4 rounded-lg shadow-lg flex-1 flex justify-center items-center">
  <img
    src={product.image}
    alt={product.title}
    className="w-full h-auto max-h-[400px] object-contain aspect-[4/3] rounded-lg"
  />
</div>


        <div className="flex-1 min-h-full flex items-center">
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4">
              {product.title}
            </h1>

            <a
              href={product.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline mb-4 inline-block"
            >
              Visit Product
            </a>

            <div className="flex items-center space-x-4 mb-6">
              <p className="text-2xl font-semibold text-gray-800">({product.discount}) ₹{product.currentPrice}</p>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <p className="font-semibold">{product.reviews}</p>
                <p>({product.reviewCount} reviews)</p>
              </div>
            </div>

            <button
              onClick={() => alert("Tracking price...")}
              className="py-3 px-6 w-full bg-gray-800 text-white text-lg rounded-3xl shadow-md hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ease-in-out"
            >
              Track Price
            </button>
          </div>
        </div>
      </div>

      <div className="mt-12 w-full bg-gray-50 p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Product Description</h2>
        <p className="text-gray-700">{product.description}</p>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Price History</h2>
        <div className="overflow-x-auto bg-white rounded-lg shadow-md p-4">
          <table className="min-w-full text-sm text-left">
            <thead>
              <tr className="border-b">
                <th className="py-2 px-4">Date</th>
                <th className="py-2 px-4">Price</th>
              </tr>
            </thead>
            <tbody>
              {product.priceHistory.map((entry, index) => (
                <tr key={index} className="border-b hover:bg-gray-100">
                  <td className="py-2 px-4">{new Date(entry.date).toLocaleDateString()}</td>
                  <td className="py-2 px-4">₹{entry.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
