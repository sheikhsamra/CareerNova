import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { MdLogout, MdMenu, MdClose } from "react-icons/md";
import { BsMoon, BsSun } from "react-icons/bs";

const Navbar = () => {
  const { user } = useAuth();
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Load theme
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  // Persist theme
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const handleLogout = async () => {
    await signOut(auth);
    setMobileMenuOpen(false);
  };

  // Original button style classes
  const btnGradient =
    "relative inline-block px-4 py-2 font-medium text-white rounded overflow-hidden group";
  const btnGradientInner =
    "absolute inset-0 bg-gradient-to-r from-[#10b98c] via-[#48fad6] to-[#0d312a] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500";

  return (
    <nav className="fixed top-0 left-0 w-full z-50 shadow-md bg-white dark:bg-black transition-colors duration-300">
      <div className="flex justify-between items-center p-4 md:px-12">
        {/* Logo */}
        <div className="logo cursor-pointer text-lg md:text-2xl font-bold text-transparent bg-clip-text bg-linear-to-r from-[#10b98c] via-[#48fad6] to-[#0d312a]">
          CareerNova
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 text-gray-800 dark:text-gray-200">
          <Link to="/" className="menu-item">Home</Link>
          <Link to="/about" className="menu-item">About</Link>
          <Link to="/templates" className="menu-item">Templates</Link>
          <Link to="/Createresume" className="menu-item">Create Resume</Link>
          {user && <Link to="/dashboard" className="menu-item">Dashboard</Link>}
        </div>

        {/* Desktop Buttons + Theme */}
        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <button onClick={handleLogout} className={btnGradient}>
              <span className={btnGradientInner}></span>
              <span className="relative flex items-center gap-1">
                <MdLogout /> Logout
              </span>
            </button>
          ) : (
            <>
              <Link to="/login" className={btnGradient}>
                <span className={btnGradientInner}></span>
                <span className="relative">Login</span>
              </Link>
              <Link to="/signup" className={btnGradient}>
                <span className={btnGradientInner}></span>
                <span className="relative">Signup</span>
              </Link>
            </>
          )}

          {/* Theme Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full bg-gray-200 dark:bg-[#10b98c] hover:bg-gray-300 dark:hover:bg-[#0d312a] transition"
          >
            {darkMode ? <BsSun size={20} /> : <BsMoon size={20} />}
          </button>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center gap-3">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full bg-gray-200 dark:bg-[#10b98c] hover:bg-gray-300 dark:hover:bg-[#0d312a] transition"
          >
            {darkMode ? <BsSun size={20} /> : <BsMoon size={20} />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-2xl text-gray-800 dark:text-gray-200"
          >
            {mobileMenuOpen ? <MdClose /> : <MdMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed top-0 left-0 w-100 h-screen bg-white dark:bg-black z-40 flex flex-col items-start px-10 justify-center space-y-6 md:hidden transition-transform duration-300 ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Link
          to="/"
          className="text-2xl text-gray-800 dark:text-gray-200"
          onClick={() => setMobileMenuOpen(false)}
        >
          Home
        </Link>
        <Link
          to="/about"
          className="text-2xl text-gray-800 dark:text-gray-200"
          onClick={() => setMobileMenuOpen(false)}
        >
          About
        </Link>
        <Link
          to="/templates"
          className="text-2xl text-gray-800 dark:text-gray-200"
          onClick={() => setMobileMenuOpen(false)}
        >
          Templates
        </Link>
        <Link
          to="/Createresume"
          className="text-2xl text-gray-800 dark:text-gray-200"
          onClick={() => setMobileMenuOpen(false)}
        >
          Create Resume
        </Link>
        {user && (
          <Link
            to="/dashboard"
            className="text-2xl text-gray-800 dark:text-gray-200"
            onClick={() => setMobileMenuOpen(false)}
          >
            Dashboard
          </Link>
        )}

        {user ? (
          <button onClick={handleLogout} className={btnGradient}>
            <span className={btnGradientInner}></span>
            <span className="relative flex items-center gap-1">
              <MdLogout /> Logout
            </span>
          </button>
        ) : (
          <>
            <Link to="/login" className={btnGradient}>
              <span className={btnGradientInner}></span>
              <span className="relative text-xl">Login</span>
            </Link>
            <Link to="/signup" className={btnGradient}>
              <span className={btnGradientInner}></span>
              <span className="relative text-xl">Signup</span>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
