import "./App.css";
import Home from "./Pages/Home";
import "./index.css";
import { Route, Routes } from "react-router";
import PageNotFound from "./Pages/PageNotFound";
import SharedComponent from "./Components/Layout/SharedLayoutss"

function App() {
   //  const [count, setCount] = useState(0);

   return (
      <Routes>
         <Route path="/" element={<SharedComponent />}>
            <Route index element={<Home />} />
         </Route>

         <Route path="*" element={<PageNotFound />} />
      </Routes>
   );
}

export default App;
