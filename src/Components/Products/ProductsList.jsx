import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductsCard from "./ProductsCard";
import styles from "./Product.module.css";

function ProductsList() {
   const [Products, setProducts] = useState([]);
   useEffect(() => {
      async function productsfetcher() {
         try {
            // const async = ()=>{

            const allproducts = await axios.get("https://fakestoreapi.com/products");
            console.log(allproducts);
            setProducts(allproducts.data);
         } catch (error) {
            console.error("there is some error here:\n\t ", error);
         }
      }

      productsfetcher();
   }, []);

   useEffect(() => {
      console.log(Products); // Log the updated Products state
   }, [Products]);
   console.log(Products);
   return (
      <section className={styles.product_container}>
         {Products?.map((singleProductItem) => {
            return <ProductsCard productsData={singleProductItem} />;
         })}
      </section>
   );
}

export default ProductsList;
