//  handles the auth (including the sign in and ansign up)
import styles from "./Auth.module.css";
import { Link, useLocation, useNavigate } from "react-router";
import AmazonLogo from "/src/assets/Amazon black.png";
import { useState, useContext } from "react";
import { auth } from "../../utils/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { DataContext, DataProvider } from "../../utils/DataProvider";
import { Type } from "../../utils/Action.type";
// import {} form "reacts"
// TODO
//    loader for the sign in/up btns
// <SyncLoader speedMultiplier={0.7} />
const Auth = () => {
   const [email, setEmail] = useState("");
   const [passwrd, setpasswrd] = useState("");
   const [err, setErr] = useState("");

   // console.log(passwrd);
   // console.log(err);

   // this is just a variable you can name the sate what ever you want like `userstate` or anything
   // since we specify the type when we fire the dispatch it knows where to go later on
   const { state, dispatch } = useContext(DataContext);
   // console.log("state gives all the state:    ", state);
   // //the above is enough for now but you can destructure the state further if you want to get a single user
   // const { basket, user } = state;
   // console.log("user state:   ", user);

   const navigate = useNavigate();
   const protectedRouteRedirect = useLocation();
   console.log(protectedRouteRedirect);

   /* handling user input */
   const inputHandler = (event) => {
      // console.log("Input event:", event.target.id);
      event.target.id === "email" ? setEmail(event.target.value) : setpasswrd(event.target.value);
   };

   /* handling sign in and a sign up*/
   const AuthHandler = (event) => {
      event.preventDefault();
      // console.log(event.target.name);
      // event.target.name === "signin"
      if (event.target.name === "signin") {
         signInWithEmailAndPassword(auth, email, passwrd)
            .then((userinfo) => {
               // console.log(userinfo); // this returns an object and there we can find the user email  with user.email
               dispatch({
                  // setting the action we took and also the state to be updated
                  type: Type.SET_USER,
                  user: userinfo.user,
               });
               navigate(protectedRouteRedirect?.state?.redirect || "/");
            })
            .catch((errcatched) => setErr(errcatched.message));
      } else {
         createUserWithEmailAndPassword(auth, email, passwrd)
            .then((userinfo) => {
               console.log(userinfo);
               dispatch({
                  // setting the action we took and also the state to be updated
                  type: Type.SET_USER,
                  user: userinfo.user,
               });

               navigate(protectedRouteRedirect?.state?.redirect || "/");
            })
            .catch((errcatched) => setErr(errcatched.message));
      }
   };

   return (
      <section className={styles.login}>
         <Link to={"/"}>
            <img src={AmazonLogo} alt="Amazon logo" width={100} />
         </Link>
         {protectedRouteRedirect && <p>{protectedRouteRedirect?.state?.msg}</p>}
         <div className={styles.login_container}>
            <h1>Sign In</h1>
            <form action="">
               <div>
                  <label htmlFor="email">Email</label>
                  <br />
                  <input type="email" id="email" value={email} onChange={inputHandler} />
               </div>
               <div>
                  <label htmlFor="password">Password</label>
                  <br />
                  <input type="password" id="password" value={passwrd} onChange={inputHandler} />
               </div>
               <button onClick={AuthHandler} className={styles.SignIn_btn} name={"signin"}>
                  Sign In
               </button>
            </form>
            <p>
               By signing in you agree to the Amazon clone which is a copy of the real amazon.com. conditions of Use &
               Sale. Please see the functionality and rate the project.
            </p>
            <p>New to Amazon?</p>
            <hr />
            <button onClick={AuthHandler} name="signup">
               Create your Amazon Account
            </button>
            <div className={styles.error}>{err ? err : null}</div>
         </div>
      </section>
   );
};

export default Auth;
