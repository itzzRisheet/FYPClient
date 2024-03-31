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
import JoinClass from "../elements/JoinClass";

const ClassPage = () => {
  const { classID } = useParams();
  const { classData, setClassData } = useClassData();
  const { role } = uselocalStore();
  const { addClassOpen, setAddClassOpen, joinClassOpen, EnteredClassCode } =
    uselocalStore();

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
        className={`h-screen w-screen py-[10vh] flex flex-col  transition-all duration-300 ${addClassOpen ? "brightness-[30%]" : ""} bg-HomeBG-main `}
      >
        <div className="text-white">
          Entered Class Code : {EnteredClassCode}
        </div>
        <div className={`flex w-full`}>
          <SidebarList />
          <div
            className={`content absolute md:static w-[100vw] md:w-[100%] flex flex-col bg-HomeBG-content h-[90vh]  overflow-auto`}
          >
            {Object.keys(classData).length ? (
              <ClassList classData={classData} />
            ) : (
              <Loading />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassPage;
