// 2nd step from the above example...
// you can acesss this with test/1 ... i could have made it id etc but i wanna make things simple
import { useReducer } from "react";

// importing now to make on  separated file
import { initialState, reducerfunc } from "../../utils/Reducertest";
import AnotherComponent4test from "./anotherComponent4test";

function TestCounterReducerSepated() {
   // const [sate, setsate] = useState(0); //evuvalet with the one below, [mystate, mydispatch],but
   // setstate(state updater works in two step)... using dispatch and reducer function(the one accept the dispatch)
   // the initialState update the sate first then after that always the dispatch fires and the reducer function do the update
   const [mystate, mydispatch] = useReducer(reducerfunc, initialState);
   //    console.log("state-----", mystate, "\n\n");
   //    console.log("dis=====", mydispatch, "\n\n");
   return (
      <div>
         <h1> TestCounterReducerSepated, ReducerTest1.jsx</h1>

         <p>Count: {mystate.count}</p>
         {/* dispatch is telling the action we are doing then we will acess it in the reducer to make the actual update */}
         <button style={{ margin: "10px" }} onClick={() => mydispatch({ typess: "increment" })}>
            Increment
         </button>
         <button onClick={() => mydispatch({ typess: "decrement" })}>Decrement</button>

         {/*  the following can be dipalyed here but to dipaly it with routing the satate needs to be
          global  */}

         <AnotherComponent4test prop={mystate.count} />
      </div>
   );
}

export default TestCounterReducerSepated;

// we can pass the data like props with prop trading but we need make the the state avlaible globally
// rigth so we need to make the useReducer global so that every page/ compoent has acess to the state
// both to use it and to change it. (like if we increase here on every page we see the updated val)
