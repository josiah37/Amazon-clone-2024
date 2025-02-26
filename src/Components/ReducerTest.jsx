import React, { useReducer, useState } from "react";

// Define your initial state
const initialState = { count: 0 };
console.log("count init:", initialState);

// Reducer function: takes the current state and an action, and returns the new state.
function reducerfunc(state, action) {
   console.log("state held: ", state, "\n\n");
   console.log("action held: ", action, "\n\n");
   switch (action.typess) {
      case "increment":
         return { count: state.count + 1 };
      case "decrement":
         return { count: state.count - 1 };
      default:
         throw new Error(`Unhandled action type: ${action.type}`);
   }
}

function TestCounter() {
   // const [sate, setsate] = useState(0); //evuvalet with the one below, [mystate, mydispatch],but
   // setstate(state updater works in two step)... using dispatch and reducer function(the one accept the dispatch)
   // the initialState update the sate first then after that always the dispatch fires and the reducer function do the update
   const [mystate, mydispatch] = useReducer(reducerfunc, initialState);
   console.log("state-----", mystate, "\n\n");
   console.log("dis=====", mydispatch, "\n\n");
   return (
      <div>
         <p>Count: {mystate.count}</p>
         {/* dispatch is telling the action we are doing then we will acess it in the reducer to make the actual update */}
         <button onClick={() => mydispatch({ typess: "increment" })}>Increment</button>
         <button onClick={() => mydispatch({ typess: "decrement" })}>Decrement</button>
      </div>
   );
}

export default TestCounter;
