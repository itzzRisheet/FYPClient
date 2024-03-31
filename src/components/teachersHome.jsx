import React, { useEffect, useState } from "react";
import SidebarList from "../elements/sidebarList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useFormik } from "formik";
import AddClassBox from "../elements/addClassbox";
import { useClassData, uselocalStore } from "../store/store";
import ClassList from "../elements/classList";
import LoginRole from "../elements/LoginRole";

const TeacherHome = () => {
  const { addClassOpen, setAddClassOpen, userLoggingIn, setUserLogginIn } =
    uselocalStore();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setUserLogginIn(false);
    }, 5000);

    // Clear the timeout to avoid memory leaks
    return () => clearTimeout(timeout);
  }, []); // Empty dependency array ensures this effect runs only once

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "Escape") {
        // Update state when the "Escape" key is pressed
        setAddClassOpen(false);
      }
    };

    // Add event listener when component mounts
    window.addEventListener("keydown", handleKeyPress);

    // Remove event listener when component unmounts
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  if (userLoggingIn) return <LoginRole />;

  return (
    <div className="relative ">
      {addClassOpen && <AddClassBox />}
      <div
        className={`z-10  h-screen w-screen  py-[10vh] transition-all duration-300 ${addClassOpen ? "brightness-[30%]" : ""} bg-HomeBG-main `}
      >
        <div className="flex h-full gap-[2rem]">
          <SidebarList />
          <div
            className={`content absolute md:static w-[100vw] md:w-[100%] bg-HomeBG-content  h-[90vh]  overflow-auto`}
          >
            <div className="title h-[10%] flex py-2 px-4 justify-center text-white ">
              Title
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherHome;
