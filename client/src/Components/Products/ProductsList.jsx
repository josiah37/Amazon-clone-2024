import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductsCard from "./ProductsCard";
import styles from "./Products.module.css";
import { FadeLoader } from "react-spinners";

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
         } catch (error) {
            console.error("there is some error here:\n\t ", error);
         } finally {
            setLoading(false); // setting the loader off nomatter the result is
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
            <div className={styles.loaderContainer}>
               <FadeLoader color="#FFA500" loading={loading} />
            </div>
         ) : (
            Products?.map((singleProductItem) => {
               console.log("fromlist \n", singleProductItem);
               return <ProductsCard key={singleProductItem.id} productsData={singleProductItem} />;
            })
         )}
      </section>
   );
}

export default ProductsList;
