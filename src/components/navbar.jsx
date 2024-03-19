import React from "react";

const Navbar = () => {
  return (
    <div className="h-[4rem] flex fixed top-5 w-screen z-10 ">
      <nav className="w-[80%] h-[100%] text-white rounded-[30px]  flex justify-between  backdrop-blur-2xl m-auto">
        <div className="flex items-center p-3">LOGO</div>
        <div className="h-[100%] px-4 ">
          <ul className="flex items-center gap-5 h-[100%] ">
            <li className="list">about</li>
            <li className="list">features</li>
            <li className="list">Members</li>
            <li className="flex items-center p-2 rounded-md bg-blue-700 transition-color duration-200 hover:bg-blue-900 cursor-pointer ">
              Try now
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
