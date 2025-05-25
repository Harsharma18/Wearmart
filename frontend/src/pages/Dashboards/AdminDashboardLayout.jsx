import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useLogoutUserMutation } from "../../redux/Auth/authapi";
import { useNavigate, Link, NavLink } from "react-router-dom";
import { logout } from "../../redux/Auth/authSlice";
const navItems = [
    { path: '/dashboard/admin', label: 'Dashboard' },
    { path: '/dashboard/add-new-post', label: 'Add Product'  },
    { path: '/dashboard/manage-items', label: 'Manage Products' },
    { path: '/dashboard/users', label: 'Users'  },
    { path: '/dashboard/manage-orders', label: 'Manage Orders'  },
]
function AdminDashboardLayout() {
  const [logoutUser] = useLogoutUserMutation();
    const {user} = useSelector((state)=>state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handlelogout = async () => {
      try {
        await logoutUser().unwrap();
        dispatch(logout());
        navigate("/");
      } catch (error) {
        console.error("Failed to log out", error);
      }
    };
  
   
    return (
      <div className="space-y-5 bg-white p-8 md:h-screen flex flex-col justify-between">
        <div>
          <div className="font-semibold text-2xl">
            <Link to="/" className="font-[Poppins] text-gray-900 ">
              Wear<span className="text-red-500">Mart.</span>
            </Link>
  
            <p className="text-xs  italic">Admin dashboard</p>
          </div>
  
          <hr className="mt-5 border-gray-200 shadow-2xl" />
  
          <ul className="space-y-5 pt-5">
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "text-blue-600 font-bold" : "text-black"
                  }
                  end
                  to={item.path}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
  
        <div className="mb-3">
          <hr className="mb-3 border-gray-200" />
          <button
            onClick={handlelogout}
            className="text-white bg-red-500 font-medium px-5 py-1 rounded cursor-pointer"
          >
            Logout
          </button>
        </div>
      </div>
  )
}

export default AdminDashboardLayout