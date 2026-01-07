import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="bg-white font-sans relative">
         <Link to="/"  className=" hidden lg:flex absolute top-4 right-6 text-3xl font-bold text-gray-400 hover:text-red-500 transition-colors" >&times;</Link>
         <Link to="/" className=' lg:hidden absolute top-4 right-4 text-2xl font-bold text-gray-500 hover:text-red-500  '><span className="text-2xl">←</span></Link>
      {/* 1. HERO SECTION */}
      <section className="bg-gray-100 py-20 px-10 flex flex-col items-center text-center">
        <h1 className="text-5xl font-black text-gray-900 mb-4 tracking-tight">
          Level Up Your Tech Game
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl">
          Discover the latest in boAt earphones, smartwatches, and gadgets at unbeatable prices.
        </p>
        <Link 
          to="/shop" 
          className="  bg-teal-600 hover:bg-teal-700 text-white px-10 py-4 rounded-full font-bold text-lg transition-all shadow-lg"
        >
          Shop Now
        </Link>
      </section>
      

      {/* 2. CATEGORY QUICK LINKS */}
      <section className="py-16 px-10 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Popular Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Category Card 1 */}
          <div className="bg-blue-50 p-10 rounded-3xl flex flex-col items-center hover:shadow-xl transition-shadow cursor-pointer border border-blue-100">
            <span className="text-4xl mb-4">🎧</span>
            <h3 className="text-xl font-bold">Earphones</h3>
          </div>

          {/* Category Card 2 */}
          <div className="bg-orange-50 p-10 rounded-3xl flex flex-col items-center hover:shadow-xl transition-shadow cursor-pointer border border-orange-100">
            <span className="text-4xl mb-4">⌚</span>
            <h3 className="text-xl font-bold">Smartwatches</h3>
          </div>

          {/* Category Card 3 */}
          <div className="bg-green-50 p-10 rounded-3xl flex flex-col items-center hover:shadow-xl transition-shadow cursor-pointer border border-green-100">
            <span className="text-4xl mb-4">💻</span>
            <h3 className="text-xl font-bold">Laptops</h3>
          </div>

        </div>
      </section>

      {/* 3. TRUST SECTION (SIMPLE) */}
      <section className="bg-gray-900 text-white py-12 px-10 text-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto">
          <div>
            <p className="font-bold text-lg">🚚 Free Shipping</p>
            <p className="text-gray-400 text-sm">On all orders above ₹999</p>
          </div>
          <div>
            <p className="font-bold text-lg">🛡️ 1 Year Warranty</p>
            <p className="text-gray-400 text-sm">Genuine boAt products</p>
          </div>
          <div>
            <p className="font-bold text-lg">💳 Secure Payment</p>
            <p className="text-gray-400 text-sm">100% Protected transactions</p>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;