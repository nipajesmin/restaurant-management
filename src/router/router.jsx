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
import Error from "../pages/Error/Error";
import PrivateRoute from "./PrivateRoute";



const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <Error></Error>,
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
        element:<PrivateRoute><MyFood></MyFood></PrivateRoute>,
      },
      {
        path: "/updateFood/:id",
        element:<UpdateFood></UpdateFood>,
      },
      {
        path: "/foodPurchase/:id",
        element:<PrivateRoute><FoodPurchase></FoodPurchase></PrivateRoute>,
      },
      {
        path: "/myOrders",
        element:<PrivateRoute><MyOrders></MyOrders></PrivateRoute>,
      },
      {
        path: "/gallery",
        element:<GalleryPage></GalleryPage>,
      },

    ]
  },
]);

export default router;