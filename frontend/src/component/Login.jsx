import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

const Login = () => {

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   

    try {
      const res = await fetch("http://localhost:3000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Signup Successfully!");
        localStorage.setItem("Users",JSON.stringify(data.user));
        localStorage.setItem("token",data.token);
        localStorage.setItem("admin",data.user.role)
        window.location.href = "/";
       setFormData({  email: "", password: "" });
      } else {
        toast.success("Error: " + data.message);
      }

    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }

  };
  return (
    <div  className="hero min-h-screen bg-base-200 flex justify-center items-center">

      <div className="hero-content flex-col lg:flex-row w-full max-w-4xl gap-10 lg:gap-20">



        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100 flex-1">
          <form onSubmit={handleSubmit} className="card-body relative">
            <Link to="/" className=" hidden lg:flex btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</Link>
           <Link to="/" className=' lg:hidden absolute top-4 right-4 text-2xl font-bold text-gray-500 hover:text-red-500  '><span className="text-2xl">←</span></Link>

            {/* 1. Email Input */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="enter your email"
                className="input input-bordered focus:border-teal-500 focus:outline-none"
                required
              />
            </div>

            {/* 2. Password Input */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                className="input input-bordered focus:border-teal-500 focus:outline-none"
                required
              />

              {/* Forgot Password Link (Optional - Abhi ke liye dikhawa hai) */}
              <label className="label ">
                <a href="#" className="label-text-alt link link-hover text-teal-600 mt-10">
                  Forgot password?
                </a>
              </label>
            </div>

            {/* 3. Login Button */}
            <div className="form-control mt-6">
              <button type="submit" className="btn bg-teal-600 hover:bg-teal-700 text-white border-none text-lg">
                Login
              </button>
            </div>

            {/* 4. Link to Signup (Agar account nahi hai) */}
            <div className="text-center mt-4">
              <p className="text-sm text-gray-600">
                Account nahi hai? {" "}
                <Link to="/signup" className="link link-hover text-teal-600 font-bold">
                  Register here
                </Link>
              </p>
            </div>

          </form>
        </div>

      </div>
    </div>
  );
};

export default Login;