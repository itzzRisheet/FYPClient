import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { create } from "zustand";
import { getClassDetails, getClasses, getTopicDetails } from "../helper/helper";

export const uselocalStore = create((set) => ({
  userLoggingIn: true,
  setUserLogginIn: (val) => {
    set({ userLoggingIn: val });
  },
  role: 1,
  accountCard: false,
  showSidebar: false,
  showLoginPage: false,
  addClassOpen: false,
  setAddClassOpen: (val) => {
    set({ addClassOpen: val });
  },

  joinClassOpen: false,
  setJoinClassOpen: (val) => {
    set({ joinClassOpen: val });
  },
  loginStatus: localStorage.getItem("token") ? true : false,
  setShowSidebar: (val) => {
    set({ showSidebar: val });
  },
  toggleSidebar: () => {
    set((state) => ({
      showSidebar: !state.showSidebar,
    }));
  },
  setAccountCard: (val) => {
    set({ accountCard: val });
  },
  setLoginStatus: () => {
    set((state) => ({
      loginStatus: localStorage.getItem("token") ? true : false,
    }));
  },
  setRole: (role) => {
    set({ role: role });
  },
  setShowLoginPage: (val) => {
    set({ showLoginPage: val });
  },
  toggleShowLoginPage: () => {
    set((state) => ({
      showLoginPage: !state.showLoginPage,
    }));
  },
  EnteredClassCode: "",
  setEnteredClassCode: (val) => {
    set({ EnteredClassCode: val });
  },
}));

export const useUserData = create((set, get) => ({
  token: localStorage.getItem("token"),
  roleID: "",
  userID: "",
  email: "",
  userRole: 0,
  setToken: (token) => {
    localStorage.setItem("token", token);
    set({ token: localStorage.getItem("token") });
  },
  decodedData: (token) => {
    return jwtDecode(token);
  },
}));

export const useClassData = create((set, get) => ({
  classData: {},
  classlist: [],
  setClassList: async (role, roleID) => {
    const { data } = await getClasses(role, roleID);
    set({ classlist: data });
  },
  clearClassData: () => {
    set({ classData: {} });
  },
  setClassData: async (classID) => {
    const response = await getClassDetails(classID);
    console.log(response.data);
    set({ classData: response.data });
  },
  createClassData: {},
  setCreateClassData: (data) => {
    set({ createClassData: data });
  },
}));

export const useTopicData = create((set, get) => ({
  topicData: {},
  setTopicData: async (topicID) => {
    const { data } = await getTopicDetails(topicID);
    set({ topicData: data });
  },
}));
