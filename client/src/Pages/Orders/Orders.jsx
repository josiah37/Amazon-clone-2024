import { useContext, useEffect, useState } from "react";
import { DataContext } from "../../utils/DataProvider";
import ProductsCard from "../../Components/Products/ProductsCard";
import styles from "./Orders.module.css";
import { db } from "../../utils/firebase";
// *to use Firebase v9 Modular Syntax as it is usful for Tree-shaking and better code organization
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { FadeLoader } from "react-spinners";

/**
 * TODO: if firbase have date of order include it in the orders page but since u dont use firebase in the future incorprate an object for a date of purchase in normal node and include it in the data sent to the backend
 * tODO: CURNETLLY if the user refresh on the orders or payment page it is not presisting the user instead it make them to go to the redirect page, auth. i think it is because of the protected route but like the other pages make it persistant her too.
 */
const Orders = () => {
   // state fore the loader. setting the loader on
   const [loading, setLoading] = useState(true);

   // disstructuring the datacontext to get the user visiting the page
   const {
      state: { user },
      dispatch,
   } = useContext(DataContext);

   //to hold the featched user orders
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
            setLoading(false);
         });

         return () => {
            unsubscribe();
         };
      } else {
         setOrders([]);
         setLoading(false);
      }
   }, [user]);

   return (
      <>
         <div className={styles.container}>
            <div className={styles.orders_container}>
               <h2>Your Orders</h2>
               {loading ? (
                  <div className={styles.ordersListloaderContainer}>
                     <FadeLoader color="#FFA500" loading={loading} />
                  </div>
               ) : (
                  //   {/* when the order data fully loaded  */}
                  <>
                     {orders?.length == 0 && <div className={styles.orders_empty}>You don't have orders yet.</div>}
                     <div>
                        {/* {purchaseTime = new Date(stripePayment.created * 1000).toLocaleString()} */}
                        {/* for one time product order */}
                        {orders?.map((singleOrder) => (
                           <div key={singleOrder.id}>
                              <hr />
                              {console.log(singleOrder)}

                              {/* since multiline of code is not allowed in jsx use func*/}
                              {(() => {
                                 //using toLocaleString()
                                 // const purchaseTime = new Date(singleOrder.orderData.created * 1000).toLocaleString();

                                 //*using utc time
                                 // const purchaseTime2 = new Date(singleOrder.orderData.created * 1000).toUTCString();
                                 // changing to utc3 or gmt3
                                 // const utc3 = 3 * 60 * 60;
                                 // const timestamp = singleOrder.orderData.created * 1000;
                                 // const purchaseTime3 = new Date(timestamp+ utc3).toUTCString();

                                 //*  the above is a little aschgrai ... this is simple and check ur note for more
                                 const timestamp = singleOrder.orderData.created * 1000;
                                 const purchaseTime3 = new Date(timestamp).toLocaleString("en-US", {
                                    timeZone: "EAT",
                                 });

                                 return (
                                    <p>
                                       <span>Products purchased on: </span>
                                       {/* <b> {purchaseTime3}</b> */}
                                       {purchaseTime3}
                                    </p>
                                 );
                              })()}

                              {/* <p> purchased on: </p> */}
                              <p>
                                 <span>Order ID:</span> {singleOrder?.orderId}
                              </p>

                              {singleOrder?.orderData?.basket?.map((Order) => (
                                 <ProductsCard key={Order.id} productsData={Order} checkout={true} />
                              ))}
                           </div>
                        ))}
                     </div>
                  </>
               )}
            </div>
         </div>
      </>
   );
};

export default Orders;
