import axios from "axios";
import { useUserData } from "../store/store";

const baseURL = "http://localhost:8080";
// const baseURL = "https://a6f2-103-251-227-203.ngrok-free.app";

export async function getClasses(role, roleID) {
  try {
    const url = `${baseURL}/api/${role ? "students" : "teachers"}/${roleID}/getclassNames`;
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

export async function joinClass(studentID, code) {
  try {
    const res = await axios.post(
      `${baseURL}/api/students/${studentID}/joinClass/`,
      {
        code,
      }
    );
    console.log(res.data);
  } catch (error) {
    throw error;
  }
}

export async function addLectures(lectures, topicID) {
  try {
    const response = await axios.post(
      `${baseURL}/api/topics/${topicID}/addlectures`,
      { lectures }
    );

    return { data: response.data, status: response.status };
  } catch (error) {
    throw error;
  }
}

export async function addTopics(subjectID, topics) {
  try {
    const response = await axios.post(
      `${baseURL}/api/subjects/${subjectID}/addTopics`,
      { topics }
    );

    return { data: response.data, status: response.status };
  } catch (error) {
    throw error;
  }
}

export async function getUsers(ids) {}

export async function addClassCode(classID, code) {
  try {
    const res = await axios.post(`${baseURL}/api/classes/${classID}/addCode`, {
      code,
    });
    console.log(res.data);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getPeople(classID) {
  try {
    const response = await axios.get(
      `${baseURL}/api/classes/${classID}/people`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function cancelRequest(reqID, classID, studentID) {
  try {
    const response = await axios.post(`${baseURL}/api/cancelRequest`, {
      reqID,
      classID,
      studentID,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function acceptRequest(reqID, classID, studentID) {
  try {
    const response = await axios.post(`${baseURL}/api/acceptRequest`, {
      reqID,
      classID,
      studentID,
    });
    return response;
  } catch (error) {
    throw error;
  }
}
