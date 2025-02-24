import React from "react";
import Header from "../Components/Header/Header";
import CarouselEffect from "../Components/Carousel/CarouselEffect";
import CategoryCard from "../Components/Catagories/CategoryCard";
import Categories from "../Components/Catagories/Categories";
import ProductsList from "../Components/Products/ProductsList";
import ProductsCard from "../Components/Products/ProductsCard";
const Home = () => {
   return (
      <>
         {/* <Header /> */}
         <CarouselEffect />
         <Categories />
         <CategoryCard />
         <ProductsList />
         <ProductsCard />
      </>
   );
};

export default Home;
