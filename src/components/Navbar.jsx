import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { MdLogout, MdMenu, MdClose } from "react-icons/md";
import { BsMoon, BsSun } from "react-icons/bs";
import useDarkMode from "../hooks/useDarkMode";

const Navbar = () => {
  const { user } = useAuth();
  const [darkMode, setDarkMode] = useDarkMode(); // Dark mode hook
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await signOut(auth);
    setMobileMenuOpen(false);
  };

  // Switch Theme Function
  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  // Original button style classes
  const btnGradient =
    "relative inline-block px-4 py-2 font-medium text-white rounded overflow-hidden group";
  const btnGradientInner =
    "absolute inset-0 bg-gradient-to-r from-[#10b98c] via-[#48fad6] to-[#0d312a] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500";

  return (
    <nav className="fixed top-0 left-0 right-0 mx-auto w-full max-w-425 z-50 bg-white dark:bg-black transition-colors duration-300 py-4 nav">
      <div className="flex justify-between items-center p-2 md:px-12">
        {/* Logo */}
        <Link to="/" className="logo cursor-pointer text-lg md:text-2xl font-bold text-transparent bg-clip-text bg-linear-to-r from-[#10b98c] via-[#48fad6] to-[#0d312a]">
          CareerNova
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="hover:text-[#10b98c] transition menu-item">Home</Link>
          <Link to="/about" className="hover:text-[#10b98c] transition menu-item">About</Link>
          <Link to="/templates" className="hover:text-[#10b98c] transition menu-item">Templates</Link>
          <Link to="/Createresume" className="hover:text-[#10b98c] transition menu-item">Create Resume</Link>
          {user && <Link to="/dashboard" className="hover:text-[#10b98c] transition menu-item">Dashboard</Link>}
        </div>

        {/* Desktop Buttons + Theme Toggle */}
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
                <span className="relative login">Login</span>
              </Link>
              <Link to="/signup" className={btnGradient}>
                <span className={btnGradientInner}></span>
                <span className="relative signup">Signup</span>
              </Link>
            </>
          )}

          {/* Theme Toggle Button (Desktop) */}
          <button
          onClick={() => setDarkMode(!darkMode)} // Ab ye sahi toggle karega
          className="p-2 rounded-full transition hover:text-[#10b98c] dark:text-[#48fad6]"
        >
        {darkMode ? <BsSun size={20} /> : <BsMoon size={20} />}
        </button>
        </div>

        {/* Mobile View Icons */}
        <div className="md:hidden flex items-center gap-3">
          {/* Theme Toggle Button (Mobile) */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-yellow-400 transition"
          >
            {darkMode ? <BsSun size={20} /> : <BsMoon size={20} />}
          </button>
          
          {/* Hamburger Menu */}
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
        className={`fixed top-0 left-0 w-full h-screen bg-white dark:bg-black z-40 flex flex-col items-start px-10 justify-center space-y-6 md:hidden transition-transform duration-300 ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Link to="/" className="text-2xl text-gray-800 dark:text-gray-200" onClick={() => setMobileMenuOpen(false)}>Home</Link>
        <Link to="/about" className="text-2xl text-gray-800 dark:text-gray-200" onClick={() => setMobileMenuOpen(false)}>About</Link>
        <Link to="/templates" className="text-2xl text-gray-800 dark:text-gray-200" onClick={() => setMobileMenuOpen(false)}>Templates</Link>
        <Link to="/Createresume" className="text-2xl text-gray-800 dark:text-gray-200" onClick={() => setMobileMenuOpen(false)}>Create Resume</Link>
        {user && (
          <Link to="/dashboard" className="text-2xl text-gray-800 dark:text-gray-200" onClick={() => setMobileMenuOpen(false)}>Dashboard</Link>
        )}

        {user ? (
          <button onClick={handleLogout} className={btnGradient}>
            <span className={btnGradientInner}></span>
            <span className="relative flex items-center gap-1">
              <MdLogout /> Logout
            </span>
          </button>
        ) : (
          <div className="flex flex-col gap-4 w-full">
            <Link to="/login" className={btnGradient} onClick={() => setMobileMenuOpen(false)}>
              <span className={btnGradientInner}></span>
              <span className="relative text-xl text-center block">Login</span>
            </Link>
            <Link to="/signup" className={btnGradient} onClick={() => setMobileMenuOpen(false)}>
              <span className={btnGradientInner}></span>
              <span className="relative text-xl text-center block">Signup</span>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;