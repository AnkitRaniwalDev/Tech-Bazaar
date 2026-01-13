import React from 'react';
import { toast}  from 'react-hot-toast';

function Card({ item }) {

   const AddToCart = async () => {
    const token = localStorage.getItem("token");
    
    if (!token) {
         toast.success("Please Login First to add items!");
        return;
    }

    try {
        const response = await fetch("https://tech-bazaar-z546.onrender.com/cart/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            },
            body: JSON.stringify({
                productId: item._id,
                title: item.title || item.name,
                price: item.price,
                image: item.image,
                quantity: 1
            })
        });

        const data = await response.json();

        if (response.ok) {
            toast.success("Item added to cart!");
        } else {
             toast.success("Failed: " + data.message);
        }

    } catch (error) {
        console.log(error);
    }
};
 

    return (
      
    <div className="flex flex-col h-[450px] w-full bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden group">
     
      <div className="h-52 w-full bg-[#f9f9f9] flex items-center justify-center p-4 overflow-hidden">
        <img 
          src={item.image} 
          alt={item.name} 
          className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-300" 
        />
      </div>

   
      <div className="p-4 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-gray-800 text-base truncate flex-1 mr-2">
            {item.name}
          </h3>
          <span className="text-[10px] bg-pink-100 text-pink-600 font-bold px-2 py-1 rounded">
            {item.category}
          </span>
        </div>

        <p className="text-gray-500 text-xs line-clamp-2 mb-4">
          {item.description}
        </p>

       
        <div className="mt-auto flex justify-between items-center pt-3 border-t border-gray-50">
          <span className="font-extrabold text-lg text-gray-900">₹{item.price}</span>
          <button 
            onClick={() => {
              AddToCart(item);
              
            }}
            className="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
          >
            Add Cart
          </button>
        </div>
      </div>
    </div>
  
    );
}

export default Card;