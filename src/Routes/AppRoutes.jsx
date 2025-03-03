import { Route, Routes } from "react-router";

import Home from "../Pages/Home/Home";
import PageNotFound from "../Pages/PageNotFound";
import SharedComponent from "../Components/Layout/SharedLayoutss";
import Orders from "../Pages/Orders";
import Carts from "../Pages/Cart/Carts";
import Payment from "../Pages/Payment";
import Auth from "../Pages/Auth/Auth";
import Results from "../Pages/Results";
import ProductsDetail from "../Pages/ProductsDetail";

function AppRoutes() {
   return (
      <>
         <Routes>
            <Route path="/" element={<SharedComponent />}>
               <Route index element={<Home />} />
               <Route path="Orders" element={<Orders />} />
               <Route path="Carts" element={<Carts />} />
               <Route path="Payment" element={<Payment />} />

               <Route path="category/:categoryName" element={<Results />} />
               <Route path="/product/:id" element={<ProductsDetail />} />
               {/* <Route path="" element={</>}/>
                     <Route path="" element={</>}/> */}
            </Route>

            <Route path="Auth" element={<Auth />} />
            <Route path="*" element={<PageNotFound />} />
         </Routes>
      </>
   );
}

export default AppRoutes;
