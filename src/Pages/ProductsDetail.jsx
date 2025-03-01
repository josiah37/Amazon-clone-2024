import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import ProductsCard from "../Components/Products/ProductsCard";

function ProductsDetail() {
   //  provides a detail of a single component in a page by using the product id
   const [productDetail, setProductDetail] = useState({});
   const { id } = useParams();
   useEffect(() => {
      try {
         axios
            .get(`https://fakestoreapi.com/products/${id}`)
            .then((product_data) => setProductDetail(product_data.data))
            .catch((err) => console.log(err));
      } catch (error) {
         console.error(`there is some error when fetching:\n\t ${error}`);
      }
   }, []);

   return (
      <>
      {/* we sent here true because since we need the card templet (instade of making one from scratch by 
      mapping the oject and all the css)we used the product card compoent and if singleProductData true, 
      we gave diffrent css as well as add product discription*/}
         <ProductsCard productsData={productDetail} singleProductData={true} />
      </>
   );
}

export default ProductsDetail;
