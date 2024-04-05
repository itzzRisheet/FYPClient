import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { acceptRequest, cancelRequest, getPeople } from "../helper/helper";
import { Avatar } from "@mui/material";
import RequestAvatar from "./requestAvatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleRight,
  faCancel,
  faCheck,
  faClose,
  faCross,
} from "@fortawesome/free-solid-svg-icons";

const People = () => {
  const { classID } = useParams();
  const [people, setPeople] = useState([]);
  const [requests, setRequests] = useState([]);
  const [showRequests, setShowRequests] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { people, requests } = await getPeople(classID);
        setPeople(people);
        setRequests(requests);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [classID]);

  const peopleLen = useMemo(() => {
    return people.length;
  }, [people]);
  const reqLen = useMemo(() => {
    return requests.length;
  }, [requests]);

  useEffect(() => {
    console.log(requests);
  }, [requests]);

  return (
    <div className="flex h-full w-full px-4  text-white">
      {!peopleLen ? (
        <div className="flex flex-col justify-center h-full w-full text-4xl items-center text-white">
          "No one's here yet"
        </div>
      ) : (
        <ul>
          {people.map((person) => {
            return <li key={person.ID}>{person.name}</li>;
          })}
        </ul>
      )}
      <div
        className={`absolute z-50 right-10 requests  transition-all  duration-200 flex  justify-center h-full  ${showRequests ? "w-[20vw] items-center rounded-2xl " : "  w-[4rem] h-[4rem] rounded-full"}   `}
        onMouseEnter={() => {
          setShowRequests(true);
        }}
        onMouseLeave={() => {
          setShowRequests(false);
        }}
      >
        {!showRequests && <RequestAvatar msgCount={requests.length} />}
        {showRequests && (
          <ul className="p-4  w-full h-full">
            {!reqLen ? (
              <li>"0 requests found"</li>
            ) : (
              requests.map((req) => {
                return (
                  <li className="flex bc p-2 justify-between  items-center rounded-xl bg-HomeBG-side">
                    {req.studentData["name"]}{" "}
                    <span className="flex items-center gap-2">
                      <FontAwesomeIcon
                        icon={faCheck}
                        className="hover:scale-105 bg-green-400 p-1 rounded-md cursor-pointer transition-all duration-150"
                        onClick={() => {
                          acceptRequest(req._id);
                        }}
                      />
                      <FontAwesomeIcon
                        icon={faClose}
                        className="hover:scale-105 bg-red-400 p-1 rounded-md cursor-pointer transition-all duration-150"
                        onClick={() => {
                          cancelRequest(req._id);
                        }}
                      />
                    </span>
                  </li>
                );
              })
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default People;
