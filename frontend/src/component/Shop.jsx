import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const Shop = ({ addToCart }) => {
  const [products, setProducts] = useState([]);            
  const [filteredProducts, setFilteredProducts] = useState([]);  // products ko filter karne ke liye
  const [activeCategory, setActiveCategory] = useState('All');  //list kee category ko bedlne ke liye
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // mobile sidebar responsive

  const categories = ['All', 'Earphones', 'Smartwatches', 'Laptops', 'Mobiles'];

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const res = await fetch("http://localhost:3000/product/products");  
        const data = await res.json();
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) { console.log(error); }
    };
    fetchAllProducts();
  }, []);

  useEffect(() => {
    if (activeCategory === 'All') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(p => p.category === activeCategory));
    }
    setIsSidebarOpen(false); // category select karne ke baad sidebar band kar de mobile me
  }, [activeCategory, products]);




   const AddToCart = async (item) => {
    const token = localStorage.getItem("token");
    
    if (!token) {
        toast.success("Please Login First to add items!");
        return;
    }

    try {
        const response = await fetch("http://localhost:3000/cart/add", {
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
    <div className="flex min-h-screen bg-white font-sans relative">
         <Link to="/"  className=" hidden lg:flex absolute top-4 right-6 text-3xl font-bold text-gray-400 hover:text-red-500 transition-colors" >&times;</Link>
        <Link to="/" className=' lg:hidden absolute top-4 right-4 text-2xl font-bold text-gray-500 hover:text-red-500  '><span className="text-2xl">←</span></Link>
      {/* mobile ke button */}
      <button 
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="lg:hidden fixed bottom-6 right-6 z-50 bg-[#232f3e] text-white p-4 rounded-full shadow-2xl"
      >
        {isSidebarOpen ? '✕' : 'Filters'}
      </button>

      {/* response mobile or laptop fix */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-gray-50 p-6 border-r border-gray-100 transition-transform duration-300 transform
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
        lg:translate-x-0 lg:static lg:h-screen lg:sticky lg:top-0
      `}>
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-lg font-bold text-gray-700">Filter By</h3>
          <Link to="/" className="text-gray-400 hover:text-red-500 lg:hidden text-2xl">&times;</Link>
        </div>
        
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Categories</p>
        <div className="flex flex-col gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-left px-4 py-2 rounded-md text-sm transition-colors ${
                activeCategory === cat ? 'bg-teal-600 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </aside>

      {/*our product */}
      <main className="flex-1 p-4 lg:p-10">
        <div className="flex justify-between items-center mb-8 border-b border-gray-50 pb-4">
          <h2 className="text-xl font-semibold text-gray-800 tracking-tight">
            Our <span className="text-teal-600 font-normal">{activeCategory}</span> Items
          </h2>
         
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-8">
          {filteredProducts.map((item) => (
            <div key={item._id} className="bg-white rounded-lg p-3 lg:p-5 border border-gray-100 hover:border-teal-100 transition-all group">
              <div className="h-32 lg:h-48 w-full mb-3 flex justify-center overflow-hidden bg-gray-50 rounded">
                <img src={item.image} alt={item.name} className="max-h-full object-contain mix-blend-multiply" />
              </div>
                <h3 className="text-sm font-medium text-gray-700 mb-1 h-10 overflow-hidden leading-snug">
                {item.name}
              </h3>
              <p className="text-xs text-gray-400 mb-2">{item.category}</p>
              
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-2 pt-2 border-t border-gray-50">
                <p className="text-base font-bold text-gray-900">₹{item.price}</p>
                <button 
                  onClick={() => AddToCart(item)}
                  className="w-full lg:w-auto px-3 py-1.5 bg-[#ffd814] hover:bg-yellow-400 text-[11px] font-bold rounded shadow-sm transition-colors"
                >
                  + Add
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Shop;