import { useContext, useEffect } from "react";
import { DataContext } from "../../utils/DataProvider";
import { redirect, useNavigate } from "react-router";

export const ProtectedRoutes = ({ children, msg, redirect }) => {
   // destructuring the user directly
   const {
      state: { user },
      dispatch,
   } = useContext(DataContext);

   const navigate = useNavigate();
   // for every user if the user does not exist, we redirect then to the auth and pass a msg and the to
   // the last page they were trying to visit before auth
   useEffect(() => {
      if (!user) {
         navigate("/auth", { state: { msg, redirect } });
      }
   }, [user]);

   return children;
};
