import axios from "axios";
import { useUserData } from "../store/store";

const baseURL = "http://localhost:8080";
// const baseURL = "https://a6f2-103-251-227-203.ngrok-free.app";

export async function getClasses(role, roleID) {
  try {
    const url = `${baseURL}/api/${role ? "students" : "teachers"}/${roleID}/getclassNames`;
    console.log(url);
    const res = await axios.get(url);
    return res.data;
  } catch (err) {
    throw err; // Re-throw the error so it can be caught by the caller
  }
}

export async function getClassDetails(classID) {
  try {
    const { data } = await axios.get(
      `${baseURL}/api/classes/getclass/${classID}`
    );

    if (data) return data;
    // throw new Error("No data received");
  } catch (error) {
    throw error;
  }
}

export async function getTopicDetails(topicID) {
  try {
    const res = await axios.get(`${baseURL}/api/topics/${topicID}`);
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function joinClass(studentID , classID){
  try {
    const res = await axios.post(`${baseURL}/api/joinclass`, {studentID , classID})
    console.log(res.data);    
  } catch (error) {
    throw error
    
  }
}
