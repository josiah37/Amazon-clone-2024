//  handles the auth (including the sign in and ansign up)
import styles from "./Auth.module.css";
import { Link } from "react-router";
import AmazonLogo from "/src/assets/Amazon black.png";
import { useState } from "react";
import { auth } from "../../utils/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";

const Auth = () => {
   const [email, setEmail] = useState("");
   const [passwrd, setpasswrd] = useState("");

   //  handling user input
   const inputHandler = (event) => {
      // console.log("Input event:", event.target.id);
      event.target.id === "email" ? setEmail(event.target.value) : setpasswrd(event.target.value);
   };

   // handling sign in and asign up
   const AuthHandler = (event) => {
      // event.preverntDefault();
      // console.log(event.target.name);
      // event.target.name === "signin"
      if (event.target.name === "signin") {
         signInWithEmailAndPassword(auth, email, passwrd).then((userinfo) => {
            console.log(userinfo);
         });
      } else {
         createUserWithEmailAndPassword(auth, email, passwrd).then((userinfo) => {
            console.log(userinfo);
         });
      }
   };

   return (
      <section className={styles.login}>
         <Link to={"/"}>
            <img src={AmazonLogo} alt="Amazon logo" width={100} />
         </Link>
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
         </div>
      </section>
   );
};

export default Auth;
