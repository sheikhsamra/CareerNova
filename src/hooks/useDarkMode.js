import { useState, useEffect } from "react";

const useDarkMode = () => {
  const [darkMode, setDarkMode] = useState(() => {
    // Check karo localStorage mein pehle se kya hai
    const savedTheme = localStorage.getItem("theme");
    // Agar kuch saved nahi hai toh "false" (Light Mode) default rakho
    return savedTheme === "dark" ? true : false;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return [darkMode, setDarkMode];
};

export default useDarkMode;