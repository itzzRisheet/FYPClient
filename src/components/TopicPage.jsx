import {
  faBars,
  faHamburger,
  faSchool,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, List, fabClasses } from "@mui/material";
import React, { useEffect, useState } from "react";
import SidebarList from "../elements/sidebarList";
import { useParams } from "react-router-dom";
import { getTopicDetails } from "../helper/helper";

const TopicPage = () => {
  const { topicID } = useParams();
  const [topicData, setTopicData] = useState({});

  useEffect(() => {
    const getData = async () => {
      const { data } = await getTopicDetails(topicID);
      setTopicData(data);
    };
    getData();
  }, []);

  const printTokenList = () => {
    return <p>hello</p>;
  };

  return (
    <div className="h-screen w-screen flex py-[10vh] flex-col bg-HomeBG-main ">
      <div className="flex flex-col md:flex-row justify-between items-center p-4 border-solid border h-[10vh] ">
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
        <div className="side border border-solid h-[90vh] w-[40%] ">
          {Object.keys(topicData).length ? printTokenList() : ""}
        </div>
        <div className="content border border-solid h-[90vh] w-[60%] overflow-auto"></div>
      </div>
    </div>
  );
};

export default TopicPage;
