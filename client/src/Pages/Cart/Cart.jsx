import { Type } from "/src/utils/Action.type";
import classes from "./Cart.module.css";
import ProductsCard from "/src/Components/Products/ProductsCard";
import CurrencyFormat from "../../Components/CurrencyFormat/CurrencyFormat";
import { Link } from "react-router";
import { useContext } from "react";
import { DataContext } from "/src/utils/DataProvider";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

function Cart() {
   //  const [{ basket, user }, dispatch] = useContext(DataContext);
   const { state, dispatch } = useContext(DataContext);
   const { basket, user } = state;
   console.log(basket);
   const total = basket.reduce((amount, item) => {
      return item.price * item.amount + amount;
   }, 0);

   const increment = (item) => {
      dispatch({
         type: Type.ADD_TO_BASKET,
         item,
      });
   };
   const decrement = (id) => {
      dispatch({
         type: Type.REMOVE_FROM_BASKET,
         id,
      });
   };

   return (
      <section className={classes.container}>
         <div className={classes.cart_container}>
            <h2>Hello</h2>
            <h3>Your shopping basket</h3>
            <hr />
            {basket?.length == 0 ? (
               <p>sorry! there is No item in your cart</p>
            ) : (
               basket?.map((item, idx) => {
                  return (
                     <section className={classes.cart_product}>
                        <ProductsCard
                           key={idx}
                           productsData={item}
                           /*renderDesc={true} renderAdd={false}*/ singleProductData={true}
                           checkout={true}
                        />
                        <div className={classes.btn_container}>
                           <button className={classes.btn} onClick={() => increment(item)}>
                              <IoIosArrowUp size={20} />
                           </button>
                           <span>{item.amount}</span>
                           <button className={classes.btn} onClick={() => decrement(item.id)}>
                              <IoIosArrowDown size={20} />
                           </button>
                        </div>
                     </section>
                  );
               })
            )}
         </div>
         {basket?.length !== 0 && (
            <div className={classes.subtotal}>
               <div>
                  <p>Subtotal ({basket?.length} items)</p>
                  <CurrencyFormat amount={total} />
               </div>
               <span>
                  <input type="checkbox" />
                  <small>This order contains a gift</small>
               </span>
               <Link to="/Payments">Continue to checkout</Link>
            </div>
         )}
      </section>
   );
}

export default Cart;
