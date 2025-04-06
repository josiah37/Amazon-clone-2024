import { useContext, useEffect } from "react";
import { DataContext } from "../../utils/DataProvider";
import { redirect, useNavigate } from "react-router";
import { FadeLoader } from "react-spinners";
import styles from "../../Pages/Orders/Orders.module.css";
// TODO: this is not  the standard way of doing it so replace this with the standard route protection
export const ProtectedRoutes = ({ children, msg, redirect }) => {
   // destructuring the user directly
   const {
      state: { user },
      loading,
   } = useContext(DataContext);

   const navigate = useNavigate();
   // for every user if the user does not exist, we redirect then to the auth and pass a msg and the to
   // the last page they were trying to visit before auth
   useEffect(() => {
      if (!loading && !user) {
         navigate("/auth", { state: { msg, redirect } });
      }
   }, [user, loading, navigate, msg, redirect]);

   // if (loading) {
   //    return <div>Loading...!!!</div>; // Render a loading state if user data is being fetched
   // }

   if (loading) {
      return (
         <div className={styles.ordersListloaderContainer}>
            <FadeLoader color="#FFA500" loading={loading} />
         </div>
      );
   }

   // return children;
   // the above return the children regadless of the user status so the user may see glimps of what the page holds

   // returning children only user is there(better way)
   return user ? children : null;
};
