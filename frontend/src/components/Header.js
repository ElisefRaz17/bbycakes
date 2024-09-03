import React, { useState } from "react";
import Logo from "../assets/SquarLogo.png";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";

function Header() {
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  const navItems = [
    { id: 1, text: "Home", url: "/" },
    { id: 2, text: "About", url: "/about" },
    { id: 3, text: "Catalog", url: "/catalog" },
    { id: 4, text: "Login", url: "/login" },
    { id: 5, text: "Register", url: "/register" },
    { id: 6, text: "Profile", url: "/profile" },
    { id: 7, text: "Order", url: "/order" },
  ];
  return (
    <div className="bg-orange-100 flex justify-between items-center h-24 mx-auto px-4 text-black drop-shadow-md">
      {/**Business Logo*/}
      <img alt="BbyCakes Logo" src={Logo} style={{ height: "100px" }} />
      {/**Desktop Nav */}
      <ul className="hidden md:flex">
        {navItems.map((item) => (
          <li
            key={item.id}
            className="p-4 hover:bg-[white] rounded-xl m-2 cursor-pointer duration-300 hover:text-black"
          >
            <Link to={item.url}>{item.text}</Link>
          </li>
        ))}
      </ul>
      {/**Mobile Navigation Icon */}
      <div onClick={handleNav} className="block md:hidden">
        {nav ? <CloseIcon size={20} /> : <MenuIcon size={20} />}
      </div>
      {/**Mobile Navigation Menu */}
      <ul
        className={
          nav
            ? "fixed md:hidden left-0 top-0 w-[60%] h-full shadow bg-orange-100 ease-in-out duration-500"
            : "ease-in-out w-[60%] duration-500 fixed top-0 bottom-0 left-[-100%]"
        }
      >
        {navItems.map((item) => (
          <li
            key={item.id}
            className="p-4 hover:bg-[white] duration-300 hover:text-black cursor-pointer"
          >
            {item.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Header;
