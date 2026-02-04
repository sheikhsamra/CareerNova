// App.jsx
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import CreateResume from "./pages/CreateResume";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Templates from "./pages/Templates";
import Template1 from "./components/Templates/Template1";
import Template2 from "./components/Templates/Template2";
import Template3 from "./components/Templates/Template3";
import Footer from "./components/Footer";
import useDarkMode from "./hooks/useDarkMode";

function App() {
  useDarkMode(); // Initialize the hook to load theme

  return (
    <div className="bg-white dark:bg-black min-h-screen text-gray-800 dark:text-gray-200">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/templates" element={<Templates />} />
        <Route path="/template/1" element={<Template1 />} />
        <Route path="/template/2" element={<Template2 />} />
        <Route path="/template/3" element={<Template3 />} />
        <Route path="/Createresume" element={<CreateResume />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
