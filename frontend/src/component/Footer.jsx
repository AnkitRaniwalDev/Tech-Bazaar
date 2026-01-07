import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    // 'bg-white' के साथ 'shadow-2xl' का इस्तेमाल किया है ताकि यह पीछे वाले पेज से अलग दिखे
    <footer className="bg-white border-t border-gray-200 pt-16 pb-8 px-10 shadow-[0_-10px_30px_rgba(0,0,0,0.03)]">  
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        
        {/* 1. Brand Section - गहरे काले रंग का टेक्स्ट */}
        <div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tighter mb-4">
            Tach<span className="text-teal-600">Bazaar</span>
          </h2>
          <p className="text-gray-700 text-sm leading-relaxed font-medium">
            Building the future of tech commerce. Every gadget is a promise of quality and style.
            
          </p>
        </div>

        {/* 2. Shop Links - 'hover' करने पर रंग बदलेगा */}
        <div>
          <h3 className="font-bold text-gray-900 mb-6 text-lg uppercase tracking-wider">Explore</h3>
          <ul className="text-gray-600 text-[15px] space-y-4">
            <li><Link to="/shop" className="hover:text-teal-600 hover:font-bold transition-all">Earphones</Link></li>
            <li><Link to="/shop" className="hover:text-teal-600 hover:font-bold transition-all">Smartwatches</Link></li>
            <li><Link to="/shop" className="hover:text-teal-600 hover:font-bold transition-all">Laptops</Link></li>
          </ul>
        </div>

        {/* 3. Company - साफ़ और बोल्ड टेक्स्ट */}
        <div>
          <h3 className="font-bold text-gray-900 mb-6 text-lg uppercase tracking-wider">Company</h3>
          <ul className="text-gray-600 text-[15px] space-y-4">
            <li><Link to="/about" className="hover:text-teal-600 hover:font-bold transition-all">Our Story</Link></li>
            <li><Link to="/" className="hover:text-teal-600 hover:font-bold transition-all">Privacy Policy</Link></li>
            <li><Link to="/" className="hover:text-teal-600 hover:font-bold transition-all">Terms of Use</Link></li>
          </ul>
        </div>

        {/* 4. Newsletter - डार्क बैकग्राउंड वाला बॉक्स ताकि अलग दिखे */}
        <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100 shadow-inner group hover:border-teal-200 transition-colors">
          <h3 className="font-bold text-gray-900 mb-2">Be an Insider</h3>
          <p className="text-xs text-gray-600 mb-5 font-medium italic">Get the latest boAt deals first.</p>
          <div className="flex gap-2">
            <input 
              type="email" 
              placeholder="Your Email" 
              className="bg-white border border-gray-300 rounded-xl px-4 py-2 text-sm w-full focus:ring-2 focus:ring-teal-500/30 outline-none text-gray-900"
            />
            <button className="bg-gray-900 text-white px-5 py-2 rounded-xl text-xs font-black hover:bg-teal-600 transition-all active:scale-90">
              OK
            </button>
          </div>
        </div>

      </div>

      {/* कॉपीराइट - छोटे लेकिन साफ़ अक्षरों में */}
      <div className="max-w-6xl mx-auto border-t border-gray-100 pt-8 text-center">
        <p className="text-gray-400 text-[11px] uppercase tracking-[0.4em] font-black">
          © 2026 TACHBAZAAR | PREMIUM TECH STORE
        </p>
      </div>
    </footer>
  );
};

export default Footer;