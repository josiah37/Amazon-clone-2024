import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
// import { Provider } from "./utils/Provider.jsx";
import { DataProvider } from "./utils/DataProvider.jsx";

createRoot(document.getElementById("root")).render(
   <StrictMode>
      <DataProvider>
         <App />
      </DataProvider>
   </StrictMode>
);
