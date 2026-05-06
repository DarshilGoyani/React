import { createBrowserRouter } from "react-router";
import App from "../App";
import HomePage from "../page/HomePage";
import AddProduct from "../page/AddProductPage";
import EditProduct from "../page/EditProductPage";
import ViewProduct from "../page/ViewProductPage";
import CartPage from "../page/CartPage";
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
        path : "cart",
        Component : CartPage
      },
      {
        path : "edit-product/:productId", 
        Component : EditProduct 
      },
      {
        path : "*", 
        Component : NotFoundPagem
      },
    ]
  }
])