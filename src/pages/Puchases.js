import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getProduct } from "../store/action/productaction";
import { createPurchases } from "../store/action/purchasesaction";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Purchases = () => {
  // State dan dispatch
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formData, setFormData] = useState({
    jumlah: 1,
    product_id: "",
    harga: "",
  });
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const data = useSelector((state) => state.getProductReducer.product);
  const dataproduct = Array.isArray(data) ? data : [data];

  // Ambil data produk
  useEffect(() => {
    if (location.pathname.includes("/purchases")) {
      dispatch(getProduct());
    }
  }, [location, dispatch]);

  const handleBuyClick = (product) => {
    const totalHarga = product.data.harga * formData.jumlah;
    setSelectedProduct(product);
    setFormData({
      jumlah: 1,
      product_id: product.data.id,
      harga: totalHarga,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = { ...formData, [name]: value };
    if (name === "jumlah") {
      updatedFormData.harga = selectedProduct.data.harga * value;
    }
    setFormData(updatedFormData);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(createPurchases(formData));
    toast.success("Pembelian berhasil dilakukan!", {
      position: "top-center",
      autoClose: 3000,
    });
    navigate("/purchases");

    setSelectedProduct(null);
    setFormData({ jumlah: 1, product_id: "", harga: "" });
  };

  return (
    <div className="container mx-auto p-6">
      <ToastContainer />
      <h2 className="text-4xl font-extrabold text-center text-blue-600 mb-6">
        ✨ Purchases ✨
      </h2>
      <div className="flex space-x-8">
        {/* Kolom Cart */}
        <div className="w-8/12">
          <div className="space-y-4">
            {dataproduct.map((product) => (
              <div
                key={product.id}
                className="bg-gradient-to-br from-blue-200 to-blue-50 p-6 rounded-lg shadow-lg"
              >
                <h3 className="text-2xl font-bold text-gray-800">{product.data.namaproduct}</h3>
                <p className="text-gray-600">Category: {product.data.Category}</p>
                <p className="text-green-500 font-semibold">${product.data.harga}</p>
                <button
                  className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700"
                  onClick={() => handleBuyClick(product)}
                >
                  🛒 Beli Sekarang
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Form Pembelian */}
        <div className="w-4/12">
          {selectedProduct && (
            <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-gray-200">
              <h3 className="text-3xl font-bold text-gray-700 mb-4">📝 Form Pembelian</h3>
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <label className="block text-gray-600">Nama Produk</label>
                  <input
                    type="text"
                    value={selectedProduct.data.namaproduct}
                    disabled
                    className="w-full p-2 border rounded-lg bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-gray-600">Harga Satuan</label>
                  <input
                    type="text"
                    value={`$${selectedProduct.data.harga}`}
                    disabled
                    className="w-full p-2 border rounded-lg bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-gray-600">Jumlah</label>
                  <input
                    type="number"
                    name="jumlah"
                    value={formData.jumlah}
                    onChange={handleInputChange}
                    min="1"
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-gray-600">Total Harga</label>
                  <input
                    type="text"
                    value={`$${formData.harga}`}
                    disabled
                    className="w-full p-2 border rounded-lg bg-gray-100"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 shadow-md"
                >
                  ✅ Konfirmasi Pembelian
                </button>
                <button
                  type="button"
                  className="w-full py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
                  onClick={() => setSelectedProduct(null)}
                >
                  ❌ Batal
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Purchases;
