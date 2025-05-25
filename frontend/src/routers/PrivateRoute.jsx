import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate,useLocation } from 'react-router-dom';

function PrivateRoute({children ,role}) {
    const {user} = useSelector((state)=>state.auth);
    // console.log("private route",user);
    const location = useLocation();
    // console.log("pr location",location);
    if(!user){
        alert("you must be logged in");

        return  <Navigate to="/login" state={{from:location}} replace></Navigate>
    }
    if(role && user.role!=role){
         alert('You are not authorized to access this page!')
        return <Navigate to="/login" state={{from: location}} replace/>
    }
   
  return (
   children
  )
}

export default PrivateRoute