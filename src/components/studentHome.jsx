import {
  faBars,
  faHamburger,
  faRightFromBracket,
  faSchool,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, fabClasses } from "@mui/material";
import React from "react";
import SidebarList from "../elements/sidebarList";
import VideosList from "../elements/VideoList";
import { uselocalStore } from "../store/store";

const StudentHome = () => {

   const {  showSidebar, setShowSidebar, toggleSidebar } =uselocalStore();

  return (
    <div className="h-screen w-screen py-[10vh]  bg-HomeBG-main ">
      <div className="flex h-full">
          <SidebarList />
        <div className="content border border-solid h-[90vh] w-[75%] overflow-auto">
          {/* <VideosList /> */}
        </div>
      </div>
    </div>
  );
};

export default StudentHome;
