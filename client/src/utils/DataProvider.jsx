// // src/Components/DataProvider/DataProvider.jsx

// import React, { createContext, useReducer } from "react";
// import { reducer, initialState } from "../utils/reducer";

// export const DataContext = createContext();

// export const DataProvider = ({ children }) => {
//    const [state, dispatch] = useReducer(reducer, initialState);

//    return <DataContext.Provider value={{ state, dispatch }}>{children}</DataContext.Provider>;
// };

import React, { createContext, useReducer, useEffect, useState } from "react";
import { reducer, initialState } from "../utils/reducer";
import { getAuth, onAuthStateChanged } from "firebase/auth"; // Correct import
import { Type } from "../utils/Action.type";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
   const [state, dispatch] = useReducer(reducer, initialState);
   const [loading, setLoading] = useState(true);
   const auth = getAuth(); // Get the Firebase auth instance

   useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
         if (user) {
            dispatch({ type: Type.SET_USER, user }); // Update user if exists
         } else {
            dispatch({ type: Type.SET_USER, user: null }); // Set user state to null
         }
         setLoading(false); // Set loading to false
      });

      return () => unsubscribe(); // Clean up subscription
   }, [auth, dispatch]);

   return <DataContext.Provider value={{ state, dispatch, loading }}>{children}</DataContext.Provider>;
};
