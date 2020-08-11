import React from "react";
import NavBarHeader from "./NavBarHeader";
import Footer from "./Partials/Footer";

export default ({ children }) => {
  return (
    <div>
      <NavBarHeader/>
      {children}
      <Footer/>
    </div>
  )
};
