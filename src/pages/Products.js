import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getProduct,
  createProduct,
  deleteProduct,
  updateProduct,
} from "../store/action/productaction";

const DEFAULT_IMAGE_URL =
  "https://image.freepik.com/free-vector/pets-shop-logo-with-dog-cat-parrot-illustration_162786-75.jpg"; // Default image URL

const Products = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const data = useSelector((state) => state.getProductReducer.product);
  const dataproduct = Array.isArray(data) ? data : [data];

  const [newProduct, setNewProduct] = useState({
    namaproduct: "",
    harga: "",
    Category: "",
    imageUrl: "",
  });
  const [editProduct, setEditProduct] = useState(null);
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  useEffect(() => {
    if (location.pathname.includes("/products")) {
      dispatch(getProduct());
    }
  }, [location, dispatch]);

  const filteredProducts = dataproduct.filter((item) => {
    const productNameMatch = item.data.namaproduct
      .toLowerCase()
      .includes(search.toLowerCase());
    const categoryMatch =
      filterCategory === "" || item.data.Category === filterCategory;
    return productNameMatch && categoryMatch;
  });

  const handleAddProductClick = () => {
    setEditProduct(null);
    setNewProduct({ namaproduct: "", harga: "", Category: "", imageUrl: "" });
    setIsModalOpen(true);
  };

  const handleEditProduct = (product) => {
    setEditProduct(product);
    setNewProduct({
      id: product.id,
      namaproduct: product.namaproduct,
      harga: product.harga,
      Category: product.Category,
      imageUrl: product.imageUrl,
    });
    setIsModalOpen(true);
  };

  const handleDeleteProduct = (id) => {
    dispatch(deleteProduct(id));
    setPopupMessage("Product berhasil dihapus.");
    setTimeout(() => setPopupMessage(""), 2000);
    navigate("/products");
  };

  const handleAddOrUpdateProduct = (e) => {
    e.preventDefault();
    if (editProduct) {
      dispatch(updateProduct(newProduct));
      setPopupMessage("Product berhasil diupdate.");
    } else {
      dispatch(createProduct(newProduct));
      setPopupMessage("Product berhasil ditambahkan.");
    }
    setTimeout(() => setPopupMessage(""), 2000);
    setIsModalOpen(false);
    setNewProduct({ namaproduct: "", harga: "", Category: "", imageUrl: "" });
    setEditProduct(null);
  };

  return (
    <div className="container mx-auto p-8 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold text-gray-700">Product Management</h1>
        <button
          className="py-3 px-5 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold rounded-lg shadow-lg hover:from-blue-600 hover:to-blue-800 transform hover:scale-105 transition-all"
          onClick={handleAddProductClick}
        >
          + Add Product
        </button>
      </div>

      {/* Search & Filter */}
      <div className="flex justify-between items-center space-x-4">
        <input
          type="text"
          placeholder="Search by Product Name"
          className="w-1/2 p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="w-1/3 p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="makanan">Makanan</option>
          <option value="mainan">Mainan</option>
          <option value="Accessories">Accessories</option>
          <option value="Furniture">Furniture</option>
        </select>
      </div>

      {/* Product Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((item) => (
          <div
            key={item.data.id}
            className="relative bg-white p-5 rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition duration-300 transform hover:scale-105"
          >
            <img
              src={item.data.imageUrl || DEFAULT_IMAGE_URL}
              alt={item.data.namaproduct}
              className="w-full h-40 object-cover rounded-md mb-4"
            />
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">
              {item.data.namaproduct}
            </h3>
            <p className="text-gray-600">Category: {item.data.Category}</p>
            <p className="text-green-500 font-bold text-lg">
              ${item.data.harga}
            </p>
            <div className="mt-4 flex justify-between">
              <button
                className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={() => handleEditProduct(item.data)}
              >
                Update
              </button>
              <button
                className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={() => handleDeleteProduct(item.data.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 shadow-2xl w-full max-w-md">
            <h2 className="text-2xl font-bold text-center mb-4">
              {editProduct ? "Update Product" : "Add Product"}
            </h2>
            <form onSubmit={handleAddOrUpdateProduct} className="space-y-4">
              <input
                type="text"
                placeholder="Product Name"
                className="w-full p-3 border rounded-lg"
                value={newProduct.namaproduct}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, namaproduct: e.target.value })
                }
              />
              <input
                type="number"
                placeholder="Product Price"
                className="w-full p-3 border rounded-lg"
                value={newProduct.harga}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, harga: e.target.value })
                }
              />
              <select
                className="w-full p-3 border rounded-lg"
                value={newProduct.Category}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, Category: e.target.value })
                }
              >
                <option value="">Select Category</option>
                <option value="makanan">Makanan</option>
                <option value="mainan">Mainan</option>
                <option value="Accessories">Accessories</option>
                <option value="Furniture">Furniture</option>
              </select>
              <button
                type="submit"
                className="w-full py-3 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                {editProduct ? "Update Product" : "Add Product"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Popup Message */}
      {popupMessage && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg">
          {popupMessage}
        </div>
      )}
    </div>
  );
};

export default Products;
