import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ SetSearch }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const user = localStorage.getItem("Users");  // localStorage se user data le raha hai id ko or fir profile dikhayega//

  const loginout = () => {                    // logout function  ye localStorage se user data hata dega id ko romove kardega//
    localStorage.clear();
    window.location.href = "/";
  }

  const AdminUser = localStorage.getItem("admin")=="admin"; // Admin ke liye alag se localStorage se data le raha hai //

  return (
    <div className="navbar bg-base-100 shadow-md sticky top-0 z-50">

      {/*  LEFT SIDE: Logo */}
      <div className="navbar-start">
        {/* Mobile ke liye choti screen */}
        <div className="dropdown">
          <button onClick={toggleMenu} className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
          </button >
          {isMenuOpen && (<ul className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 ">
            <li><Link to="/homepage"><a onClick={closeMenu}>Home</a></Link></li>
            <li><Link to="/shop" onClick={closeMenu}>Shop</Link></li>
            <li><Link to="/about"><a onClick={closeMenu}>About</a></Link> </li>
          
          </ul>)}
        </div>

        {/* Brand Name */}
        <a className="btn btn-ghost text-xl font-bold text-teal-600">TechBazaar</a>
      </div>

      {/* 2. CENTER: Search Bar (Bada aur Lamba) */}
      <div className="navbar-center hidden lg:flex flex-1 justify-center px-2">
        <div className="flex w-full max-w-2xl items-center">

          <input onChange={(e) => SetSearch(e.target.value)}
            type="text"
            placeholder="Search gadgets..."
            /* 'flex-1' ka matlab: Bachi hui sari jagah le lo */
            className="flex-1 h-12 px-4 rounded-l-md bg-gray-100 text-black border-2 border-gray-300 focus:outline-none focus:border-teal-600 text-lg"
          />

          <button className="h-12 px-8 rounded-r-md bg-teal-600 text-white font-bold text-lg hover:bg-teal-700">
            Search
          </button>

        </div>
      </div>

      {/* 3. RIGHT SIDE: Desktop Links & Icons */}
      <div className="navbar-end gap-2">

        {/* Desktop Links (Fixed: Click karne par Text White ho jayega) */}
        <div className="hidden lg:flex mr-4">
          <ul className="menu menu-horizontal px-1 font-medium text-base text-gray-700">
            <li><Link to="/homepage"><a className=" focus:text-white active:text-white">Home</a></Link></li>
            <li><Link to="/shop"><a className=" focus:text-white active:text-white">Shop</a></Link> </li>
            <li><Link to="/about"><a className=" focus:text-white active:text-white">About</a></Link> </li>
          
          </ul>
        </div>



        {/* Cart Icon */}
        
          <Link to="/cart" className="btn btn-ghost btn-circle">
            <div className="indicator">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
              <span className="badge badge-sm indicator-item bg-teal-600 text-white border-none">2</span>
            </div>
          </Link>
        

        {/* Profile Avatar */}
        {user ? (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full border border-gray-200">
                <img alt="User" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
              </div>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              <li><Link to="/" className="justify-between">Profile <span className="badge badge-accent">New</span></Link></li>
              <li><Link to="/orders">Orders</Link></li>
              {AdminUser &&( <li><Link to="/admin" className=' bg-lime-500 '>Admin</Link></li>)}
              <li><button onClick={loginout} className="text-red-500 font-bold">Logout</button></li>
            </ul>
          </div>
        ) : (
          <Link to="/signup" className="btn bg-teal-600 text-white hover:bg-teal-700 border-none px-6">
            Login
          </Link>
        )}
      </div>

    </div>
  );
};

export default Navbar;