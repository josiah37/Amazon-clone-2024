import { Route, Routes } from "react-router-dom";
import Home from "../Pages/Home/Home";
import PageNotFound from "../Pages/PageNotFound";
import SharedComponent from "../Components/Layout/SharedLayoutss";
import Orders from "../Pages/Orders";
import Cart from "../Pages/Cart/Cart";
import Payment from "../Pages/Payment/Payment";
import Auth from "../Pages/Auth/Auth";
import Results from "../Pages/Results/Results";
import ProductsDetail from "../Pages/Products Detail/ProductsDetail";

// for stripe payment
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
   "pk_test_51QyauzH8W8qkdMMR5FxOMBN1ZSGcQ2NrUGnSR9C8yYyIZfo0GWazKTzS0OcxoTWW4d3KCAQOebNEPFzbCJtitYwu00bCc6mlKg"
);

function AppRoutes() {
   return (
      <>
         <Routes>
            <Route path="/" element={<SharedComponent />}>
               <Route index element={<Home />} />
               <Route path="Orders" element={<Orders />} />
               <Route path="Cart" element={<Cart />} />
               <Route path="category/:categoryName" element={<Results />} />
               <Route path="/product/:id" element={<ProductsDetail />} />
               <Route
                  path="Payments"
                  element={
                     // <ProtectedRoute msg={"You must login to pay"} redirect={"/payment"}>
                     <Elements stripe={stripePromise}>
                        <Payment />
                     </Elements>
                     // </ProtectedRoute>
                  }
               />
            </Route>

            <Route path="Auth" element={<Auth />} />
            <Route path="*" element={<PageNotFound />} />
         </Routes>
      </>
   );
}

export default AppRoutes;
