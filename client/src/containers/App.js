import React from "react";
import NavBarHeader from "./NavBarHeader";

export default ({ children }) => {
  return (
    <div>
      <NavBarHeader/>
        {children}
    </div>
  )
};
