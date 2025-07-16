import React from "react";
import { Product } from "../types/Product";

interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
  isDeleting?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onEdit,
  onDelete,
  isDeleting = false,
}) => {
  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  const getStockStatus = (stock: number): { text: string; color: string } => {
    if (stock === 0) {
      return { text: "Out of Stock", color: "text-red-600 bg-red-100" };
    } else if (stock < 10) {
      return { text: "Low Stock", color: "text-orange-600 bg-orange-100" };
    } else {
      return { text: "In Stock", color: "text-green-600 bg-green-100" };
    }
  };

  const stockStatus = getStockStatus(product.stock);

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      {/* Product Image */}
      <div className="relative h-48 bg-gray-200 overflow-hidden">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = "none";
              target.nextElementSibling?.classList.remove("hidden");
            }}
          />
        ) : null}
        <div
          className={`absolute inset-0 flex items-center justify-center ${
            product.imageUrl ? "hidden" : ""
          }`}
        >
          <svg
            className="w-16 h-16 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>

        {/* Category Badge */}
        <div className="absolute top-2 left-2">
          <span className="px-2 py-1 text-xs font-medium text-white bg-blue-600 rounded-full capitalize">
            {product.category}
          </span>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
          {product.name}
        </h3>

        <p className="text-gray-600 text-sm mb-3 line-clamp-3">
          {product.description}
        </p>

        <div className="flex items-center justify-between mb-4">
          <span className="text-xl font-bold text-blue-600">
            {formatPrice(product.price)}
          </span>
          <span
            className={`px-2 py-1 text-xs font-medium rounded-full ${stockStatus.color}`}
          >
            {stockStatus.text}
          </span>
        </div>

        <div className="text-sm text-gray-500 mb-4">
          <span>Stock: {product.stock} units</span>
          {product.createdAt && (
            <div className="mt-1">
              Added: {new Date(product.createdAt).toLocaleDateString()}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(product)}
            className="flex-1 px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-md hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          >
            <svg
              className="w-4 h-4 mr-1 inline"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
            Edit
          </button>

          <button
            onClick={() => onDelete(product._id!)}
            disabled={isDeleting}
            className="flex-1 px-3 py-2 text-sm font-medium text-red-600 bg-red-50 border border-red-200 rounded-md hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isDeleting ? (
              <svg
                className="animate-spin w-4 h-4 mr-1 inline"
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
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : (
              <svg
                className="w-4 h-4 mr-1 inline"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            )}
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
