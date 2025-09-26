import React, { useState } from "react";
import { toast } from "react-toastify";
import { loginUser } from "../services/AuthService";
import { saveLoginData } from "../services/LocalStorageService";
import { useLocation, useNavigate } from "react-router";
import { useAuthContext } from "../context/AuthContext";
import GradientBackground from "../components/GradientBackground.jsx";

function Login() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const { setUser, setAccessToken } = useAuthContext();
  const navigate = useNavigate();

  const submitData = async (event) => {
    event.preventDefault();

    if (loginData.email.trim() == "") {
      toast.error("Email required !!");
      return;
    }
    if (loginData.password.trim() == "") {
      toast.error("Password required !!");
      return;
    }

    console.log(loginData);

    setLoading(true);
    try {
      const responseData = await loginUser(loginData);
      console.log(responseData);
      saveLoginData(responseData);
      setUser(responseData.user);
      setAccessToken(responseData.accessToken);
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      if (error.status === 403) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Error in login!!");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setLoginData({
      email: "",
      password: "",
    });
  };

  return (
    <GradientBackground>
      <div className="max-w-md mx-auto mt-10 bg-white/95 backdrop-blur-xl p-8 rounded-2xl shadow-xl border border-gray-200/60">
        <h1 className="text-3xl font-black text-center mb-8 bg-gradient-to-r from-indigo-600 to-indigo-800 bg-clip-text text-transparent">
          Welcome Back
        </h1>
        
        <form noValidate onSubmit={submitData} className="space-y-6">
          {/* Email */}
          <div className="group">
            <label className="block text-gray-700 mb-2 font-semibold">Email</label>
            <input
              value={loginData.email}
              onChange={(e) => {
                setLoginData({
                  ...loginData,
                  email: e.target.value,
                });
              }}
              type="email"
              name="email"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white/80 backdrop-blur-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all duration-300 group-hover:border-gray-400"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password */}
          <div className="group">
            <label className="block text-gray-700 mb-2 font-semibold">Password</label>
            <input
              value={loginData.password}
              onChange={(e) => {
                setLoginData({
                  ...loginData,
                  password: e.target.value,
                });
              }}
              type="password"
              name="password"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white/80 backdrop-blur-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all duration-300 group-hover:border-gray-400"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="relative flex-1 py-3 rounded-xl text-lg font-bold text-white bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 disabled:from-gray-400 disabled:to-gray-500 shadow-lg hover:shadow-xl hover:shadow-indigo-500/25 transition-all duration-300 hover:scale-[1.02] disabled:hover:scale-100 overflow-hidden group"
            >
              {/* Shimmer effect */}
              {!loading && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></div>
              )}
              
              <span className="relative z-10">
                {loading ? "Logging in..." : "Login"}
              </span>
            </button>

            <button
              type="button"
              onClick={handleReset}
              className="relative flex-1 py-3 rounded-xl text-lg font-bold text-gray-700 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] overflow-hidden group"
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></div>
              
              <span className="relative z-10">Reset</span>
            </button>
          </div>
        </form>
      </div>
    </GradientBackground>
  );
}

export default Login;