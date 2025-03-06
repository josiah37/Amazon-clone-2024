import React, { useContext } from "react";
import logo from "../../assets/Amazon-logo.png";
import styles from "./Header.module.css";
import { IoMdSearch } from "react-icons/io";
import { IoLocationOutline } from "react-icons/io5";
import { BiCart } from "react-icons/bi";
import LowerHeader from "./LowerHeader";
import { Link } from "react-router";
import { DataContext } from "../../utils/DataProvider";
import { auth } from "../../utils/firebase";

// to render the card count

const Header = () => {
   const { state, dispatch } = useContext(DataContext);
   // just to check og it works
   // console.log("on heder: ", state.basket.length);
   // state.basket.length but better approch-- distrcutring!
   const { user, basket } = state;
   console.log(user);
   return (
      <>
         <nav>
            <header>
               <div className={styles.headerLeft}>
                  <div className={styles.logowrapper}>
                     <Link to="/">
                        <img src={logo} alt="amazon logo" className={styles.logo} />
                     </Link>
                  </div>

                  {/* delivery */}
                  <div className={styles.delivery}>
                     <span>
                        <IoLocationOutline />
                     </span>
                     <div>
                        <p>deliver to</p>
                        <span>Ethiopia</span>
                     </div>
                  </div>
               </div>

               {/* search center Section */}

               <div className={styles.search}>
                  <label htmlFor="search bar"></label>
                  <select id="exampleSelect" name="all">
                     <option value="All">All</option>
                     <option value="onething">somthing</option>
                     <option value="ONEthing">somthing</option>
                     <option value="ONEthing">somthing</option>
                     <option value="ONEthing">somthing</option>
                  </select>
                  <input type="text" placeholder="search here" id="serach-bar" />
                  <button>
                     <IoMdSearch />
                  </button>
               </div>

               {/* RIGHT SIDE link */}

               <div className={styles.nav_rightside}>
                  <ul>
                     <li className={styles.lang}>
                        <img
                           src="https://upload.wikimedia.org/wikipedia/commons/d/de/Flag_of_the_United_States.png"
                           alt="flag"
                        />
                        <select name="" id="">
                           <option value="EN">EN</option>
                           <option value="canda">CN</option>
                        </select>
                     </li>
                     {/* orders */}
                     <li>
                        <Link to={!user && "/auth"}>
                           {/* //we are just borad casting to the fire base that the user has signed out. 
                        // it it will be handeled by firebase later on on app.js.  */}
                           <p>hello,{user ? user.email.split("@")[0] : "sign in"} </p>
                           {user ? <span onClick={() => auth.signOut()}> sign Out</span> : <span>Account & lists</span>}
                           {/* {user ? (
                              <>
                                 <p>Hello, {user.email.split("@")[0]} </p>
                                 <p onClick={() => auth.signOut()}> sign Out</p>
                              </>
                           ) : (
                              <>
                                 <p>Hello, sign in </p>
                                 <span>Account & lists</span>
                              </>
                           )} */}
                           {/* {/* <span> Account & lists</span> */}
                        </Link>
                     </li>
                     <li>
                        <Link to="orders">
                           <p>Returns</p> <span>& Orders</span>
                        </Link>
                     </li>
                     {/* cart */}
                     <li className={styles.cart}>
                        <span>{basket.length}</span>

                        <Link to={"cart"}>
                           <BiCart size={30} />
                           Cart
                        </Link>
                     </li>
                  </ul>
               </div>
            </header>
            <LowerHeader />
         </nav>
      </>
   );
};

export default Header;
