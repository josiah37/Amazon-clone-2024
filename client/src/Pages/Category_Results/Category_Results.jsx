// CATAGORY RESULTS
import axios from "axios";
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import ProductsCard from "../../Components/Products/ProductsCard";
import styles from "./Category_Results.module.css";
import { FadeLoader } from "react-spinners";

function Results() {
   // setting a state to hold a data of a spcific catagory product
   const [categoryProducts, setcategoryProducts] = useState([]);
   const [isLoading, setIsLoding] = useState(true);
   // getting the passed parament
   let { categoryName } = useParams();

   // fetching the data of a specifc product on mount and updating the state
   useEffect(() => {
      axios
         .get(`https://fakestoreapi.com/products/category/${categoryName}`)
         .then((res) => setcategoryProducts(res.data))
         .catch((error) => console.error(error))
         .finally(() => {
            setIsLoding(false); // This will run regardless of success or error
         });
      // i set it in a arrow func to ensure that it only runs once the promise is settled... if not runs
      //  right away, which may lead to setting the loading state before the API call is completed.
   }, [categoryName]);

   return (
      <>
         <h2 style={{ margin: "1%" }}> Catagory Results</h2>
         <hr />
         <p style={{ margin: "10px" }}> Catagory/ {categoryName}</p> <hr />
         <div className={styles.products_container}>
            {/* 
            check if the data is ready if so show the data if not the loader  */}
            {isLoading ? (
               <div className={styles.catgoryclassLoader}>
                  <FadeLoader loading={isLoading} />
               </div>
            ) : (
               categoryProducts.map((singleProduct) => (
                  // calling the "Producucts card" component as we normally do, and then
                  //  giving the data that is only in certain catagory. but using the same prop name so that is work pefectly
                  <ProductsCard key={singleProduct.id} productsData={singleProduct} />
               ))
            )}
         </div>
         {/* <>
            <div className="tooltip">
               Hover over this text
               <span className="tooltiptext">This is the tooltip text</span>
            </div>
            <div className="tooltip">
               <img src="image_url.jpg" alt="Descriptive Image" />
               <span className="tooltiptext">This is the tooltip for the image</span>
            </div>
         </> */}
      </>
   );
}

export default Results;
