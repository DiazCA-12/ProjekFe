import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getPurchases, deletePurchases } from "../store/action/purchasesaction";

const History = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const data = useSelector((state) => state.getPurchasesReducer.purchases);
  const datahistory = Array.isArray(data) ? data : [data];

  useEffect(() => {
    if (location.pathname.includes("/history")) {
      dispatch(getPurchases());
    }
  }, [location, dispatch]);
  const handleDelete = (id) => {
    dispatch(deletePurchases(id));
    navigate("/history")
  };
  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-6">Purchase History</h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full text-left border-collapse border border-gray-300 shadow-lg">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 border border-gray-300">Item Name</th>
              <th className="px-4 py-2 border border-gray-300">Purchase Date</th>
              <th className="px-4 py-2 border border-gray-300">Price</th>
              <th className="px-4 py-2 border border-gray-300">Action</th>
            </tr>
          </thead>
          <tbody>
            {datahistory.length > 0 ? (
              datahistory.map((item, index) => (
                <tr
                  key={item.id}
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
                >
                  <td className="px-4 py-2 border border-gray-300 font-semibold">{item.data.namaproduct}</td>
                  <td className="px-4 py-2 border border-gray-300">{item.data.jumlah}</td>
                  <td className="px-4 py-2 border border-gray-300 text-green-500 font-semibold">
                    ${item.data.harga}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    <button
                      onClick={() => handleDelete(item.data.id)} 
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="px-4 py-2 border border-gray-300 text-center text-gray-500">
                  No purchase history available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

};

export default History;
