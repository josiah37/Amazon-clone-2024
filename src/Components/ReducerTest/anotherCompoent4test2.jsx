// this page can be acessed with .../test/test2/test2.1

import { useContext } from "react";
import { Link } from "react-router";
import { countcontext } from "../../utils/Provider";

function AnotherComponent4test2() {
   const { mystate, mydispatch } = useContext(countcontext);
   console.log(mystate);
   //    const stateControl = useContext(countcontext);
   //    console.log(stateControl);
   return (
      <>
         <h1>another Component 4 test 2</h1>
         {/* <p> the state now is here:{stateControl.mystate.count} </p> */}
         <p> the state now is here:{mystate.count} </p>

         <p>
            if you wanna get back ckick <Link to="/test/test2">here </Link>
         </p>
      </>
   );
}

export default AnotherComponent4test2;
