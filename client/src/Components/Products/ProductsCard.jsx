import Rating from "@mui/material/Rating";
import CurrencyFormat from "../CurrencyFormat/CurrencyFormat";
import styles from "./Products.module.css";
import { Link } from "react-router";

// importing things that help for global state managment
import { Type } from "../../utils/Action.type";
import { DataContext } from "../../utils/DataProvider";
import { useContext } from "react";

// passing productsData as a prop from its parent but we are using this component on the
// catagory products display(using the same prop name, productsData ) and on
// single product page rendering( we pass another props, singleProductData, as a conditon.
// if this is true, it will use diffrent structure)

/**
 *
 * @param {productsData} - state of products from direct parent
 * @param {singleProductData} - state that holdes true or false. only true passes when to show a single product on apage
 * @returns contionally if data present the actual render if not a string("data is loading")
 */
function ProductsCard({ productsData, singleProductData, checkout }) {
   //  setting conditional rendering beacuse our image is taking time to load(its throwing  undefined because of it)
   if (!productsData) return "data is loading...!!";

   const { image, title, id, rating, price, description } = productsData;

   const { state, dispatch } = useContext(DataContext);

   const addToCart = () => {
      dispatch({
         //since we dispath will be concerted to state and action later on and we are handling with action.type
         type: Type.ADD_TO_BASKET,
         item: { image, title, id, rating, price, description }, // meaning it will add the info(image, title...) of the state (from the current data)
      });
   };

   //to check the state holds the clicked products
   // console.log("the state is: ", state);

   // if the data is fully present render
   return (
      <div className={`${styles.card_container} ${singleProductData || checkout ? styles.product_flexed : ""}`}>
         {/* setting where each image will link or directs to  */}
         <Link to={`/product/${id}`} alt={title}>
            {/* selcting the last to words for the alt and also making the title only the last 5 
            words (as those are the one relevant) and setting the whole title as a tool tip*/}
            <img src={image} alt={title?.split(" ").slice(-2).join(" ")} title={title} />
         </Link>

         <div className={singleProductData && styles.detail}>
            <h3>{checkout ? title : title?.split(" ").slice(0, 6).join(" ") + "..." || " loading ...."}</h3>
            {singleProductData && <div>{description}</div>}
            <div className={styles.rating}>
               {/* setting the reting from data on the react material component using its attributes */}
               <span>Rating: </span>
               <Rating value={rating?.rate} precision={0.25} />
               <small>{rating?.count}</small>
            </div>
         </div>

         <div style={{ marginBottom: "1.5em" }}>
            {/* price */}
            <CurrencyFormat amount={price} />
         </div>
         {!checkout && (
            <button onClick={addToCart} className={styles.button}>
               add to cart
            </button>
         )}
         {/* </div> */}
      </div>
   );
}

export default ProductsCard;
