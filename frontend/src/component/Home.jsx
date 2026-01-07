import React, { use } from 'react';
import Navbar from "./Navbar";
import Banner from "./HeroSection";
import Product from './Product';
import { useState } from 'react';
import Footer from './Footer';




function Home() {
    const[search ,SetSearch]=useState("")

  return (
    <>
      <Navbar  SetSearch={SetSearch}/>
      <Banner />
      <Product search={search}/>
      <Footer/>
      
    
    
    
     
    </>
  );
}

export default Home;