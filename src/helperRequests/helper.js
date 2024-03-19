import axios from "axios";

const data = {
  studentID: "65e986a7cb4591866d2b79f7",
  teacherID: "65ea9de8abb7191f4b2119ab",
  TUserID: "65ea9de8abb7191f4b2119ac",
  SUserID: "65e986a7cb4591866d2b79f8",
};

const baseURL = "http://localhost:8080";

export async function getClasses() {
  try {
    const res = await axios.get(
      baseURL + `/api/students/${data.studentID}/getclassNames`
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
