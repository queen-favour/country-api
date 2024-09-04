import React, { useState } from "react";
import { IoMoonOutline } from "react-icons/io5";

export default function Navbar() {
  return (
    <div className="flex items-center light:bg-white light:text-darker-blue2 dark:bg-dark-blue font-semibold dark:text-white  justify-between px-16 py-7 w-full">
      <span className="text-2xl">Where in the world? </span>
      <button className="text-xl capitalize flex items-center justify-center gap-2">
        <IoMoonOutline />
        dark mode
      </button>
    </div>
  );
}
