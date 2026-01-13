import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const Orders = () => {
  const [sampleOrders, setSampleOrders] = useState([])

  useEffect(() => {
    const getOrders = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) return;

            const res = await fetch("https://tech-bazaar-z546.onrender.com/order/orders", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token
                }
            });

            const data = await res.json();

            if (res.ok) {
                setSampleOrders(data);
            }
        } catch (error) {
            console.log(error);
        }
    };
    getOrders();
}, []);



  const totalPrice = (items) => {
    return items.reduce((total, item) => total + (Number(item.price) * Number(item.quantity)), 0) // item price ko dekne ke liye
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 min-h-screen relative">
        <Link to="/" className=' hidden lg:flex absolute top-4 right-4 text-xl font-bold text-gray-500 hover:text-red-500 mt-7'>✕</Link>
        <Link to="/" className=' lg:hidden absolute top-4 right-4 text-2xl font-bold text-gray-500 hover:text-red-500  '><span className="text-2xl">←</span></Link>
      <h1 className="text-3xl font-bold mb-8 text-gray-800">My Orders</h1>

      <div className="space-y-6">
        {sampleOrders.map((order, index) => (
          <div key={index} className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
            
            <div className="bg-gray-50 px-6 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gray-200">
              <div className="flex flex-col">
                <span className="text-sm text-gray-500">Order ID</span>
                <span className="font-semibold text-gray-800 text-sm">#{order._id}</span>
              </div>
              <div className="flex flex-col mt-2 sm:mt-0">
                <span className="text-sm text-gray-500">Date placed</span>
                <span className="font-medium text-gray-800 text-sm">{new Date(order.orderDate).toLocaleDateString()}</span>
              </div>
              <div className="mt-2 sm:mt-0">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                  {order.status || 'Processing'}
                </span>
              </div>
            </div>

            <div className="p-6">
              {order.cartItems.map((item, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row items-center sm:items-start mb-4 last:mb-0 pb-4 last:pb-0 border-b last:border-0 border-gray-100">
                  <div className="w-20 h-20 flex-shrink-0 bg-gray-200 rounded-md overflow-hidden">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  
                  <div className="ml-0 sm:ml-6 mt-4 sm:mt-0 flex-1 w-full">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                        <p className="mt-1 text-sm text-gray-500">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-medium text-gray-900">₹{item.price}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-between items-center">
              <span className="font-medium text-gray-600">Total Amount</span>
              <span className="text-xl font-bold text-gray-900">₹ {totalPrice(order.cartItems)}</span>
            </div>

          </div>
        ))}
      </div>
    </div>
  )
}

export default Orders