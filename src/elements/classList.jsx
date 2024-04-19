import {
  faAngleDown,
  faAngleUp,
  faArrowRight,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { uselocalStore } from "../store/store";

const ClassList = ({ classData }) => {
  const [openSubject, setOpenSubject] = useState({});
  const { role, addTopicOpen, setAddTopicOpen, setAddTopicSubId } =
    uselocalStore();
  useEffect(() => {
    const updateSubjectList = () => {
      const newOpenSubject = {}; // Initialize a new object to hold the updated state
      classData.Subjects.forEach((sub) => {
        const k = sub._id;
        newOpenSubject[k.toString()] = false; // Add new key-value pair to the object
      });
      setOpenSubject(newOpenSubject); // Update the state with the new object
    };
    updateSubjectList();
  }, [classData]);
  const handleClick = (subjectID) => {
    setOpenSubject((prev) => {
      // Ensure that the subjectID exists in the state object
      const prevTopicOpen = prev[subjectID.toString()];
      return {
        ...prev,
        [subjectID.toString()]: !prevTopicOpen,
      };
    });
  };

  const navigate = useNavigate();
  if (Object.keys(classData.Subjects).length)
    return (
      <div>
        <List
          sx={{ width: "100%", bgcolor: "transparent" }}
          component="nav"
          aria-labelledby="nested-list-subheader"
          className="text-white"
        >
          {classData.Subjects.map((sub, i) => {
            return (
              <div key={i}>
                <ListItemButton
                  key={sub._id}
                  onClick={() => {
                    handleClick(sub._id);
                  }}
                >
                  <ListItemText primary={sub.title} className="" />
                  {openSubject[sub._id.toString()] ? (
                    <FontAwesomeIcon
                      icon={faAngleUp}
                      className="text-slate-400"
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faAngleDown}
                      className="text-slate-400"
                    />
                  )}
                </ListItemButton>
                <Collapse
                  in={openSubject[sub._id.toString()]}
                  timeout={100}
                  unmountOnExit
                >
                  <div className={`w-[100%] flex justify-end `}>
                    {!role && (
                      <span
                        className="bg-HomeBG-side px-2 py-1 text-xs rounded-2xl hover:bg-gray-500 cursor-pointer transition-all duration-150"
                        onClick={() => {
                          setAddTopicSubId(sub._id);
                          setAddTopicOpen(true);
                        }}
                      >
                        add Topic <FontAwesomeIcon icon={faPlus} />
                      </span>
                    )}
                  </div>
                  {sub.topics.map((top, i) => {
                    return (
                      <List component={"div"} key={i}>
                        <ListItemButton
                          sx={{ pl: 2 }}
                          key={top._id}
                          onClick={() => {
                            navigate(`/topics/${top._id}`);
                          }}
                        >
                          <ListItemText
                            primary={top.title}
                            className="pl-4 text-sm"
                          />
                        </ListItemButton>
                      </List>
                    );
                  })}
                </Collapse>
              </div>
            );
          })}
        </List>
      </div>
    );
  return (
    <div className="text-2xl text-white h-full w-full flex items-center justify-center">
      No Subjects found
    </div>
  );
};

export default ClassList;
