import React from "react";
import { Link } from "react-router";

function Home() {
  return (
    <section className="relative bg-gradient-to-br h-screen from-white via-indigo-50 to-indigo-100 overflow-hidden">
      {/* Content */}
      <div className="relative  lg:mt-16 max-w-7xl mx-auto px-6 py-32 text-center z-10">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-800">
          Take Control of Your Finances
        </h1>
        <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
          Track your expenses, manage budgets, and gain insights into your
          spending — all in one powerful app.
        </p>
        <div className="mt-8">
          <Link
            to={"/signup"}
            className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-md text-lg font-medium shadow-md hover:bg-indigo-700 transition-all duration-300"
          >
            Get Started Free
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Home;
