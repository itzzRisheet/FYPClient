import {
  faBars,
  faHamburger,
  faSchool,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, fabClasses } from "@mui/material";
import React from "react";
import SidebarList from "../elements/sidebarList";
import VideosList from "../elements/VideoList";

const StudentHome = () => {
  return (
    <div className="h-screen w-screen flex flex-col bg-HomeBG-main ">
      <div className="flex justify-between items-center p-4 border-solid border h-[10vh] ">
        <div className="flex items-center gap-4">
          <FontAwesomeIcon icon={faBars} size="xl" color="white" />
          <FontAwesomeIcon icon={faSchool} size="xl" color="white" />
          <p className="text-white font-mono  font-bold  tracking-wider ">
            Classroom
          </p>
        </div>
        <Avatar />
      </div>
      <div className="flex h-full">
        <div className="side border border-solid h-[90vh] w-[25%] ">
          <SidebarList />
        </div>
        <div className="content border border-solid h-[90vh] w-[75%] overflow-auto">
          <VideosList />
        </div>
      </div>
    </div>
  );
};

export default StudentHome;
