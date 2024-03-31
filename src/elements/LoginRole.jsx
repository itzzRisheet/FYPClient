import React from "react";
import { uselocalStore } from "../store/store";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ReactTypingEffect from "react-typing-effect";

const LoginRole = () => {
  const { role } = uselocalStore();

  useGSAP(() => {
    gsap.fromTo(
      "#loginrole-container",
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.3 }
    );
  });

  return (
    <div className="absolute  bg-HomeBG-main top-0 left-0 h-screen w-screen flex flex-col justify-center items-center">
      <div id="loginrole-container" className="p-[2rem] text-3xl text-white">
        <ReactTypingEffect
          text={[`logging in as a ${role ? "Student" : "Teacher"}`]}
          cursorRenderer={(cursor) => <h1 className="text-[3rem]">{cursor}</h1>}
          speed={100}
          typingDelay={500}
          displayTextRenderer={(text, i) => {
            return (
              <h1 className="text-[3rem]">
                {text.split("").map((char, i) => {
                  const key = `${i}`;
                  return (
                    <span
                      key={key}
                      style={i % 2 === 0 ? { color: "white" } : {}}
                    >
                      {char}
                    </span>
                  );
                })}
              </h1>
            );
          }}
        />
      </div>
    </div>
  );
};

export default LoginRole;
