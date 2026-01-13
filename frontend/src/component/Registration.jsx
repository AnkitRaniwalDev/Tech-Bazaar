import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    

    try {
        const res = await fetch("https://tech-bazaar-z546.onrender.com/api/users/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        const data = await res.json();

        if (res.ok) {
            toast.success("Signup Successfully!");
             window.location.href = "/";
            setFormData({ username: "", email: "", password: "" });
        } else {
            toast.success("Error: " + data.message);
        }

    } catch (error) {
        console.log(error);
        toast.success("Something went wrong");
    }


};


return (
  <div  className="hero min-h-screen bg-base-200 flex justify-center items-center">
    <div className="hero-content flex-col lg:flex-row-reverse w-full max-w-4xl gap-10 lg:gap-20">


      {/* LEFT SIDE: Form Card */}
      <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100 flex-1">
        <form  onSubmit={handleSubmit} className="card-body relative">
          <Link to="/" className=" hidden lg:flex btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</Link>
         <Link to="/" className=' lg:hidden absolute top-4 right-4 text-2xl font-bold text-gray-500 hover:text-red-500  '><span className="text-2xl">←</span></Link>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="enter your username" className="input input-bordered" required />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="enter your email" className="input input-bordered" required />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input type="password" value={formData.password} onChange={handleChange} name="password" placeholder="********" className="input input-bordered" required />
          </div>

          {/* REGISTER BUTTON */}
          <div className="form-control mt-6">
            <button className="btn bg-teal-600 hover:bg-teal-700 text-white border-none text-lg">
              Sign Up
            </button>
          </div>


          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              user allreday have account? {" "}
              <Link to="/login" className="link link-hover text-teal-600 font-bold">
                Login here
              </Link>
            </p>
          </div>

        </form>
      </div>

    </div>
  </div>
);
};

export default Signup;