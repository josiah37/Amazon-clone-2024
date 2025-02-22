import classes from "./category.module.css";

function CategoryCard({ data }) {
   if (!data) return null; // Avoids errors if data is undefined(kedmo render selmyadereg)

   return (
      <div className={classes.category}>
         <a href="">
            {console.log(data)}
            <span>
               <h3>{data.title}</h3>
            </span>
            <img src={data.image} alt={data.title} />
            <p>shop now</p>
         </a>
      </div>
   );
}

export default CategoryCard;
