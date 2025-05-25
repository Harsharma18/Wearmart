import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home/Home";
import Categorypage from "../pages/Category/Categorypage";
import Searchpage from "../pages/Search/Searchpage";
import Shoppage from "../pages/Shops/Shoppage";
import Login from "../components/Login";
import Register from "../components/Register";
import SingleProduct from "../pages/Shops/productdetails/SingleProduct";
import PaymentSuccess from "../components/PaymentSuccess";
import PaymentCancel from "../components/PaymentCancel";
import DashboardLayout from "../pages/Dashboards/DashboardLayout";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "categories/:categoryName",
        element: <Categorypage />,
      },
      {
        path: "search",
        element: <Searchpage />,
      },
      {
        path: "shop",
        element: <Shoppage />,
      },
      {
        path: "shop/:id",
        element: <SingleProduct />,
      },
      {
        path: "success",
        element: <PaymentSuccess />,
      },
      {
        path: "cancel",
        element: <PaymentCancel />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  //dashboard routes
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "",
        element: <div>User Dashboard</div>,
      },
      {
        path: "orders",
        element: <div>Dashboard Orders</div>,
      },
      {
        path: "payments",
        element: <div>Dashboard Payments</div>,
      },
      {
        path: "profile",
        element: <div>User Profile</div>,
      },
      {
        path: "reviews",
        element: <div>User Review</div>,
      },
      //ADMIN ROUTES
       {
    path: "admin",
    element: <PrivateRoute><div>Admin Dashboard</div></PrivateRoute>,
  },
  {
    path: "add-new-post",
    element: <PrivateRoute role="admin"><div>Add new post</div></PrivateRoute>,
  },
  {
    path: "manage-items",
    element: <PrivateRoute role="admin"><div>Manage items</div></PrivateRoute>,
  },
  {
    path: "update-post/:id",
    element: <PrivateRoute role="admin"><div>Update Post</div></PrivateRoute>,
  },
  {
    path: "users",
    element: <PrivateRoute role="admin"><div>all users</div></PrivateRoute>,
  },

  {
    path: "manage-orders",
    element: <PrivateRoute role="admin"><div>Manage Orders</div></PrivateRoute>,
  },
    ],
  },
  
 
]);
export default router;
