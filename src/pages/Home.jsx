import React from "react";
import { Link } from "react-router-dom";
import "../App.css";
import hero from "../assets/hero.webp";
import Templates from "./Templates";
import About from "./About";

const Home = () => {
  return (
    <>
      <main
        className="
        min-h-screen
        flex flex-col-reverse md:flex-row
        items-center justify-center
        gap-10
        px-6 md:px-30
        transition-colors duration-300
        py-30
        "
      >
        {/* TEXT SECTION */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h1 className="heading text-3xl md:text-5xl font-bold mb-6">
            Welcome to CareerNova
          </h1>

          <p className="text-base md:text-xl mb-6 max-w-md mx-auto md:mx-0">
            Create professional, eye-catching resumes with beautifully
            designed templates that help you stand out and get hired faster.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link to="/signup" className="btn">
              Get Started
            </Link>

            <Link to="/about" className="btn-outline">
              Learn More
            </Link>
          </div>
        </div>

        {/* IMAGE SECTION */}
        <div className="w-full md:w-1/2 relative">
          <img
            src={hero}
            alt="Hero"
            className="w-full max-w-md md:max-w-full mx-auto rounded-lg shadow-lg"
          />
        </div>
      </main>

      {/* EXTRA SECTIONS */}
      <About />
      <Templates />
    </>
  );
};

export default Home;
