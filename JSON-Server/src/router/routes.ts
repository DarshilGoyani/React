import { createBrowserRouter } from "react-router";
import App from "../App";
import HomePage from "../page/HomePage";
import AddProduct from "../page/AddProductPage";
import ViewProduct from "../page/ViewProductPage";
import NotFoundPagem from "../page/NotFoundPage";

export const router = createBrowserRouter([
  {
    path : "/",
    Component : App,
    children : [
      {
        index : true,
        Component : HomePage
      },
      {
        path : "addProduct", 
        Component : AddProduct
      },
      {
        path : "viewProduct", 
        Component : ViewProduct
      },
      {
        path : "*", 
        Component : NotFoundPagem
      },
    ]
  }
])