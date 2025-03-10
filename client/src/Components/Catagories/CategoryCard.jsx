import styles from "./category.module.css";
import { Link } from "react-router";

function CategoryCard({ data }) {
   if (!data) return null; // Avoids errors if data is undefined(e.x: data.title renders and throw error way before the data comes in and brake the app) alternativly use can use the optional chaning too data?.title

   return (
      <div className={styles.category}>
         <h3 style={{}}>{data?.category}</h3>
         <Link to={`/category/${data?.category}`}>
            {/* {console.log(data)} */}
            <span>
               <h3>{data?.title.split(" ").splice(0, 6).join(" ") + "..."}</h3>
            </span>
            <img src={data?.image} alt={data?.title} />
            <p>shop now</p>
         </Link>
      </div>
   );
}

export default CategoryCard;
