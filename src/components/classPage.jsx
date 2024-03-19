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
import { getClassDetails } from "../helperRequests/helper";
import ClassList from "../elements/classList";
import Loading from "../elements/Loading";

const ClassPage = () => {
  const { classID } = useParams();

  const [classData, setClassData] = useState({});

  useEffect(() => {
    const getData = async () => {
      const response = await getClassDetails(classID);
      setClassData(response.data);
    };
    getData();
  }, [classID]);

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
