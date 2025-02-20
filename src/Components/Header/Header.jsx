import React from "react";
import logo from "../../assets/Amazon-logo.png";
import styles from "./Header.module.css";
import { IoMdSearch } from "react-icons/io";
import { IoLocationOutline } from "react-icons/io5";
import { BiCart } from "react-icons/bi";
import LowerHeader from "./LowerHeader";

const Header = () => {
   return (
      <>
         {/* <div className={styles.new}>
            <div className={styles.header}>
               <div className={styles.leftside}>
                  <img src={logo} alt="amazon logo" />
                  <p>deiver to Ethiopia</p>
               </div>

               <section className={styles.search}>
                  
                  <select id="exampleSelect" name="options">
                     <option value="All">All</option>
                     <option value="onething">somthing</option>
                     <option value="ONEthing">somthing</option>
                     <option value="ONEthing">somthing</option>
                     <option value="ONEthing">somthing</option>
                     <label htmlFor="search bar"></label>
                     <input type="text" placeholder="search here" id="serach-bar" />
                  </select>
               </section>

               <section className={styles.rightside}>
                  <ul>
                     <li>EN</li>
                     <li>hello, sign in Account S lists</li>
                     <li>Returns & Orders</li>
                     <li> Cart</li>
                  </ul>
               </section>
            </div>
         </div> */}

         <header>
            {/* <nav> */}
            <div className={styles.headerLeft}>
               <div className={styles.logowrapper}>
                  <a href="/">
                     <img src={logo} alt="amazon logo" className={styles.logo} />
                  </a>
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
                     <a href="http://">
                        <p>hello, sign in</p>
                        <span> Account & lists</span>
                     </a>
                  </li>
                  <li>
                     <p>Returns</p> <span>& Orders</span>
                  </li>
                  {/* cart */}
                  <li className={styles.cart}>
                     <span>0</span>
                     <BiCart size={30} />
                  </li>
                  Cart
               </ul>
            </div>
            {/* </nav> */}
         </header>
         <LowerHeader />
      </>
   );
};

export default Header;
