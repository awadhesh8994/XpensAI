import React, { useState } from "react";
import { toast } from "react-toastify";
import { loginUser } from "../services/AuthService";

function Login() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

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

    /// sent this email and password to server:

    const responseData = await loginUser(loginData);
    console.log(responseData);
  };

  return (
    <div className="max-w-md shadow   rounded-3xl p-10 bg-neutral-100 mx-auto mt-2 md:mt-10 ">
      <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
        Login Here
      </h1>
      <form noValidate action="" onSubmit={submitData}>
        <div>
          <label className="block text-gray-700 mb-1">Email</label>
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
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="mt-2">
          <label className="block text-gray-700 mb-1">Password</label>
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
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="flex justify-center gap-2 mt-3">
          <button
            type="submit"
            className="bg-blue-700 text-white px-3 rounded py-2"
          >
            Login
          </button>
          <button className="bg-orange-700 text-white px-3 rounded py-2">
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
