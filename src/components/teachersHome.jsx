import React, { useEffect, useState } from "react";
import SidebarList from "../elements/sidebarList";
import AddClassBox from "../elements/addClassbox";
import { uselocalStore } from "../store/store";
import LoginRole from "../elements/LoginRole";
import TeacherClassListPage from "../elements/TeacherClassListPage";

const TeacherHome = () => {
  const {
    addClassOpen,
    setAddClassOpen,
    userLoggingIn,
    setUserLogginIn,
    role,
  } = uselocalStore();

  const [classPage, setClassPage] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setUserLogginIn(false);
    }, 5000);

    // Clear the timeout to avoid memory leaks
    return () => clearTimeout(timeout);
  }, [role]); // Empty dependency array ensures this effect runs only once

  const generateClassCode = () => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let randomString = "";

    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomString += characters[randomIndex];
    }

    return randomString;
  };

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
           
            <TeacherClassListPage />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherHome;
