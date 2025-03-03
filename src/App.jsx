import "./App.css";
import "./index.css";
import AppRoutes from "./Routes/AppRoutes";
import { auth } from "./utils/firebase";
import { useContext, useEffect } from "react";
import { DataContext } from "./utils/DataProvider";
import { Type } from "./utils/Action.type";

function App() {
   //  const [count, setCount] = useState(0);
   const { state, dispatch } = useContext(DataContext);
   const { user } = state;

   useEffect(() => {
      // before handling this, if the user refersh the page the auth state is the same but appears logged out
      // and also, the brodcast we get when signout is clicked is not handeled yet
      const unsubscribe = auth.onAuthStateChanged((authuser) => {
         console.log("user is:", authuser); // this alone show on dev console z authstate is the same even if we refesh z page so we display it
         if (authuser) {
            dispatch({
               type: Type.SET_USER,
               user: authuser, // this set the authtenticated user to the state, so even if a person refersh on render we have set the state
            });
         } else {
            dispatch({
               type: Type.SET_USER,
               user: null, // importat to set the state to null, otherwise, it still show the name since the state is not updated
            });
         }
         return () => unsubscribe(); // Cleanup function to free my storage(memory leak)
      });
   }, []);
   return (
      <>
            <AppRoutes />
      </>
   );
}

export default App;
