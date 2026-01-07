import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="bg-white font-sans min-h-screen selection:bg-teal-100 relative">
           <Link to="/"  className=" hidden lg:flex absolute top-4 right-6 text-3xl font-bold text-gray-400 hover:text-red-500 transition-colors transition-all z-50" >&times;</Link>
          <Link to="/" className=' lg:hidden absolute top-4 right-4 text-2xl font-bold text-gray-500 hover:text-red-500 transition-all z-50'><span className="text-2xl">←</span></Link>
      {/* 1. HERO SECTION (सुंदर बैकग्राउंड के साथ) */}
      <section className="relative py-24 px-10 text-center bg-gradient-to-b from-gray-50 to-white overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-10 left-10 w-32 h-32 bg-teal-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-blue-400 rounded-full blur-3xl"></div>
        </div>
        
        <h1 className="relative text-5xl md:text-7xl font-black text-gray-900 mb-6 tracking-tighter">
          Our <span className="text-teal-600">Story</span>
        </h1>
        <p className="relative text-gray-500 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          Building the future of tech commerce, one gadget at a time. We don't just sell electronics; we deliver experiences.
        </p>
      </section>

      {/* 2. MISSION SECTION (Hover Effect वाला कार्ड) */}
      <section className="py-20 px-10 max-w-6xl mx-auto">
        <div className="group bg-white p-10 md:p-16 rounded-[40px] border border-gray-100 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 ease-out grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block px-4 py-1 bg-teal-100 text-teal-700 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
              Mission 2026
            </span>
            <h2 className="text-4xl font-bold text-gray-800 mb-6">Empowering Tech Lovers</h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              At <strong>TachBazaar</strong>, we bridge the gap between premium technology and affordable pricing. Every product in our catalog is a promise of quality.
            </p>
            <div className="w-20 h-1.5 bg-teal-500 rounded-full group-hover:w-40 transition-all duration-500"></div>
          </div>
          <div className="text-9xl text-center grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-110">
            ⚡
          </div>
        </div>
      </section>

      {/* 3. WHY US SECTION (बड़े और सुंदर कार्ड्स) */}
      <section className="py-24 px-10 bg-gray-50">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-black mb-16 text-gray-900">Why People Love Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            
            {/* Card 1 */}
            <div className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 hover:shadow-2xl hover:-translate-y-4 transition-all duration-500 group">
              <div className="w-16 h-16 bg-teal-50 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:bg-teal-500 group-hover:text-white transition-colors duration-300">
                💎
              </div>
              <h3 className="font-bold text-2xl mb-4 text-gray-800">Authenticity</h3>
              <p className="text-gray-500 leading-relaxed">100% Original products sourced directly from brands like boAt.</p>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 hover:shadow-2xl hover:-translate-y-4 transition-all duration-500 group">
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:bg-blue-500 group-hover:text-white transition-colors duration-300">
                🚀
              </div>
              <h3 className="font-bold text-2xl mb-4 text-gray-800">Fast Delivery</h3>
              <p className="text-gray-500 leading-relaxed">Experience lightning-fast shipping across the entire country.</p>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 hover:shadow-2xl hover:-translate-y-4 transition-all duration-500 group">
              <div className="w-16 h-16 bg-purple-50 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:bg-purple-500 group-hover:text-white transition-colors duration-300">
                🔒
              </div>
              <h3 className="font-bold text-2xl mb-4 text-gray-800">Secure</h3>
              <p className="text-gray-500 leading-relaxed">Your data and payments are protected by world-class security.</p>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};

export default About;