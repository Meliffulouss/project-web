import React from 'react'

const OrderManagement = () => {
    const orders = [
      {
        _id: 12312321,
        user: {
          name: "John Doe",
        },
        totalPrice: 110,
        status: "Processing",
      },
    ];
  
    return <div className="max-w-7xl mx-auto p-6"></div>;
  };
  
  export default OrderManagement;