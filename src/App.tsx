import React, { useState, useEffect } from "react";
import type {
  Product,
  CreateProductRequest,
  UpdateProductRequest,
} from "./types/Product";
import { productService } from "./services/productService";
import ProductList from "./components/ProductList";
import ProductForm from "./components/ProductForm";
import "./App.css";

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Fetch products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await productService.getAllProducts();
      setProducts(data);
    } catch (err) {
      setError("Failed to fetch products. Please try again.");
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProduct = async (productData: CreateProductRequest) => {
    try {
      setIsSubmitting(true);
      setError(null);
      const newProduct = await productService.createProduct(productData);
      setProducts((prev) => [newProduct, ...prev]);
      setShowForm(false);
    } catch (err) {
      setError("Failed to create product. Please try again.");
      console.error("Error creating product:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateProduct = async (productData: UpdateProductRequest) => {
    if (!editingProduct?._id) return;

    try {
      setIsSubmitting(true);
      setError(null);
      const updatedProduct = await productService.updateProduct(
        editingProduct._id,
        productData
      );
      setProducts((prev) =>
        prev.map((p) => (p._id === editingProduct._id ? updatedProduct : p))
      );
      setEditingProduct(null);
      setShowForm(false);
    } catch (err) {
      setError("Failed to update product. Please try again.");
      console.error("Error updating product:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }

    try {
      setIsDeleting(true);
      setDeletingId(id);
      setError(null);
      await productService.deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      setError("Failed to delete product. Please try again.");
      console.error("Error deleting product:", err);
    } finally {
      setIsDeleting(false);
      setDeletingId(null);
    }
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingProduct(null);
  };

  const handleSubmitForm = (
    data: CreateProductRequest | UpdateProductRequest
  ) => {
    if (editingProduct) {
      handleUpdateProduct(data as UpdateProductRequest);
    } else {
      handleCreateProduct(data as CreateProductRequest);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <svg
            className="animate-spin h-12 w-12 text-blue-600 mx-auto mb-4"
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
          <p className="text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Product Manager
              </h1>
              <p className="text-gray-600 mt-1">
                Manage your product inventory
              </p>
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              Add Product
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-md p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-800">{error}</p>
              </div>
              <div className="ml-auto pl-3">
                <button
                  onClick={() => setError(null)}
                  className="inline-flex text-red-400 hover:text-red-600"
                  title="Close error message"
                >
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Product Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <ProductForm
                  product={editingProduct || undefined}
                  onSubmit={handleSubmitForm}
                  onCancel={handleCancelForm}
                  isLoading={isSubmitting}
                />
              </div>
            </div>
          </div>
        )}

        {/* Products List */}
        <ProductList
          products={products}
          onEdit={handleEditProduct}
          onDelete={handleDeleteProduct}
          isDeleting={isDeleting}
          deletingId={deletingId || undefined}
        />

        {/* Empty State */}
        {!loading && products.length === 0 && !showForm && (
          <div className="text-center py-12">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              No products
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Get started by adding your first product.
            </p>
            <div className="mt-6">
              <button
                onClick={() => setShowForm(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                Add Product
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
