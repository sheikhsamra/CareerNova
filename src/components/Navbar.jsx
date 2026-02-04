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
  const [darkMode, setDarkMode] = useDarkMode();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await signOut(auth);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 mx-auto w-full max-w-425 z-50 transition-colors duration-300 nav shadow-md">
      <div className="flex justify-between items-center p-4 md:px-12">
        {/* Logo */}
        <Link to="/" className="logo cursor-pointer">
          CareerNova
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8">
          <Link to="/" className="menu-item">Home</Link>
          <Link to="/about" className="menu-item">About</Link>
          <Link to="/templates" className="menu-item">Templates</Link>
          <Link to="/Createresume" className="menu-item">Create Resume</Link>
          {user && <Link to="/dashboard" className="menu-item">Dashboard</Link>}
        </div>

        {/* Desktop Buttons + Theme Toggle */}
        <div className="hidden md:flex items-center space-x-5">
          {user ? (
            <button onClick={handleLogout} className="nav-btn">
              <span className="relative flex items-center gap-2">
                <MdLogout /> Logout
              </span>
            </button>
          ) : (
            <>
              <Link to="/login" className="nav-btn">Login</Link>
              <Link to="/signup" className="nav-btn">Signup</Link>
            </>
          )}

          {/* Theme Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full transition-all hover:scale-110 toggle-btn "
          >
            {darkMode ? <BsSun size={24} /> : <BsMoon size={24} />}
          </button>
        </div>

        {/* Mobile View Toggle */}
        <div className="md:hidden flex items-center gap-4">
          <button onClick={() => setDarkMode(!darkMode)} className="toggle-btn">
            {darkMode ? <BsSun size={22} /> : <BsMoon size={22} />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-2xl toggle-btn"
          >
            {mobileMenuOpen ? <MdClose /> : <MdMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}

<div
  className={`fixed top-0 left-0 w-full h-screen z-40 flex flex-col items-center justify-center space-y-8 md:hidden transition-transform duration-500 overlay ${
    mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
  }`}
>
  {/* CLOSE BUTTON - Ab ye Top Right par hoga */}
  <button 
    onClick={() => setMobileMenuOpen(false)} 
    className="absolute top-6 right-8 p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white shadow-lg"
  >
    <MdClose size={30} />
  </button>

  {/* NAV LINKS */}
  <Link to="/" className="text-2xl font-semibold" onClick={() => setMobileMenuOpen(false)}>Home</Link>
  <Link to="/about" className="text-2xl font-semibold" onClick={() => setMobileMenuOpen(false)}>About</Link>
  <Link to="/templates" className="text-2xl font-semibold" onClick={() => setMobileMenuOpen(false)}>Templates</Link>
  <Link to="/Createresume" className="text-2xl font-semibold" onClick={() => setMobileMenuOpen(false)}>Create Resume</Link>
  
  {/* DASHBOARD LINK (Only for logged in users) */}
  {user && (
    <Link to="/dashboard" className="text-2xl font-semibold" onClick={() => setMobileMenuOpen(false)}>
      Dashboard
    </Link>
  )}

  {/* AUTH BUTTONS */}
  {user ? (
    <button onClick={handleLogout} className="nav-btn text-xl w-64 justify-center">
      <MdLogout className="mr-2" /> Logout
    </button>
  ) : (
    <div className="flex flex-col gap-4 w-64">
      <Link to="/login" className="nav-btn text-center text-xl" onClick={() => setMobileMenuOpen(false)}>Login</Link>
      <Link to="/signup" className="nav-btn text-center text-xl" onClick={() => setMobileMenuOpen(false)}>Signup</Link>
    </div>
  )}
</div>
    </nav>
  );
};

export default Navbar;