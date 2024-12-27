import {
  createBrowserRouter,

} from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/home/Home";
import Register from "../pages/register/Register";
import SignIn from "../pages/signIn/SignIn";
import AllFoods from "./AllFoods";
import SingleFood from "./SingleFood";
import AddFood from "./AddFood";
import MyFood from "./MyFood";
import UpdateFood from "../pages/updateFood/UpdateFood";
import FoodPurchase from "../pages/purchaseFood/FoodPurchase";
import MyOrders from "./MyOrders";
import GalleryPage from "./GalleryPage";



const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <h2>route not found</h2>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/signin",
        element: <SignIn></SignIn>,
      },
      {
        path: "/allFoods",
        element:<AllFoods></AllFoods> ,
      },
      {
        path: "/allFoods/:id",
        element:<SingleFood></SingleFood> ,
      },
      {
        path: "/addFood",
        element:<AddFood></AddFood> ,
      },
      {
        path: "/myFood",
        element:<MyFood></MyFood>,
      },
      {
        path: "/updateFood/:id",
        element:<UpdateFood></UpdateFood>,
      },
      {
        path: "/foodPurchase/:id",
        element:<FoodPurchase></FoodPurchase>,
      },
      {
        path: "/myOrders",
        element:<MyOrders></MyOrders>,
      },
      {
        path: "/gallery",
        element:<GalleryPage></GalleryPage>,
      },

    ]
  },
]);

export default router;