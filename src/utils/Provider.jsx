import { initialState, reducerfunc } from "/src/utils/Reducertest.js";
import { useReducer, createContext } from "react";

export const countcontext = createContext();

export function Provider({ children }) {
   const [mystate, mydispatch] = useReducer(reducerfunc, initialState);
   console.log(mystate);
   return <countcontext.Provider value={{ mystate, mydispatch }}>{children}</countcontext.Provider>;
}
