import Rating from "@mui/material/Rating";
import CurrencyFormat from "../CurrencyFormat/CurrencyFormat";
import classes from "./Product.module.css";

function ProductsCard({ productsData }) {
   if (!productsData) return null;

   const { image, title, id, rating, price } = productsData;
   return (
      <div className={`${classes.card_container}`}>
         <a href={`/product/${id}`} alt="/">
            <img src={image} alt="" />
         </a>
         <div>
            <h3>{title}</h3>
            <div className={classes.rating}>
               <span>Rating: </span>
               <Rating value={rating.rate} precision={0.2} />
               <small>{rating.count}</small>
            </div>
         </div>
         <div>
            {/* price */}
            <CurrencyFormat amount={price} />
         </div>
         <button className={classes.button}>add to cart</button>
      </div>
   );
}

export default ProductsCard;
