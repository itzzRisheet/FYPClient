import {
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { getClassDetails, getClasses } from "../helper/helper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faAngleUp,
  faComputer,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useUserData, uselocalStore } from "../store/store";

const SidebarList = () => {
  const [open, setOpen] = React.useState(true);
  const { decodedData, token } = useUserData();
  const { showSidebar } = uselocalStore();

  const handleClick = () => {
    setOpen(!open);
  };
  const navigate = useNavigate();
  let { role, roleID } = decodedData(token);
  const handleClassClick = async (classID) => {
    navigate(`/${role ? "students" : "teachers"}/classes/${classID}`);
  };

  const [classlist, setClassList] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const { data } = await getClasses(role, roleID);
      setClassList(data);
    };
    getData();
  }, []);

  return (
    <div
      className={`side border border-solid h-[90vh] transition-all duration-150 ${showSidebar ? "w-[25%]" : "w-0 overflow-hidden"}`}
    >
      <List
        sx={{ width: "100%", bgcolor: "transparent" }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        <ListItemButton onClick={handleClick}>
          <ListItemIcon>
            <FontAwesomeIcon icon={faComputer} className="text-slate-400" />
          </ListItemIcon>
          <ListItemText primary="Enrolls" className="text-slate-400" />
          {open ? (
            <FontAwesomeIcon icon={faAngleUp} className="text-slate-400" />
          ) : (
            <FontAwesomeIcon icon={faAngleDown} className="text-slate-400" />
          )}
        </ListItemButton>
        <Collapse in={open} timeout={"auto"} unmountOnExit>
          <List component="div" disablePadding className="text-slate-400">
            {classlist.map((cls) => {
              return (
                <ListItemButton
                  sx={{ pl: 2 }}
                  key={cls.classID}
                  onClick={(e) => {
                    e.preventDefault();
                    handleClassClick(cls.classID);
                  }}
                >
                  <ListItemText primary={cls.title} />
                </ListItemButton>
              );
            })}
          </List>
        </Collapse>
      </List>
    </div>
  );
};

export default SidebarList;
