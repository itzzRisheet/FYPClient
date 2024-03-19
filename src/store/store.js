import { create } from "zustand";

export const localStore = create((set) => ({
  role: 1,
  showLoginPage: false,
  loginStatus: localStorage.getItem("token") ? true : false,
  setLoginStatus: () => {
    set({ loginStatus: localStorage.getItem("token") ? true : false });
  },
  setRole: (role) => {
    set({ role: role });
  },
  setShowLoginPage: () => {
    set((state) => ({
      showLoginPage: !state.showLoginPage,
    }));
  },
}));
