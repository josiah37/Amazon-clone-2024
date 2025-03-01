// 3nd step from the above example... making the data (state) global
// you can acesss this with test/2

import { useContext } from "react";
import { countcontext } from "../../utils/Provider";
import { Link } from "react-router";

function TestCounterUsingContextAPI() {
   const { mystate, mydispatch } = useContext(countcontext);

   return (
      <div>
         <h1> TestCounter Using Context API, ReducerTest2.jsx</h1>

         <p>Count: {mystate.count}</p>
         {/* dispatch is telling the action we are doing then we will acess it in the reducer to make the actual update */}
         <button style={{ margin: "10px" }} onClick={() => mydispatch({ typess: "increment" })}>
            Increment
         </button>
         <button onClick={() => mydispatch({ typess: "decrement" })}>Decrement</button>

         <p>
            link to check if the state persists in anothetr compoent <Link to="/test/test2/test2.1"> Here</Link>
         </p>
      </div>
   );
}

export default TestCounterUsingContextAPI;
