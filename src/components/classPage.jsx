import {
  faBars,
  faHamburger,
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

const ClassPage = () => {
  const { classID } = useParams();
  const { classData, setClassData } = useClassData();

  useEffect(() => {
    const setclassdata = async () => {
      setClassData(classID);
    };
    setclassdata();
  }, [classID]);

  return (
    <div className="h-screen w-screen py-[10vh] flex flex-col bg-HomeBG-main ">
      <div className="flex h-full">
        <SidebarList />
        <div className="content border border-solid h-[90vh] w-[75%] overflow-auto">
          {Object.keys(classData).length ? (
            <ClassList classData={classData} />
          ) : (
            <Loading />
          )}
        </div>
      </div>
    </div>
  );
};

export default ClassPage;
