import styles from "./category.module.css";

function CategoryCard({ data }) {
   if (!data) return null; // Avoids errors if data is undefined(e.x: data.title renders and throw error way before the data comes in and brake the app) alternativly use can use the optional chaning too data?.title

   return (
      <div className={styles.category}>
         <a href="#">
            {console.log(data)}
            <span>
               <h3>{data?.title}</h3>
            </span>
            <img src={data?.image} alt={data?.title} />
            <p>shop now</p>
         </a>
      </div>
   );
}

export default CategoryCard;
