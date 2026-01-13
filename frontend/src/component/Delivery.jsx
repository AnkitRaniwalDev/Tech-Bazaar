import React, { useState, useEffect } from "react";
import {useNavigate} from 'react-router-dom';
import { Link } from "react-router-dom";
import { toast } from 'react-hot-toast';

const Delivery = () => {
  const [ cartItemsShow, setCartItemsShow] = useState([]);   //backend se cart items lene ke liye
  useEffect(() => {
    const getCart = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await fetch("https://tech-bazaar-z546.onrender.com/cart/get", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": token,
          },
        });

        const data = await response.json();
        if (response.ok) {
         setCartItemsShow(data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getCart(); 
  }, []);
 
 const navigate=useNavigate();

 const [deliveryInfo, setDeliveryInfo] = useState({
    fullName: "",
    mobileNumber: "",
    address: "",
    city: "",
    pincode: "",
    state: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDeliveryInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  
 const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      if (!token) return;

       const orderData = {
        ...deliveryInfo,cartItems: cartItemsShow       //cartItems: ye lika h ab isme cart ka item h to backend me yhi same name likna pedga or isi ke ander arry banaa ker item ki name price sab ko bakckend ke schema me [{}] likana pedega //
        
      };

     const response = await fetch("https://tech-bazaar-z546.onrender.com/order/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token,
        },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Order Placed Successfully!");
        navigate("/");
        
        
      } 
    } 
    catch (error) {
      console.log(error);
    } 
  
  };
 
  

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4 relative">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-xl p-8 relative">
        <Link to="/" className='  hidden lg:flex  absolute top-4 right-4 text-xl font-bold text-gray-500 hover:text-red-500'>✕</Link>
        <Link to="/" className=' lg:hidden absolute top-4 right-4 text-2xl font-bold text-gray-500 hover:text-red-500  '><span className="text-2xl">←</span></Link>
        <h1 className="text-2xl font-bold mb-6">Delivery Address</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-gray-700">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={deliveryInfo.fullName}
              onChange={handleChange}
              className="w-full border p-2 rounded bg-gray-100"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Mobile Number</label>
            <input
              type="text"
              name="mobileNumber"
              value={deliveryInfo.mobileNumber}
              onChange={handleChange}
              className="w-full border p-2 rounded bg-gray-100"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Full Address</label>
            <textarea
              name="address"
              value={deliveryInfo.address}
              onChange={handleChange}
              className="w-full border p-2 rounded bg-gray-100"
              required
            ></textarea>
          </div>
          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block text-gray-700">City</label>
              <input
                type="text"
                name="city"
                value={deliveryInfo.city}
                onChange={handleChange}
                className="w-full border p-2 rounded bg-gray-100"
                required
              />
            </div>
            <div className="w-1/2">
              <label className="block text-gray-700">Pincode</label>
              <input
                type="text"
                name="pincode"
                value={deliveryInfo.pincode}
                onChange={handleChange}
                className="w-full border p-2 rounded bg-gray-100"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-gray-700">State</label>
            <input
              type="text"
              name="state"
              value={deliveryInfo.state}
              onChange={handleChange}
              className="w-full border p-2 rounded bg-gray-100"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-orange-500 text-white py-2 rounded font-bold hover:bg-orange-600 mt-4"
          >
            Confirm Order
          </button>
        </form>
      </div>

    </div>
  );
};

export default Delivery;