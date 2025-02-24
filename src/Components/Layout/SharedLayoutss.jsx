import React from "react";
import Header from "../Header/Header";
import { Outlet } from "react-router";
import Footer from "../Footer/Footer";
("rea");
function SharedComponent() {
   return (
      <>
         <Header />
         <Outlet />
         <Footer />
      </>
   );
}

export default SharedComponent;
