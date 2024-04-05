import {
  faBars,
  faHamburger,
  faPlus,
  faSchool,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import SidebarList from "../elements/sidebarList";
import { useParams } from "react-router-dom";
import { getClassDetails } from "../helper/helper";
import ClassList from "../elements/classList";
import Loading from "../elements/Loading";
import { useClassData, useUserData, uselocalStore } from "../store/store";
import { useFormik } from "formik";
import AddClassBox from "../elements/addClassbox";
import People from "../elements/People";

const ClassPage = () => {
  const { classID } = useParams();
  const { classData, setClassData } = useClassData();
  const { role } = uselocalStore();
  const { addClassOpen, setAddClassOpen, joinClassOpen, EnteredClassCode } =
    uselocalStore();
  const [subPage, setSubPage] = useState(true);

  useEffect(() => {
    console.log(EnteredClassCode);
  }, [EnteredClassCode]);

  useEffect(() => {
    setClassData(classID);
  }, [classID]);
  return (
    <div className="relative">
      {addClassOpen && <AddClassBox />}
      <div
        className={`h-screen w-screen py-[10vh] flex flex-col  transition-all duration-300 ${addClassOpen ? "brightness-[20%]" : ""} bg-HomeBG-main `}
      >
        <div className={`flex w-full gap-[2rem]`}>
          <SidebarList />
          <div
            className={`content absolute md:static rounded-2xl w-[100vw] md:w-[100%] flex flex-col bg-HomeBG-content h-[90vh]  overflow-auto`}
          >
            <div className="title h-[5%] p-4  flex gap-4 items-center  justify-start   text-white ">
              <span
                className={`px-4 ${subPage ? "bg-gray-500" : ""} rounded-2xl cursor-pointer`}
                onClick={() => {
                  setSubPage(true);
                }}
              >
                Classes
              </span>
              <span
                className={`px-4 ${subPage ? "" : "bg-gray-500"} rounded-2xl cursor-pointer`}
                onClick={() => {
                  setSubPage(false);
                }}
              >
                People
              </span>
            </div>
            {subPage ? (
              Object.keys(classData).length ? (
                <ClassList classData={classData} />
              ) : (
                <Loading />
              )
            ) : (
              <People />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassPage;
