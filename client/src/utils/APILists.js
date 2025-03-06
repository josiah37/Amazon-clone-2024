import axios from "axios";

// instances
const aiosStoreBaseApi = axios.create({
   baseURL: "",
});

// function-tool url from Frie base
const axiosStripeApi = axios.create({
   baseURL: "http://127.0.0.1:5001/clone-69834/us-central1/api",
});

export { aiosStoreBaseApi, axiosStripeApi };
