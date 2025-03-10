import { useContext, useEffect, useState } from "react";
import { DataContext } from "../../utils/DataProvider";
import ProductsCard from "../../Components/Products/ProductsCard";
import styles from "./Orders.module.css";
import { db } from "../../utils/firebase";
// *to use Firebase v9 Modular Syntax as it is usful for Tree-shaking and better code organization
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";

/**
 * TODO: if firbase have date of order include it in the orders page but since u dont use firebase in the future incorprate an object for a date of purchase in normal node and include it in the data sent to the backend
 *
 */
const Orders = () => {
   const {
      state: { user },
      dispatch,
   } = useContext(DataContext);
   const [orders, setOrders] = useState([]);

   useEffect(() => {
      if (user) {
         // using the v9 Modular Syntax instade of the old way, what is seen in the video, as this is
         //  more efficient, more organized, and prevents memory leaks
         const userOrdersCollectionRef = collection(db, "users", user.uid, "orders");

         const queryOrders = query(userOrdersCollectionRef, orderBy("created", "desc"));

         const unsubscribe = onSnapshot(queryOrders, (snapshot) => {
            const fetchedOrders = snapshot.docs.map((doc) => ({
               orderId: doc.id,
               orderData: doc.data(),
            }));
            setOrders(fetchedOrders);
         });

         return () => unsubscribe();
      } else {
         setOrders([]);
      }
   }, [user]);

   return (
      <>
         <div className={styles.container}>
            <div className={styles.orders_container}>
               <h2>Your Orders</h2>
               {orders?.length == 0 && <div className={styles.orders_empty}>You don't have orders yet.</div>}
               <div>
                  {/* {purchaseTime = new Date(stripePayment.created * 1000).toLocaleString()} */}
                  {/* for one time product order */}
                  {orders?.map((singleOrder, idx) => (
                     <div key={idx}>
                        <hr />
                        {console.log(singleOrder)}

                        {/* since multiline of code is not allowed in jsx */}
                        {(() => {
                           // const purchaseTime = new Date(singleOrder.orderData.created * 1000).toLocaleString();
                           const purchaseTime2 = new Date(singleOrder.orderData.created * 1000).toUTCString();
                           // console.log("purchaseTime:", purchaseTime);
                           return (
                              <p>
                                 <span>Products purchased on:</span>
                                  <b> {purchaseTime2}</b>
                              </p>
                           );
                        })()}

                        {/* <p> purchased on: </p> */}
                        <p> <span>Order ID:</span> {singleOrder?.orderId}</p>

                        {singleOrder?.orderData?.basket?.map((Order) => (
                           <ProductsCard key={Order.id} productsData={Order} checkout={true} />
                        ))}
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </>
   );
};

export default Orders;
