import {
  faBars,
  faHamburger,
  faRightFromBracket,
  faSchool,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, fabClasses } from "@mui/material";
import React, { useEffect } from "react";
import SidebarList from "../elements/sidebarList";
import VideosList from "../elements/VideoList";
import { uselocalStore } from "../store/store";
import LoginRole from "../elements/LoginRole";

const StudentHome = () => {
  const {
    showSidebar,
    setShowSidebar,
    toggleSidebar,
    userLoggingIn,
    setUserLogginIn,
  } = uselocalStore();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setUserLogginIn(false);
    }, 5000);

    // Clear the timeout to avoid memory leaks
    return () => clearTimeout(timeout);
  }, []); // Empty dependency array ensures this effect runs only once

  if (userLoggingIn) return <LoginRole />;
  return (
    <div className="h-screen w-screen py-[10vh]  bg-HomeBG-main ">
      <div className="flex h-full gap-[2rem]">
        <SidebarList />
        <div
          className={`content h-[90vh] bg-HomeBG-content absolute md:static w-[100vw] md:w-[100%] overflow-auto rounded-2xl`}
        >
          <VideosList />
        </div>
      </div>
    </div>
  );
};

export default StudentHome;
