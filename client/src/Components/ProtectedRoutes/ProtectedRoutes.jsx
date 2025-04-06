import { useContext, useEffect } from "react";
import { DataContext } from "../../utils/DataProvider";
import { redirect, useNavigate } from "react-router";

// TODO: this is not  the standard way of doing it so replace this with the standard route protection
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

   // return children;
   // the above return the children regadless of the user status so the user may see glimps of what the page holds

   // returning children only user is there(better way)
   return user ? children : null;
};
