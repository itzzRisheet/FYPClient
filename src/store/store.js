import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { create } from "zustand";
import { getClassDetails } from "../helper/helper";

export const uselocalStore = create((set) => ({
  role: 0,
  accountCard: false,
  showSidebar: false,
  showLoginPage: false,
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

  setRoleID: (id) => {
    set({ roleID: id });
  },
  setUserID: (id) => {
    set({ userID: id });
  },
  setEmail: (email) => {
    set({ email: email });
  },
  setUserRole: (role) => {
    set({ userRole: role });
  },
  setDecodedData: () => {
    const token = get().token;
    // console.log(token);
    const decoded = jwtDecode(token);
    const { roleID, userID, email, role } = decoded;
    console.log("role in store : " + role);
    console.log(decoded);
    get().setRoleID(roleID);
    get().setUserID(userID);
    get().setEmail(email);
    get().setUserRole(role);
  },

  decodedData: (token) => {
    return jwtDecode(token);
  },
}));

export const useClassData = create((set, get) => ({
  classData: {},
  setClassData: async (classID) => {
    const response = await getClassDetails(classID);
    console.log(response.data);
    set({ classData: response.data });
  },
  setSubjects : async (classID) => {

  }
}));
