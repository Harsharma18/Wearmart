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
import UserDmain from "../pages/Dashboards/User/dashboard/UserDmain";
import UserOrder from "../pages/Dashboards/User/UserOrder";
import OrderDetails from "../pages/Dashboards/User/OrderDetails";
import UserPayment from "../pages/Dashboards/User/UserPayment";
import UserReviews from "../pages/Dashboards/User/UserReview";
import AdminDMain from "../pages/Dashboards/Admin/Dashboard/AdminDMain";
import AddProduct from "../pages/Dashboards/Admin/addProduct/AddProduct";
import Manageproduct from "../pages/Dashboards/Admin/ManageProducts/Manageproduct";
import Updateproduct from "../pages/Dashboards/Admin/ManageProducts/Updateproduct";
import Manageuser from "../pages/Dashboards/Admin/ManageUsers/Manageuser";
import ManageOrder from "../pages/Dashboards/Admin/ManageOrder/ManageOrder";
import UserProfile from "../pages/Dashboards/User/UserProfile";
import ContactPage from "../components/ContactPage";
import { Toaster } from "react-hot-toast";
function WithToaster({ children }) {
  return (
    <>
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
      {children}
    </>
  );
}
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
        path:"contact",
        element:<ContactPage/>
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
      },{
                path: "/orders/:orderId",
                element: <OrderDetails/>
            },
    ],
  },
  {
    path: "/login",
    element: (
      <WithToaster>
        <Login />
      </WithToaster>
    ),
  },
  {
    path: "/register",
    element: (
      <WithToaster>
        <Register />
      </WithToaster>
    ),
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
        element: <UserDmain/>
      },
      {
        path: "orders",
        element:<UserOrder/>,
      },
      {
        path: "payments",
        element: <UserPayment/>
      },
      {
        path: "profile",
        element: <UserProfile/>
      },
      {
        path: "reviews", 
        element:<UserReviews/>,
      },
      //ADMIN ROUTES
       {
    path: "admin",
    element: <PrivateRoute><AdminDMain/></PrivateRoute>,
  },
  {
    path: "add-new-post",
    element: <PrivateRoute role="admin"><AddProduct/></PrivateRoute>,
  },
  {
    path: "manage-items",
    element: <PrivateRoute role="admin"><Manageproduct/></PrivateRoute>,
  },
  {
    path: "update-post/:id",
    element: <PrivateRoute role="admin"><Updateproduct/></PrivateRoute>,
  },
  {
    path: "users",
    element: <PrivateRoute role="admin"><Manageuser/></PrivateRoute>,
  },

  {
    path: "manage-orders",
    element: <PrivateRoute role="admin"><ManageOrder/></PrivateRoute>,
  },
    ],
  },
  
 
]);
export default router;
