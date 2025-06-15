import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useLoginUserMutation } from "../redux/Auth/authapi";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/Auth/authSlice";
import toast from "react-hot-toast";
function Login() {
  // const [email ,setemail] = useState('');
  // const [password,setpassword] = useState('');
  const [ep, setep] = useState({ email: "", password: "" });
  const [loginUser, { isLoading, error }] = useLoginUserMutation();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setep({ ...ep, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate();
  const handlesubmit = async (e) => {
    e.preventDefault();
    if (!ep.email || !ep.password) {
      return toast.error("Please fill in all fields.");
    }
    try {
      //! using rtk query

      const res = await loginUser(ep).unwrap();
      // console.log(res);
      // const {token ,user} = res;
      // dispatch(setUser({token ,user}));
      dispatch(setUser({ user: res.user, token: res.token }));
      toast.success("Login successful!");
      navigate("/");
      //* using fetch
      // const res = await fetch("http://localhost:8080/api/auth/login", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   credentials: "include", // this allows sending the token cookie
      //   body: JSON.stringify(ep),
      // });

      // const data = await res.json();
      // if (res.ok) {
      //   alert("Login successful!");
      //  navigate("/");
      // } else {
      //   alert(data.message || "Login failed");
      // }
      //? using axios
      // const res = await axios.post(
      //   'http://localhost:8080/api/auth/login',
      //   ep,
      //   { withCredentials: true } // this sends cookies (for auth)
      // );
      // alert("Login successful!");
      // navigate('/');
    } catch (err) {
       toast.error(err?.data?.message || err?.message || err?.data || "Something went wrong");
      console.error("Login error:", err);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center p-4">
      <div className="max-w-sm border p-8 shadow-lg rounded-lg mx-auto bg-white">
        <h2 className="text-2xl pt-5 font-semibold">Please Login</h2>
        <form
          onSubmit={handlesubmit}
          className="space-y-5 max-w-sm mx-auto pt-8"
        >
          <input
            onChange={handleChange}
            name="email"
            type="email"
            placeholder="Enter Email addrress"
            className="w-full rounded-md text-gray-700  focus:outline-none  bg-gray-100 px-5 py-3"
          ></input>
          <input
            onChange={handleChange}
            name="password"
            type="password"
            placeholder="Enter Password"
            className="w-full rounded-md text-gray-700  focus:outline-none  bg-gray-100 px-5 py-3"
          ></input>
          <button className="w-full mt-5  font-medium  bg-red-500 hover:bg-red-700  px-5 py-3 rounded-md text-white">
            Submit
          </button>
        </form>
        <p className="my-5 italic text-sm text-center">
          Don't Have an account?
          <Link className="ml-2 text-sm text-blue-700" to="/register">
            Register
          </Link>{" "}
          Here.
        </p>
      </div>
    </div>
  );
}

export default Login;
