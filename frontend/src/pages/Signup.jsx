import React, { useState } from "react";
import { createUser } from "../services/UserService";
import { toast } from "react-toastify";
import GradientBackground from "../components/GradientBackground.jsx";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    gender: "",
    age: "",
  });

  const [errors, setErrors] = useState([]);
  const [creating, setCreating] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setCreating(true);
    setErrors([]);

    console.log("Form Submitted:", formData);
    try {
      const response = await createUser(formData);

      console.log(response);
      console.log("user created");

      toast.success("User is created Successfully..");

      setFormData({
        username: "",
        email: "",
        password: "",
        gender: "",
        age: "",
      });
      setCreating(false);
    } catch (error) {
      if (error.status == 400) {
        console.log(error.response.data);
        setErrors(error.response.data);
        toast.error("Validation error");
      } else if (error.status == 403) {
        toast.error("You dont have permission to create user.");
        console.log(error);
      } else {
        toast.error("Server error");
        console.log(error);
      }
      setCreating(false);
    }
  };

  return (
    <GradientBackground>
      <div className="max-w-md mx-auto mt-10 bg-white/95 backdrop-blur-xl p-8 rounded-2xl shadow-xl border border-gray-200/60">
        <h2 className="text-3xl font-black text-center mb-8 bg-gradient-to-r from-indigo-600 to-indigo-800 bg-clip-text text-transparent">
          Create Your Account
        </h2>
        
        {/* Error Display */}
        <div className="mb-6">
          {errors.length > 0 &&
            errors.map((error, index) => (
              <div key={index} className="p-3 border-red-200 mb-3 border rounded-xl bg-red-50/80 backdrop-blur-xl">
                <p className="text-red-600 text-sm font-semibold">
                  {error.property.toUpperCase()}: {error.errorValue}
                </p>
              </div>
            ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Username */}
          <div className="group">
            <label className="block text-gray-700 mb-2 font-semibold">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white/80 backdrop-blur-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all duration-300 group-hover:border-gray-400"
              placeholder="Enter your username"
              required
            />
          </div>

          {/* Email */}
          <div className="group">
            <label className="block text-gray-700 mb-2 font-semibold">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white/80 backdrop-blur-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all duration-300 group-hover:border-gray-400"
              placeholder="you@example.com"
              required
            />
          </div>

          {/* Password */}
          <div className="group">
            <label className="block text-gray-700 mb-2 font-semibold">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white/80 backdrop-blur-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all duration-300 group-hover:border-gray-400"
              placeholder="Enter a strong password"
              required
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block text-gray-700 mb-3 font-semibold">Gender</label>
            <div className="flex space-x-6">
              <label className="inline-flex items-center group cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={formData.gender === "male"}
                  onChange={handleChange}
                  className="text-indigo-600 focus:ring-indigo-500 focus:ring-2"
                />
                <span className="ml-2 text-gray-700 font-medium group-hover:text-indigo-700 transition-colors duration-200">Male</span>
              </label>
              <label className="inline-flex items-center group cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={formData.gender === "female"}
                  onChange={handleChange}
                  className="text-indigo-600 focus:ring-indigo-500 focus:ring-2"
                />
                <span className="ml-2 text-gray-700 font-medium group-hover:text-indigo-700 transition-colors duration-200">Female</span>
              </label>
            </div>
          </div>

          {/* Age */}
          <div className="group">
            <label className="block text-gray-700 mb-2 font-semibold">Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              min="0"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white/80 backdrop-blur-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all duration-300 group-hover:border-gray-400"
              placeholder="Your age"
              required
            />
          </div>

          {/* Submit */}
          <div className="pt-2">
            <button
              disabled={creating}
              type="submit"
              className="relative w-full py-3 rounded-xl text-lg font-bold text-white bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 disabled:from-gray-400 disabled:to-gray-500 shadow-lg hover:shadow-xl hover:shadow-indigo-500/25 transition-all duration-300 hover:scale-[1.02] disabled:hover:scale-100 overflow-hidden group"
            >
              {/* Shimmer effect */}
              {!creating && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></div>
              )}
              
              <span className="relative z-10">
                {creating ? "Creating account..." : "Sign Up"}
              </span>
            </button>
          </div>
        </form>
      </div>
    </GradientBackground>
  );
};

export default Signup;