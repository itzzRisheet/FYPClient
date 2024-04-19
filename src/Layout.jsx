import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/navbar";
import DahsNavbar from "./components/dashNavbar";

import ConditionalNavbar from "./components/conditionalNavbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRobot } from "@fortawesome/free-solid-svg-icons";
import { useGSAP } from "@gsap/react";
import ChatBOT from "./elements/ChatBOT";
import { uselocalStore } from "./store/store";

const Layout = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const [bounceEffect, setBounceEffect] = useState(true);
  const { addTopicOpen , addClassOpen} = uselocalStore();

  useEffect(() => {
    if(addClassOpen || addTopicOpen){
      setBounceEffect(false);
    }else{
      setBounceEffect(true);
    }
  },[addTopicOpen , addClassOpen ])

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "Escape") {
        // Update state when the "Escape" key is pressed
        setChatOpen(false);
      }
    };

    // Add event listener when component mounts
    window.addEventListener("keydown", handleKeyPress);

    // Remove event listener when component unmounts
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);


  return (
    <div>
      <ToastContainer />
      <ConditionalNavbar />
      <Outlet />
      <div
        className={`chat-Icon absolute right-10 bottom-10 ${addTopicOpen || addClassOpen ? "brightness-[10%]" : ""} z-[49] p-2`}
        onClick={() => {
          setChatOpen(true);
        }}
      >
        {chatOpen ? (
          <ChatBOT />
        ) : (
          <FontAwesomeIcon
            icon={faRobot}
            bounce={bounceEffect}
            className="text-white text-4xl cursor-pointer hover:text-emerald-300 transition-all duration-300"
            onMouseEnter={() => {
              setBounceEffect(false);
            }}
            onMouseLeave={() => {
              setBounceEffect(true);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Layout;
