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
import TestCounter from "../Components/ReducerTest/ReducerTest";
import TestCounterReducerSepated from "../Components/ReducerTest/ReducerTest1";
import AnotherComponent4test from "../Components/ReducerTest/anotherComponent4test";
import AnotherComponent4test2 from "../Components/ReducerTest/anotherCompoent4test2";
import TestCounterUsingContextAPI from "../Components/ReducerTest/ReducerTest2 UsingContextAPI";

function AppRoutes() {
   return (
      <>
         <Routes>
            <Route path="/" element={<SharedComponent />}>
               <Route index element={<Home />} />
               <Route path="Orders" element={<Orders />} />
               <Route path="Carts" element={<Carts />} />
               <Route path="Payment" element={<Payment />} />
               <Route path="Auth" element={<Auth />} />
               <Route path="category/:categoryName" element={<Results />} />
               <Route path="/product/:id" element={<ProductsDetail />} />
               {/* <Route path="" element={</>}/>
                     <Route path="" element={</>}/> */}
            </Route>

            <Route path="*" element={<PageNotFound />} />

            <Route path="/test">
               {/* <Route path="test2" element={</>}/> */}
               <Route path="test0" element={<TestCounter />} />
               <Route path="test1" element={<TestCounterReducerSepated />} />
               <Route path="test1.1" element={<AnotherComponent4test />} />
               <Route path="test2" element={<TestCounterUsingContextAPI />} />
               <Route path="test2/test2.1" element={<AnotherComponent4test2 />} />
            </Route>
         </Routes>
      </>
   );
}

export default AppRoutes;
