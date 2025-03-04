// src/Components/DataProvider/DataProvider.jsx

import React, { createContext, useReducer } from "react";
import { reducer, initialState } from "../utils/reducer";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
   const [state, dispatch] = useReducer(reducer, initialState);

   return <DataContext.Provider value={{ state, dispatch }}>{children}</DataContext.Provider>;
};
