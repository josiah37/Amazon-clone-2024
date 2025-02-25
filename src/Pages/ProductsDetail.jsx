import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import ProductsCard from "../Components/Products/ProductsCard";

function ProductsDetail() {
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
         <ProductsCard productsData={productDetail} singleProductData={true} />

         {/* {productDetail.map((detail)=>(


   ))} */}
      </>
   );
}

export default ProductsDetail;
