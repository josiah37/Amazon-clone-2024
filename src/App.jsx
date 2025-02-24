import { BrowserRouter } from "react-router";
import "./App.css";
import "./index.css";
import AppRoutes from "./Routes/AppRoutes";

function App() {
   //  const [count, setCount] = useState(0);

   return (
      <>
         <BrowserRouter>
            <AppRoutes />
         </BrowserRouter>
      </>
   );
}

export default App;
