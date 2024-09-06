import React, { useState, useEffect } from "react";
import { IoMoonOutline } from "react-icons/io5";
import { IoMoonSharp } from "react-icons/io5";

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Check if the user has a saved preference
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <div className="flex items-center light:bg-white light:text-darker-blue2 dark:bg-dark-blue font-semibold dark:text-white justify-between px-16 py-7 w-full">
      <span className="md:text-2xl text-sm">Where in the world? </span>
      <button
        onClick={toggleDarkMode}
        className="md:text-xl text-xs capitalize flex items-center justify-center gap-2"
      >
        {darkMode ? (
          <span className="flex gap-2 items-center">
            {" "}
            <IoMoonOutline /> Light mode{" "}
          </span>
        ) : (
          <span className="flex gap-2 items-center">
            <IoMoonSharp /> dark mode{" "}
          </span>
        )}
      </button>
    </div>
  );
}
