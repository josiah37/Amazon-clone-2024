import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductsCard from "./ProductsCard";
import styles from "./Products.module.css";

function ProductsList() {
   const [Products, setProducts] = useState([]);
   const [loading, setLoading] = useState(true);
   useEffect(() => {
      async function productsfetcher() {
         try {
            // const async = ()=>{

            const allproducts = await axios.get("https://fakestoreapi.com/products");
            // console.log(allproducts);
            setProducts(allproducts.data);
            setLoading(false);
         } catch (error) {
            console.error("there is some error here:\n\t ", error);
            setLoading(false);
         }
      }

      productsfetcher();
   }, []);

   useEffect(() => {
      // console.log(Products); // Log the updated Products state
   }, [Products]);
   // console.log(Products);
   return (
      <section className={styles.product_container}>
         {loading ? (
            <p>is loading</p>
         ) : (
            Products?.map((singleProductItem) => {
               return <ProductsCard key={singleProductItem.id} productsData={singleProductItem} />;
            })
         )}
      </section>
   );
}

export default ProductsList;
