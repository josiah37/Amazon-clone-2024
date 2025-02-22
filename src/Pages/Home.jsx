import React from "react";
import Header from "../Components/Header/Header";
import CarouselEffect from "../Components/Carousel/CarouselEffect";
import CategoryCard from "../Components/Catagories/CategoryCard";
import Catagories from "../Components/Catagories/Catagories";

const Home = () => {
   return (
      <>
         <Header />
         <CarouselEffect />
         <Catagories />
         <CategoryCard />
      </>
   );
};

export default Home;
