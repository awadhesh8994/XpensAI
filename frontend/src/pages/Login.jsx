import React from "react";

function Login() {
  return (
    <div className="max-w-md shadow   rounded-3xl p-10 bg-neutral-100 mx-auto mt-2 md:mt-10 ">
      <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
        Login Here
      </h1>
      <form action="">
        <div>
          <label className="block text-gray-700 mb-1">Email</label>
          <input
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
            type="password"
            name="password"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="flex justify-center gap-2 mt-3">
          <button className="bg-blue-700 text-white px-3 rounded py-2">
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
