import {
  faBars,
  faRightFromBracket,
  faSchool,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar } from "@mui/material";
import React from "react";
import { uselocalStore } from "../store/store";
import { useNavigate } from "react-router-dom";

const DahsNavbar = () => {
  const { setLoginStatus, showSidebar, setShowSidebar, toggleSidebar } =
    uselocalStore();
  const navigate = useNavigate();

  return (
    <div className="flex absolute w-full justify-between items-center p-4 border-solid border h-[10vh] ">
      <div className="flex items-center gap-4">
        <FontAwesomeIcon
          icon={faBars}
          size="xl"
          color="white"
          onClick={() => {
            console.log(showSidebar);
            toggleSidebar();
          }}
        />
        <FontAwesomeIcon icon={faSchool} size="xl" color="white" />
        <p className="text-white font-mono  font-bold  tracking-wider ">
          Classroom
        </p>
      </div>
      <div className=" flex items-center gap-4 px-4">
        <Avatar />
        <FontAwesomeIcon
          onClick={() => {
            localStorage.removeItem("token");
            setLoginStatus();
            navigate("/");
          }}
          icon={faRightFromBracket}
          className="h-[1.5rem] w-[1.5rem] text-white transition-all duration-300 hover:scale-110 cursor-pointer"
        />
      </div>
    </div>
  );
};

export default DahsNavbar;
