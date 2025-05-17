import {createBrowserRouter} from "react-router-dom";
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

const router = createBrowserRouter(
    [
        {
            path:"/",
            element:<App></App>,
            children:[
                {
                    path:"/",
                    element:<Home/>
                },{
                    path:"/categories/:categoryName",
                    element:<Categorypage/>
                },
                {
                    path:"/search",
                    element:<Searchpage/>
                },
                {
                    path:"/shop",
                    element:<Shoppage/>
                },
                {
                    path:"/shop/:id",
                    element:<SingleProduct/>
                },
                {
                    path:"/success",
                    element:<PaymentSuccess/>
                },
                {
                    path:"/cancel",
                    element:<PaymentCancel/>
                }

            ]
        },
        {
            path:"/login",
            element:<Login/>

        },
        {
            path:"/register",
            element:<Register/>

        }
    ]
);
export default router;