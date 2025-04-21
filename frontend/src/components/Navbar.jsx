import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Cartmodel from "../pages/Shops/cartModel";
import avtarImg from "../assets/avtar.png";
import { useLogoutUserMutation } from "../redux/Auth/authapi";
import { logout } from "../redux/Auth/authSlice";
const Navbar = () => {
  const [isMenu,setisMenu] = useState(false);
  const [isCartopen,setIscartopen] = useState(false);
  function handlecarttoggle(){
    setIscartopen((prev)=>!prev);
    setisMenu(false);
  }
   const isMenuref = useRef(null);
   const navigate = useNavigate();
   const dispatch = useDispatch();
    const [logoutUser] = useLogoutUserMutation();
     const handlelogout = async()=>{
      try{
        await logoutUser().unwrap();
        dispatch(logout());
        navigate("/login");


      }catch(err){
        console.log("Failed to  logout",err);
      }
     }
   const [dropdownprofle,setdropdownprofile] = useState(false);
   const handledropdownprofile = ()=>{
    setdropdownprofile(!dropdownprofle);
   }
   //*admin dropdown profile
   const admindropdown = [
    {label:"Dashboard",path:"/dashboard/admin"},
    {label:"Manage Items",path:"/dashboard/manage-items"},
    {label:"All Orders",path:"/dashboard/manage-orders"},
    {label:"Add New Posts",path:"/dashboard/add-new-post"},
   ]
   //? user dropdown menu
   const userdropdown = [
    {label:"Dashboard",path:"/dashboard/admin"},
    {label:"Profile",path:"/dashboard/profile"},
    {label:"Payments",path:"/dashboard/payments"},
    {label:"Orders",path:"/dashboard/orders"},
    
   ]
   //
   const {user} = useSelector((state)=>state.auth);
  //  console.log("auth",user);
  const dropdownmenu = user?.role === "admin" ? [...admindropdown]:[...userdropdown]

   const {cartItems} = useSelector((state)=>state.cart);
   const toggleButtonRef = useRef(null);
   useEffect(() => {
    const handleclickoutside = (e) => {
      if (
        isMenuref.current &&
        !isMenuref.current.contains(e.target) &&
        toggleButtonRef.current &&
        !toggleButtonRef.current.contains(e.target) 
      ) {
        setisMenu(false);
      }
    };
    document.addEventListener("mousedown", handleclickoutside);
    return () => {
      document.removeEventListener("mousedown", handleclickoutside);
    };
  }, []);
  

  
  return (
   <div className="w-full h-20   px-6 bg-white/90 backdrop-blur-sm  border-b border-gray-100 shadow-sm">
     
    <nav className="flex justify-between items-center h-full" >
        <ul className="hidden md:flex gap-8 text-lg font-medium text-gray-700 ">
        <li>
            <Link to="/" className="hover:text-blue-600 transition duration-300">Home</Link>
          </li>
          <li>
            <Link to="/shop" className="hover:text-blue-600 transition duration-300">Shop</Link>
          </li>
          <li>
            <Link to="/" className="hover:text-blue-600 transition duration-300">Pages</Link>
          </li>
          <li>
            <Link to="/" className="hover:text-blue-600 transition duration-300">Contact</Link>
          </li>
            
        </ul>
        {/* logo */}
        <div className="text-4xl font-extrabold">
  <Link to="/" className="font-[Poppins] text-gray-900 ">
    Wear<span className="text-red-500">Mart</span>
  </Link>
</div>
{/* icons */}


        <div className=" hidden md:flex items-center gap-6 text-xl text-gray-700">
          
          <span>
            <Link to="/search"> <i className=" hover:text-blue-600 transition duration-300 fa-solid fa-magnifying-glass"></i></Link>
          </span>
          <span>
          <button onClick={handlecarttoggle} className="hover:text-blue-600 transition duration-300">
         <i className="fa-solid fa-cart-shopping"></i>
          <sup className="text-sm text-white rounded-full bg-red-500 px-1.5 inline-block text-center">{cartItems.length}</sup>
          </button>
          </span>
        
         
          <span className="">
  {user ? (
    <>
      <img
        onClick={handledropdownprofile}
        className="size-8 border-2 border-gray-300 rounded-full cursor-pointer transition-transform hover:scale-105"
        src={user?.profileImg || avtarImg}
        alt="User Profile"
      />
      {dropdownprofle && dropdownmenu && (
        <div className="absolute right-0 mt-3 w-52 rounded-xl bg-white shadow-lg   z-50">
          <ul className="p-3 space-y-2 text-sm font-medium text-gray-700">
            {dropdownmenu.map((item, index) => (
              <li
                key={index}
                onClick={() => setdropdownprofile(false)}
                className="hover:bg-gray-100 rounded-lg px-3 py-2 transition-colors duration-150"
              >
                <Link to={item.path} className="block w-full">
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="hover:bg-red-100 text-red-600 rounded-lg px-3 py-2 transition-colors duration-150">
              <Link onClick={handlelogout} className="block w-full">
                Log out
              </Link>
            </li>
          </ul>
        </div>
      )}
    </>
  ) : (
    <Link to="/login" className="text-gray-600 hover:text-blue-500 transition-colors duration-200">
      <i className="fa-solid fa-user text-xl"></i>
    </Link>
  )}
</span>

        </div>
        {
  isMenu ? (
    <button
    ref={toggleButtonRef}
      onClick={() => setisMenu(false)}
      className="md:hidden text-2xl text-gray-900"
    >
      <i className="fa-solid fa-xmark"></i>
    </button>
  ) : (
    <button
    ref={toggleButtonRef}
      onClick={() => setisMenu(true)}
      className="md:hidden text-2xl text-gray-900"
    >
      <i className="fa-solid fa-bars"></i>
    </button>
  )
}

    
      {/* Mobile Menu */}
      {isMenu && (
    <div  className="fixed z-10 inset-0 bg-black/40">
      
    <div
      ref={isMenuref}
     
      className="fixed  top-20 left-0 w-full bg-white shadow-lg py-4 flex flex-col justify-center items-center z-10 "
    >
  
      <ul className="flex flex-col items-center gap-4 text-lg font-medium text-gray-700 ">
        <li>
          <Link to="/" className="hover:text-blue-600 transition duration-300">Home</Link>
        </li>
        <li>
          <Link to="/shop" className="hover:text-blue-600 transition duration-300">Shop</Link>
        </li>
        <li>
          <Link to="/" className="hover:text-blue-600 transition duration-300">Pages</Link>
        </li>
        <li>
          <Link to="/" className="hover:text-blue-600 transition duration-300">Contact</Link>
        </li>
      </ul>

      <div className="flex justify-center gap-6 text-xl mt-4 text-gray-700 ">
        <Link to="/search" className="hover:text-blue-600 transition">
          <i className="fa-solid fa-magnifying-glass"></i>
        </Link>
        <button
        onClick={handlecarttoggle}
         className="hover:text-blue-600 transition relative">
          <i className="fa-solid fa-cart-shopping"></i>
          <sup className="text-sm text-white rounded-full bg-red-500 px-1.5 inline-block text-center">{cartItems.length}</sup>
        </button>
        {user && (
  <div className=" flex items-center gap-3">
    <img
      onClick={handledropdownprofile}
      className="size-9 border-2 border-gray-300 rounded-full cursor-pointer transition-transform hover:scale-105"
      src={user?.profileImg || avtarImg}
      alt="User Avatar"
    />
    
    {dropdownprofle && (
      <div className="absolute top-12 left-2 md:right-4  bg-white border border-gray-200 rounded-xl shadow-md min-w-[180px] p-4">
        <ul className="space-y-3 text-sm text-gray-700 font-medium">
          {dropdownmenu.map((item, index) => (
            <li
              key={index}
              onClick={() => setdropdownprofile(false)}
              className="hover:bg-gray-100 px-3 py-2 rounded-lg transition-all"
            >
              <Link to={item.path} className="block w-full">
                {item.label}
              </Link>
            </li>
          ))}
          <li className="hover:bg-red-100 px-3 py-2 rounded-lg text-red-500 transition-all">
            <Link onClick={handlelogout} className="block w-full">
              Log out
            </Link>
          </li>
        </ul>
      </div>
    )}
  </div>
)}



      </div>
    </div>
   
    </div>
   
)}
     </nav>
  {isCartopen && (
    
    <Cartmodel 
   cartItems={cartItems} 
   isCartopen={isCartopen} 
   onClose={handlecarttoggle}
 />
 
)}   
   
   </div>
   
  )
}

export default Navbar;
