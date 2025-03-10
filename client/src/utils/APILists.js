import axios from "axios";

// instances
const axiosStoreBaseApi = axios.create({
   baseURL: "",
});

// function-tool url from Frie base
const axiosStripeApi = axios.create({
   //on local host
   // baseURL: "http://127.0.0.1:5001/clone-69834/us-central1/api",

   // instade of the local host now the actuall deployed baackedn
   baseURL: " https://amazone-backend-q05p.onrender.com/",
});

export { axiosStoreBaseApi, axiosStripeApi };
