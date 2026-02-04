import React from "react";
import { Link } from "react-router-dom";
import "../App.css";
import hero from "../assets/hero.webp";
import Templates from "./Templates";
import About from "./About";
import { useAuth } from "../context/AuthContext";
import Marquee from "../components/Marquee";

const Home = () => {
  const { user } = useAuth();
  return (
    <>
      {/* bg-white (Light Mode default)
        dark:bg-black (Dark Mode trigger)
      */}
      <main
        className="
        home
        flex flex-col-reverse md:flex-row
        items-center justify-center
        gap-10
        px-6 md:px-20
        transition-colors duration-500
        mx-auto
        max-w-425
        py-24
        "
      >
        {/* TEXT SECTION */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h1 className="text-3xl md:text-6xl font-extrabold mb-6 text-black">
            Welcome to <span className="heading">CareerNova</span>
          </h1>

          <p className="text-base md:text-xl mb-8 max-w-md mx-auto md:mx-0 text-gray-600 dark:text-gray-400">
            Create professional, eye-catching resumes with beautifully
            designed templates that help you stand out and get hired faster.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link 
              to={user ? "/createresume" : "/signup"} 
              className="btn px-8 py-3 text-white font-bold rounded-lg transition-all shadow-md"
            >
              Get Started
            </Link>

            <Link 
              to="/about" 
              className="px-8 py-3 transition-all shadow-sm btn-outline"
            >
              Learn More
            </Link>
          </div>
        </div>

        {/* IMAGE SECTION */}
        <div className="w-full flex justify-center transform transition duration-500 hover:scale-[1.02]">
          <img
            src={hero}
            alt="Hero"
            className="w-full max-w-150 transition-all"
          />
        </div>
      </main>
        <Marquee />

      {/* About aur Templates sections ko bhi wrapper mein rakha hai */}
      <div className="bg-white dark:bg-black transition-colors duration-500">
        <About />
        <Templates />
      </div>
    </>
  );
};

export default Home;