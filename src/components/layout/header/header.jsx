import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Menu from "../menu/menu.jsx";
import logoLight from "../../../assets/img/logo-light.svg";
import logoDark from "../../../assets/img/logo-dark.svg";
import { Sun1, Moon } from "iconsax-react";
import { useSelector } from "react-redux";
import useSound from 'use-sound';
import boopSfx from '../../../assets/sound/click.wav';

function header() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { role } = useSelector((state) => state.auth);
  const [play] = useSound(boopSfx);

  // Function to toggle dark mode
  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    play();
    
    setIsDarkMode(newMode);
    if (newMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("darkMode", "enabled");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("darkMode", "disabled");
    }
  };
  // Navigate based on user role
  const roleRoutes = {
    ADMIN: "/admin-dashboard",
    ACCOUNT_HOLDER: "/dashboard",
  };
  const defaultRoute = "/home";

  // Check localStorage for saved preference on component load
  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode");
    if (savedMode === "enabled") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  return (
    <header className="h-10v flex items-center justify-between bg-bgColor dark:bg-darkBgColor text-textColor dark:text-darkTextColor px-4">
      <Link
        to={roleRoutes[role] || defaultRoute}
        className="flex items-center m-2"
      >
        {isDarkMode ? (
          <img src={logoDark} alt="Budget App Logo" className="inline-block h-12 w-12" />
        ) : (
          <img src={logoLight} alt="Budget App Logo" className="inline-block h-12 w-12" />
        )}
        <h3 className="mx-2 font-black hover:text-primaryTextColor xs:hidden sm:hidden md:inline-block lg:inline-block">Budget Tracker App</h3>
      </Link>
      <div className="flex items-center">
        <Menu />
        <div onClick={toggleDarkMode} className="ml-2">
          {isDarkMode ? (
            <Sun1
              size="24"
              className="text-textColor dark:text-darkTextColor hover:animate-spin"
              title="Switch to Light Mode"
            />
          ) : (
            <Moon
              size="24"
                className="text-textColor dark:text-darkTextColor hover:animate-ping"
              title="Switch to Dark Mode"
            />
          )}
        </div>
      </div>
    </header>
  );
}

export default header;
