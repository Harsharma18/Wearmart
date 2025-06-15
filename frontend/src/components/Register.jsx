import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useRegisterUserMutation } from "../redux/Auth/authapi";
import toast from "react-hot-toast";
function Register() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();
  const [registerUser, { isLoading, error }] = useRegisterUserMutation();
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.username || !form.email || !form.password) {
      return toast.error("Please fill in all fields.");
    }
    try {
      //!using rtk query
      const res = await registerUser(form).unwrap();
      toast.success("Registered successfully! Please log in.");
      // console.log(res);
      navigate("/login");

      //*usinf fetch
      // const res = await fetch("http://localhost:8080/api/auth/register",
      //   {
      //     method:"POST",
      //     headers : {"Content-Type":"application/json"},
      //     body:JSON.stringify(form),
      //   }
      // );
      // const data = await res.json();
      // if(res.ok){
      //   console.log(data);
      //   alert("Registerd Succesfully");
      //   navigate("/login");
      // }else{
      //   alert(data.error || "Registration failed");
      // }
      //?using axios
      // const res = await axios.post('http://localhost:8080/api/auth/register', form);
      // alert("Registered Successfully");
      // navigate('/login');
    } catch (err) {
      console.error("Registration error:", err);
      toast.error(err?.data?.message || "Registration failed.");
    }
    // console.log(form);
  };

  return (
    <div className="h-screen flex justify-center items-center p-4">
      <div className="max-w-sm border p-8 shadow-lg rounded-lg mx-auto bg-white">
        <h2 className="text-2xl pt-5 font-semibold">Create Account</h2>
        <form
          onSubmit={handleSubmit}
          className="space-y-5 max-w-sm mx-auto pt-8"
        >
          <input
            name="username"
            type="text"
            onChange={handleChange}
            placeholder="Enter Username"
            className="w-full rounded-md text-gray-700 focus:outline-none bg-gray-100 px-5 py-3"
          />
          <input
            name="email"
            type="email"
            onChange={handleChange}
            placeholder="Enter Email address"
            className="w-full rounded-md text-gray-700 focus:outline-none bg-gray-100 px-5 py-3"
          />
          <input
            name="password"
            type="password"
            onChange={handleChange}
            placeholder="Enter Password"
            className="w-full rounded-md text-gray-700 focus:outline-none bg-gray-100 px-5 py-3"
          />
          <button
            type="submit"
            className="w-full mt-5 font-medium bg-green-600 hover:bg-green-800 px-5 py-3 rounded-md text-white"
          >
            Register
          </button>
        </form>
        <p className="my-5 italic text-sm text-center">
          Already have an account?
          <Link className="ml-2 text-sm text-blue-700" to="/login">
            Login
          </Link>{" "}
          Here.
        </p>
      </div>
    </div>
  );
}

export default Register;
