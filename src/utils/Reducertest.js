export const initialState = { count: 0 };
// console.log("count init:", initialState);

// Reducer function: takes the current state and an action, and returns the new state.
export function reducerfunc(state, action) {
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
