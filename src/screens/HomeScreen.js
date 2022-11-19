import React, { useEffect, useState } from "react";
import Header from "./../components/Header";
import ShopSection from "./../components/homeComponents/ShopSection";
import ContactInfo from "./../components/homeComponents/ContactInfo";
import CallToActionSection from "../components/homeComponents/CallToActionSection";
import Footer from "./../components/Footer";
const HomeScreen = ({match}) => {
  const handleClick = (e) =>{
    e.preventDefault()
    window.scrollTo(0, 0)

  }
  const [showGoToShop, setShowGoToShop] = useState(false)
  useEffect(()=>{
    const handleScroll =()=>{
      (window.innerHeight + window.scrollY) >= document.body.scrollHeight ? setShowGoToShop(true) :setShowGoToShop(false)
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
        window.removeEventListener('scroll', handleScroll)
    }
},[])

  return (
    <div >
      <Header />
      <ShopSection/>
      <CallToActionSection />
      <ContactInfo />
      <Footer />
      {showGoToShop && (<button style={{position:'fixed', right:20, bottom: 20}} onClick={handleClick}>GotoTop</button>)}
    </div>
  );
};

export default HomeScreen;
