import React from "react";
import { Link } from "react-router";
import Header from "../Components/Header/Header";

function PageNotFound() {
   return (
      <>
         <Header />
         <h1>PageNotFound</h1>
         <p>
            to go to the home page <Link to={"/"}>click here</Link>
         </p>
      </>
   );
}

export default PageNotFound;
