import axios from "axios";
import { useUserData } from "../store/store";



const baseURL = "http://localhost:8080";

export async function getClasses(role , roleID) {
  try {
    console.log("role : " + role)
    console.log("roleID : " + roleID)
    const res = await axios.get(
      baseURL + `/api/${role ? "students" : "teachers"}/${roleID}/getclassNames`
    );
    return res.data;
  } catch (err) {
    throw err; // Re-throw the error so it can be caught by the caller
  }
}

export async function getClassDetails(classID) {
  try {
    const { data } = await axios.get(
      baseURL + `/api/classes/getclass/${classID}`
    );

    if (data) return data;
    // throw new Error("No data received");
  } catch (error) {
    throw error; // Re-throw the error so it can be caught by the
  }
}

export async function getTopicDetails(topicID) {
  try {
    const res = await axios.get(baseURL + `/api/topics/${topicID}`);
    return res.data;
  } catch (error) {
    throw error;
  }
}
