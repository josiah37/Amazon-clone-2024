console.log("testing");
// /** testing to get one data from the catagories */
// let Catagory = fetch("https://fakestoreapi.com/products/categories")
//    .then((res) => res.json())
//    .then((json) => {
//       console.log(json);
//       console.log(json[2]);
//    });
// console.log("the items are: ", Catagory);

// https://fakestoreapi.com/products/category/jewelery?limit=1 // to get pro

/*
 *
 * =====this  works perfectly but it is making my data not consitent on order they are displayed =============*/

// fetch("https://fakestoreapi.com/products/categories")
//    .then((res) => res.json())
//    .then((catagories) => {
//       catagories.map((CatagoryItem) => {
//          fetch(`https://fakestoreapi.com/products/category/${CatagoryItem}?limit=1`)
//             .then((res) => res.json())
//             .then((product) => console.log(product));
//       });
//    });

/**
 *                       using the Promise.all method              */

// fetch("https://fakestoreapi.com/products/categories")
//    .then((res) => res.json())
//    .then((categories) => {
//       // Create an array of promises for the second fetch
//       const fetchPromises = categories.map((categoryItem) => {
//          return fetch(`https://fakestoreapi.com/products/category/${categoryItem}?limit=1`).then((res) => res.json());
//       });

//       // Use Promise.all to wait for all fetches to complete
//       return Promise.all(fetchPromises);
//    })
//    .then((products) => {
//       // Now 'products' will be an array containing the results in the same order as 'categories'
//       products.forEach((product) => console.log(product));
//    })
//    .catch((error) => {
//       console.error("Error fetching data:", error);
//    });

/** =================    trying  with async/await  ================= */

// async () =>{
//     let CatagoryGetReq =  await fetch("https://fakestoreapi.com/products/categories")
//    let Catagory =  await CatagoryGetReq.json()
//    });
// }
// await Catagory.then((json) => {
//    json.map((CatagoryItem, idx) => {
//       fetch(`https://fakestoreapi.com/products/category/${CatagoryItem}?limit=1`)
//          .then((res) => res.json())
//          .then((json) => console.log(json));
//    });
// });

// async function fetchProductsByCategory() {
//    try {
//       // Fetch categories
//       const categoriesResponse = await fetch("https://fakestoreapi.com/products/categories");
//       const categories = await categoriesResponse.json();
//       console.log("------------------------\n\n\n", categories); // Log the categories

//       // Fetch one product from each category in order
//       for (const category of categories) {
//          const productResponse = await fetch(`https://fakestoreapi.com/products/category/${category}?limit=1`);
//          const product = await productResponse.json();
//          console.log(product); // Log the fetched product
//       }
//    } catch (error) {
//       console.error("Error fetching data:", error);
//    }
// }

// Call the function to execute
// fetchProductsByCategory();

/** using axios with promise.all */
import axios from "axios";

// async function fetcher() {
//    try {
//       let catagorise_data = axios.get;
//       let catagories = (await catagorise_data).data;
//       console.log("---------------------------\n\n\n", catagories);

//       // fetching data form each catagory
//       let productsfetch = catagories.map(axios.get(`https://fakestoreapi.com/products/category/${catagories}?limit=1`));
//       let products = await Promise.all(productsfetch);
//       console.log(products);
//    } catch (error) {
//       console.error("there is some error in fetching the data", error);
//    }
// }

// fetcher();

// // copy from component... pefectly works here but have an error in component
// async function fetchProductsByCategory() {
//    try {
//       // Fetch categories
//       const categoriesResponse = await axios.get("https://fakestoreapi.com/products/categories");
//       const categories = categoriesResponse.data;
//       console.log(categories); // Log the categories

//       // Create an array of promises for fetching products
//       const fetchPromises = categories.map((category) => {
//          return axios
//             .get(`https://fakestoreapi.com/products/category/${category}?limit=1`)
//             .then((response) => response.data); // Directly return the product data
//       });

//       // Wait for all product fetch promises to resolve
//       const productsfetched = await Promise.all(fetchPromises);
//       console.log(productsfetched);
//       // setproductsData(productsfetched);
//    } catch (error) {
//       console.error("Error fetching data:", error);
//    }
// }
// fetchProductsByCategory();

// the it works pefrect but the error in component is the data comes in array as a pakage
//   and each of the product data comes in array  also so we need to extract it
async function fetchProductsByCategory() {
   try {
      // Fetch categories
      const categoriesResponse = await axios.get("https://fakestoreapi.com/products/categories");
      const categories = categoriesResponse.data;
      console.log("Categories:", categories); // Debugging output

      // Create an array of promises for fetching products
      const fetchPromises = categories.map(
         (category) =>
            axios
               .get(`https://fakestoreapi.com/products/category/${category}?limit=1`)
               .then((response) => response.data) // Returns an array with 1 product
      );

      // Wait for all product fetch promises to resolve
      const productsFetched = await Promise.all(fetchPromises);

      //  Extract the first product from each category (fixing the nested array issue)
      const flattenedProducts = productsFetched.map((productArray) => productArray[0]);

      console.log("Fetched Products:", flattenedProducts); // Debugging output

      // setProductsData(flattenedProducts);
   } catch (error) {
      console.error("Error fetching data:", error);
   }
}

fetchProductsByCategory();
