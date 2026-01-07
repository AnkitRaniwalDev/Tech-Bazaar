import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";


const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const getCart = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await fetch("http://localhost:3000/cart/get", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": token
          },
        });

        const data = await response.json();

        if (response.ok) {
          setCartItems(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getCart();
  }, []);

 const handleQuantity = async (productId, type) => {
    const token = localStorage.getItem("token");
    const res = await fetch(`http://localhost:3000/update/update/${productId}/${type}`, {
        method: "PUT",
        headers: {
            "Authorization": token
        }
    });
    const data = await res.json();
    if (res.ok) {
        setCartItems(data);
    }
};

const handleRemove = async (title) => {
    const token = localStorage.getItem("token");
    const res = await fetch(`http://localhost:3000/update/remove/${title}`, {
        method: "DELETE",
        headers: {
            "Authorization": token
        }
    });
    const data = await res.json();
    if (res.ok) {
        setCartItems(data);
    }
};

  const TotalPrice =
    cartItems && cartItems.length > 0
      ? cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
      : 0;

  return (
    <div className="bg-gray-100 min-h-screen py-8 relative">
      <Link to="/" className=' hidden lg:flex absolute top-4 right-4 text-2xl font-bold text-gray-500 hover:text-red-500  '>&times;</Link>
      <Link to="/" className=' lg:hidden absolute top-4 right-4 text-2xl font-bold text-gray-500 hover:text-red-500  '><span className="text-2xl">←</span></Link>
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-xl font-medium mb-4">
          Shopping Cart ({cartItems.length})
        </h1>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-3/4">
            {cartItems && cartItems.length > 0 ? (
              cartItems.map((item) => (
                <div
                  key={item._id}
                  className="bg-white shadow-sm rounded-sm p-4 mb-4 flex flex-col sm:flex-row items-start border-b border-gray-200"
                >
                  <div className="w-full sm:w-32 h-32 flex-shrink-0 flex items-center justify-center">
                    <img
                      className="max-h-full max-w-full object-contain"
                      src={item.image}
                      alt={item.title}
                    />
                  </div>

                  <div className="flex-1 sm:ml-6 mt-4 sm:mt-0 w-full">
                    <div className="flex justify-between">
                      <div>
                        <h2 className="text-lg font-medium text-gray-900 truncate w-64 sm:w-96 hover:text-blue-600">
                          {item.title}
                        </h2>
                        <p className="text-sm text-gray-500 mt-1 capitalize">
                          Category: {item.category || "General"}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">In Stock</p>
                      </div>
                      <div className="text-sm text-gray-500">
                        Delivery by 7 Days |{" "}
                        <span className="text-green-600 font-medium">Free</span>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center">
                      <span className="text-2xl font-bold text-gray-900">
                        ₹{item.price}
                      </span>
                    </div>

                    <div className="flex items-center mt-6 gap-6">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleQuantity(item.title,"dec")}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                        >
                          -
                        </button>
                        <input
                          type="text"
                          value={item.quantity}
                          readOnly
                          className="w-12 text-center border border-gray-300 py-1 text-sm font-medium"
                        />
                        <button
                          onClick={() =>handleQuantity(item.title,"inc")}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => handleRemove(item.title)}
                        className="font-medium text-gray-800 hover:text-red-600 uppercase text-sm"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center bg-white p-10 shadow-sm rounded-sm">
                <p className="text-xl mb-4">Your cart is empty.</p>
                <Link
                  to="/"
                  className="bg-blue-600 text-white px-6 py-2 rounded shadow hover:bg-blue-700"
                >
                  Shop Now
                </Link>
              </div>
            )}
          </div>

          <div className="md:w-1/4 h-fit sticky top-4">
            <div className="bg-white shadow-sm rounded-sm p-4">
              <h2 className="text-gray-500 font-bold uppercase text-sm border-b pb-3 mb-4">
                Price Details
              </h2>
              <div className="flex justify-between mb-3 text-gray-800">
                <span>Price ({cartItems.length} items)</span>
                <span>₹{TotalPrice}</span>
              </div>
              <div className="flex justify-between mb-3 text-gray-800">
                <span>Delivery Charges</span>
                <span className="text-green-600">Free</span>
              </div>
              <div className="flex justify-between border-t border-dashed border-gray-300 pt-4 mt-4 font-bold text-lg">
                <span>Total Amount</span>
                <span>₹{TotalPrice}</span>
              </div>
              <div className="mt-4 text-xs text-gray-500">
                Safe and Secure Payments.
              </div>
            </div>

            <div className="mt-4 shadow-sm rounded-sm p-4 bg-white flex justify-end">
              <Link to="/delivery">
                <button className="bg-orange-500 text-white px-10 py-3 font-medium text-lg shadow-sm hover:bg-orange-600 w-full">
                  PLACE ORDER
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;