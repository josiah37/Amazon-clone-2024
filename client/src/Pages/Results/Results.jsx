// CATAGORY RESULTS
import axios from "axios";
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import ProductsCard from "../../Components/Products/ProductsCard";
import styles from "./Results.module.css";

function Results() {
   // setting a state to hold a data of a spcific catagory product
   const [categoryProducts, setcategoryProducts] = useState([]);

   // getting the passed parament
   let { categoryName } = useParams();

   // fetching the data of a specifc product on mount and updating the state
   useEffect(() => {
      axios
         .get(`https://fakestoreapi.com/products/category/${categoryName}`)
         .then((res) => setcategoryProducts(res.data))
         .catch((error) => console.error(error));
   }, []);

   return (
      <>
         <h2 style={{ margin: "1%" }}> Catagory Results</h2>
         <hr />
         <p style={{ margin: "10px" }}> Catagory/ {categoryName}</p> <hr />
         <div className={styles.products_container}>
            {categoryProducts.map((singleProduct) => (
               // calling the "Producucts card" component as we normally do, and then
               //  giving the data that is only in certain catagory. but using the same prop name so that is work pefectly
               <ProductsCard key={singleProduct.id} productsData={singleProduct} />
            ))}
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
