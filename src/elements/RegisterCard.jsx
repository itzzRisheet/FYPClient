import React from "react";
import FBicon from "../svgs/fbIcon.jsx";
import AppleIcon from "../svgs/appleIcon.jsx";
import GoogleIcon from "../svgs/GoogleIcon.jsx";
import Check from "../svgs/check.jsx";
import { useFormik } from "formik";
import RoleSwitch from "./roleSwitch.jsx";
import { localStore } from "../store/store.js";

const RegisterCard = () => {
  const { setShowLoginPage } = localStore();

  const formik = useFormik({
    initialValues: {
      fname: "",
      lname: "",
      email: "",
      role: "",
    },
  });

  return (
    <div className="w-[40%] min-w-[300px] rounded-2xl bg-transparent backdrop-blur-lg px-3 mx-auto mt-0 md:flex-0 shrink-0">
      <div className="relative text-white z-0 flex flex-col min-w-0 break-words  border-0 shadow-soft-xl rounded-2xl bg-clip-border">
        <div className="p-3 text-center  border-b-0 rounded-t-2xl">
          <h5>Register with</h5>
        </div>
        <div className="flex flex-wrap gap-2 justify-center sm:px-6 xl:px-12">
          <div className="flex-0">
            <a className="inline-block w-full p-2 font-bold text-center text-gray-200 uppercase align-middle transition-all bg-transparent  rounded-lg shadow-none cursor-pointer hover:scale-102 leading-pro text-xs ease-soft-in tracking-tight-soft bg-150 bg-x-25 hover:bg-transparent hover:opacity-75">
              <FBicon className={"transition duration-150 hover:scale-150"} />
            </a>
          </div>
          <div className=" flex-0">
            <a className="inline-block w-full p-2 font-bold text-center text-gray-200 uppercase align-middle transition-all bg-transparent  rounded-lg shadow-none cursor-pointer hover:scale-102 leading-pro text-xs ease-soft-in tracking-tight-soft bg-150 bg-x-25 hover:bg-transparent hover:opacity-75">
              <AppleIcon
                className={"transition duration-150 hover:scale-150"}
              />
            </a>
          </div>
          <div className=" flex-0">
            <a className="inline-block w-full p-2 font-bold text-center text-gray-200 uppercase align-middle transition-all bg-transparent  rounded-lg shadow-none cursor-pointer hover:scale-102 leading-pro text-xs ease-soft-in tracking-tight-soft bg-150 bg-x-25 hover:bg-transparent hover:opacity-75">
              <GoogleIcon
                className={"transition duration-150 hover:scale-150"}
              />
            </a>
          </div>
          <div className="flex items-center justify-center gap-2 relative w-full max-w-full px-3  text-center shrink-0">
            <hr className=" text-slate-500 w-[30%] opacity-20" />
            <p className="z-20 inline  font-semibold leading-normal  text-sm text-slate-400">
              or
            </p>
            <hr className=" text-slate-500 w-[30%] opacity-20" />
          </div>
        </div>
        <div className="flex-auto p-6">
          <form className="flex flex-col items-center gap-2">
            <div className="flex flex-col  items-center gap-2  w-full  mb-4">
              <RoleSwitch />
              <div className="flex justify-between w-[80%] gap-2">
                <div className="relative ">
                  <input
                    type="text"
                    className="input"
                    placeholder="Firstname"
                  />
                  <span className="input_border"></span>
                </div>
                <div className="relative">
                  <input type="text" className="input" placeholder="Lastname" />
                  <span className="input_border"></span>
                </div>
              </div>

              <div className="relative w-[80%]">
                <input
                  type="text"
                  className="input"
                  placeholder="Enter email"
                />
                <span className="input_border"></span>
              </div>
              <div className="relative w-[80%]">
                <input
                  type="password"
                  className="input"
                  placeholder="Password"
                />
                <span className="input_border"></span>
              </div>
            </div>
            <div className="mb-0.5 w-full flex  justify-center ">
              <Check />
            </div>

            <div className="text-center">
              <button
                className="inline-block bg-[#8C6A5D] px-6 py-3 mt-6 mb-2 font-bold text-center text-white uppercase align-middle transition-all bg-transparent border-0 rounded-lg cursor-pointer active:opacity-85 hover:scale-110 hover:shadow-soft-xs leading-pro text-xs ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25 bg-gradient-to-tl from-gray-900 to-slate-800 hover:border-slate-700 hover:bg-slate-700 hover:text-white"
                type="button"
              >
                Sign up
              </button>
            </div>
            <p className="mt-4 mb-0 leading-normal text-sm">
              Already have an account?{" "}
              <span
                className="font-bold text-blue-500 hover:cursor-pointer hover:text-blue-300"
                onClick={(e) => {
                  e.preventDefault();
                  setShowLoginPage();
                }}
              >
                Sign in
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterCard;
