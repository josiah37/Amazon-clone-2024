// import Catagories from "./Catagories";

// let Catagory = fetch("https://fakestoreapi.com/products/categories")
//    .then((res) => res.json())
//    .then((json) => {
//       console.log(json);
//       console.log(json[2]);
//    });

// console.log("the items are: ", CatagoryItems);

// fetch("https://fakestoreapi.com/products?limit=1")
//    .then((res) => res.json())
//    .then((json) => console.log(json));

// CatagoryItems.map((CatagoryItems, idx) => {
//    fetch(`https://fakestoreapi.com/products/category/${CatagoryItem[idx]}?limit=1`)
//       .then((res) => res.json())
//       .then((json) => console.log(json));
// });

// https://fakestoreapi.com/products/category/jewelery?limit=1

// this is making my data not consitent on order they are displayed
// fetch("https://fakestoreapi.com/products/categories")
//    .then((res) => res.json())
//    .then((catagories) => {
//        catagories.map((CatagoryItem) => {
//          fetch(`https://fakestoreapi.com/products/category/${CatagoryItem}?limit=1`)
//             .then((res) => res.json())
//             .then((product) => console.log(product));
//       });
//    });

// fetch("https://fakestoreapi.com/products/categories")
//    .then((res) => res.json())
//    .then((catagories) => {
//        catagories.map((CatagoryItem) => {
//          fetch(`https://fakestoreapi.com/products/category/${CatagoryItem}?limit=1`)
//             .then((res) => res.json())
//             .then((product) => console.log(product));
//       });
//    });


/**
 *                       using the Promis.all method              */

fetch("https://fakestoreapi.com/products/categories")
   .then((res) => res.json())
   .then((categories) => {
      // Create an array of promises for the second fetch
      const fetchPromises = categories.map((categoryItem) => {
         return fetch(`https://fakestoreapi.com/products/category/${categoryItem}?limit=1`).then((res) => res.json());
      });

      // Use Promise.all to wait for all fetches to complete
      return Promise.all(fetchPromises);
   })
   .then((products) => {
      // Now 'products' will be an array containing the results in the same order as 'categories'
      products.forEach((product) => console.log(product));
   })
   .catch((error) => {
      console.error("Error fetching data:", error);
   });

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
