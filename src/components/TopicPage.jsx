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
import { useTopicData, uselocalStore } from "../store/store";
import AddClassBox from "../elements/addClassbox";

const TopicPage = () => {
  const { topicID } = useParams();
  const { topicData, setTopicData } = useTopicData();

  useEffect(() => {
    setTopicData(topicID);
  }, []);
  const { addClassOpen, setAddClassOpen } = uselocalStore();

  return (
    <div className="relative">
      {addClassOpen && <AddClassBox />}
      <div className="h-screen w-screen flex py-[10vh] flex-col bg-HomeBG-main ">
        <div className="flex h-full">
          <div className="side bc h-[90vh] w-[40%] text-white ">
            {Object.keys(topicData).length ? <div>Hello</div> : ""}
          </div>
          <div className="content bc h-[90vh] w-[60%] overflow-auto"></div>
        </div>
      </div>
    </div>
  );
};

export default TopicPage;
