import {
  faAngleDown,
  faAngleUp,
  faArrowRight,
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

const ClassList = ({ classData }) => {
  const [openSubject, setOpenSubject] = useState({
    wrewl234242j: true,
  });
  useEffect(() => {
    const updateSubjectList = () => {
      const newOpenSubject = {}; // Initialize a new object to hold the updated state
      classData.Subjects.forEach((sub) => {
        const k = sub._id;
        newOpenSubject[k.toString()] = false; // Add new key-value pair to the object
      });
      console.log(classData);
      setOpenSubject(newOpenSubject); // Update the state with the new object
    };
    updateSubjectList();
  }, [classData]);
  const handleClick = (subjectID) => {
    setOpenSubject((prev) => {
      // Ensure that the subjectID exists in the state object
      console.log(subjectID);
      const item = prev[subjectID.toString()] || false;
      return {
        ...prev,
        [subjectID.toString()]: !item,
      };
    });
  };

  const navigate = useNavigate();
  return (
    <div>
      <List
        sx={{ width: "100%", bgcolor: "transparent" }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        className="text-white"
      >
        {classData.Subjects.map((sub) => {
          return (
            <div>
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
              {sub.topics.map((top) => {
                return (
                  <Collapse
                    in={openSubject[sub._id.toString()]}
                    timeout={700}
                    unmountOnExit
                  >
                    <List component={"div"}>
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
                  </Collapse>
                );
              })}
            </div>
          );
        })}
      </List>
    </div>
  );
};

export default ClassList;
