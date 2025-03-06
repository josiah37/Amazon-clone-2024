import { useContext, useState } from "react";
import styles from "./payment.module.css";
import { DataContext } from "../../utils/DataProvider";
import ProductsCard from "../../Components/Products/ProductsCard";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import CurrencyFormat from "../../Components/CurrencyFormat/CurrencyFormat";
import { axiosStripeApi } from "../../utils/APILists";
import { ClipLoader } from "react-spinners";
import { db } from "../../utils/firebase";
import { useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
// import { Type } from "../../utils/Action.type";

const Payment = () => {
   const { state, dispatch } = useContext(DataContext);
   const { basket, user } = state;
   const totalItem = basket?.reduce((amount, item) => item.amount + amount, 0);
   const total = basket.reduce((amount, item) => item.price * item.amount + amount, 0);

   // to use the stripe confirmation and get info from card, respectively
   const stripe = useStripe();
   const elements = useElements();

   // const navigate = useNavigate()

   //to display if there is any error we are getting from stripe
   const [cardError, setCardError] = useState(null);

   // to prevent the button clicked again and also let the user know z payment is processing
   const [processing, setProcessing] = useState(false);

   // to display the error we get from stripe
   const handleChange = (e) => {
      e?.error?.message ? setCardError(e?.error?.message) : setCardError("");
   };

   const handlePayment = async (e) => {
      e.preventDefault(); // since it is a form
      try {
         setProcessing(true);
         //step1 getting the sk from the backend
         const response = await axiosStripeApi({
            method: "POST",
            url: `/payment/create?total=${total * 100}`,
         });
         const clientSecret = response.data?.clientSecret;

         //step2 confirm the payment form client side(react) ... telling to which user we need to confirm the payment
         // our client sk with the card info the client put in

         //we destructure it since we need the id later instead of putting it in in var and make the process longer
         const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
               card: elements.getElement(CardElement), // get the element from the cardElement, which we set up in z render
            },
         });
         console.log(paymentIntent);

         //step3: After the confirmation is over,  move to database store, and clear basket."
         // collection is like a table while doc is like a row.(in a collection there are docs)
         await db
            .collection("users")
            .doc(user.uid)
            .collection("orders")
            .doc(paymentIntent.id)
            .set({ basket: basket, amount: paymentIntent.amount, created: paymentIntent.created });
      } catch (error) {
         console.log(error, error?.response?.data?.message);
         // the above error handler handel on change but what if the user forgets to insert their info
         setCardError(error?.response?.data?.message);
      } finally {
         // Re-enable submission regardless of outcome(instead of setting it false twice both on success and err)
         setProcessing(false);
      }
   };

   //   const handlePayment = async (e) =>{
   // e.preventDefault()
   // try {
   //   setProcessing(true)
   //   const response = await axios({
   //     method:"POST",
   //     url: `payment/create?total=${total*100}`
   //   })
   //   const clientSecret = response.data?.clientSecret
   //   const {paymentIntent} = await stripe.confirmCardPayment(
   //     clientSecret,
   //     {
   //       payment_method : {
   //         card: elements.getElement(CardElement)
   //       }

   //     }
   //   )

   //      await setDoc(doc(db, "users", user.uid, "orders", paymentIntent.id), {
   //        basket: basket,
   //        amount: paymentIntent.amount,
   //        created: paymentIntent.created,
   //      });
   //      dispatch({ type: Type.EMPTY_BASKET });
   //   setProcessing(false)
   //   navigate("/orders",{state: {msg:"You have placed a new order"}})

   // } catch (error) {
   //   console.log(error);
   //   setProcessing(false);

   // }
   // finally {
   //    setProcessing(false); // Re-enable submission regardless of outcome(instead of setting it false twice both on success and err)
   // }
   // }
   return (
      <>
         <div className={styles.payment_header}>Checkout ({totalItem}) items</div>
         <section className={styles.payment}>
            <div className={styles.flex}>
               <h3>Delivery Address</h3>
               <div>
                  <div>
                     <u> {user?.email} </u>
                  </div>
                  <div>Ethio-china street,</div>
                  <div>Addis ababa, Ethiopia</div>
               </div>
            </div>

            <hr />

            <div className={styles.flex}>
               <h3>Review items and delivery</h3>
               <div className={styles.payment_items}>
                  {basket?.map((item) => (
                     <ProductsCard key={item.id} productsData={item} checkout={true} />
                  ))}
               </div>
            </div>

            <hr />

            <div className={styles.flex}>
               <h3>Payment methods</h3>
               <div className={styles.payment_card_container}>
                  <div className={styles.payment_details}>
                     <form onSubmit={handlePayment}>
                        {cardError && <small style={{ color: "red" }}>{cardError}</small>}
                        <CardElement onChange={handleChange} />

                        {/* price */}
                        <div className={styles.payment_price}>
                           <div>
                              <span>Total Order |</span>
                              <CurrencyFormat amount={total} />
                           </div>
                           <div className={styles.processing}>
                              <button type="submit" disabled={processing}>
                                 {processing ? (
                                    <div className={styles.processing}>
                                       <ClipLoader color="grey" size={12} />
                                       <p>Please Wait ...</p>
                                    </div>
                                 ) : (
                                    " Pay Now" // you can make this one to done if is is success or make the state 0
                                 )}
                              </button>
                           </div>
                        </div>
                     </form>
                  </div>
               </div>
            </div>
         </section>
      </>
   );
};

export default Payment;
