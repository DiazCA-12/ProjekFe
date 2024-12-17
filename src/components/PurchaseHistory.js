import React from 'react';

const PurchaseHistory = ({ history }) => {
  return (
    <div className="container mx-auto my-8">
      <h1 className="text-2xl font-bold mb-4">Purchase History</h1>
      <ul className="list-none">
        {history.map((item, index) => (
          <li key={index} className="bg-white p-4 mb-4 shadow-md rounded">
            <p className="font-semibold">{item.name}</p>
            <p>Price: ${item.price}</p>
            <p>Quantity: {item.quantity}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PurchaseHistory;
