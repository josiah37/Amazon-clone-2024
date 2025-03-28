import React, { useState, useEffect } from "react";
import CategoryCard from "./CategoryCard";
import axios from "axios";
import styles from "./Category.module.css";

function Categories() {
   const [productsData, setProductsData] = useState([]);

   useEffect(() => {
      async function fetchProductsByCategory() {
         try {
            // Fetch categories
            const categoriesResponse = await axios.get("https://fakestoreapi.com/products/categories");
            const categories = categoriesResponse.data;
            console.log("Categories:", categories); // Debugging output

            // Create an array of promises for fetching products
            const fetchPromises = categories.map(
               (category) =>
                  axios
                     .get(`https://fakestoreapi.com/products/category/${category}?limit=1&sort=desc`)
                     .then((response) => response.data) // Returns an array with 1 product
            );

            // Wait for all product fetch promises to resolve
            const productsFetched = await Promise.all(fetchPromises);
            console.log("productsFetched", productsFetched);

            //  Extract the first product from each category (fixing the nested array issue)
            const flattenedProducts = productsFetched.map((productArray) => productArray[0]);

            // the above step is uncessay you can simplify it like this: 
            //  const [productsFetched] = await Promise.all(fetchPromises); ... learn this in evangadi fourom actually

            // console.log("Fetched Products:", flattenedProducts); // Debugging output

            setProductsData(flattenedProducts);
         } catch (error) {
            console.error("Error fetching data:", error);
         }
      }

      fetchProductsByCategory();
   }, []);
   console.log("productsData noe holds:", productsData);
   return (
      <>
         <section className={styles.category_container}>
            {productsData?.map((singleProductInfo, index) => (
               <CategoryCard key={index} data={singleProductInfo} />
            ))}
         </section>
      </>
   );
}

export default Categories;
