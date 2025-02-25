import Rating from "@mui/material/Rating";
import CurrencyFormat from "../CurrencyFormat/CurrencyFormat";
import styles from "./Products.module.css";
import { Link } from "react-router";

// passing productsData as a prop from its parent but we are using this component on the
// catagory products display(using the same prop name, productsData ) and on
// single product page rendering( we pass another props, singleProductData, as a conditon.
// if this is true, it will use diffrent structure)

function ProductsCard({ productsData, singleProductData }) {
   //  setting conditional rendering beacuse our image is taking time to load(its throwing  undefined because of it)
   if (!productsData) return "data is loading...";

   const { image, title, id, rating, price, description } = productsData;

   return (
      <div className={`${styles.card_container} ${singleProductData ? styles.product_flexed : ""}`}>
         {/* setting where each image will link or directs to  */}
         <Link to={`/product/${id}`} alt="/">
            {/* selcting the last to words for the alt and also making the title only the last 5 
            words (as those are the one relevant) and setting the whole title as a tool tip*/}
            <img src={image} alt={title?.split(" ").slice(-2).join(" ")} title={title} />
         </Link>

         <div className={singleProductData && styles.detail}>
            <h3>{title?.split(" ").slice(0, 6).join(" ") + "..."}</h3>
            {singleProductData && <div>{description}</div>}
            <div className={styles.rating}>
               {/* setting the reting from data on the react material component using its attributes */}
               <span>Rating: </span>
               <Rating value={rating?.rate} precision={0.2} />
               <small>{rating?.count}</small>
            </div>
         </div>

         <div>
            {/* price */}
            <CurrencyFormat amount={price} />
         </div>

         <button className={styles.button}>add to cart</button>
      </div>
   );
}

export default ProductsCard;
