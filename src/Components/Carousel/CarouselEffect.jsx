import "react-responsive-carousel/lib/styles/carousel.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { carouselImagesData } from "./Carousel_imgs";
import style from "./CarouselEffect.module.css";
function CarouselEffect() {
   return (
      <>
         <Carousel
            // autoPlay={true}
            infiniteLoop={true}
            showIndicators={false}
            showThumbs={false}
            showStatus={false}
            className="fade-carousel"
         >
            {carouselImagesData.map((imgItem, idx) => (
               <img src={imgItem} alt={`image ${idx + 1}`} key={idx + 1} />
            ))}
         </Carousel>
         {/* <div className={style.hero_img}></div> */}
      </>
   );
}

export default CarouselEffect;
