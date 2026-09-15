import { create } from "zustand";
import { login as loginRequest, register as registerRequest } from "../services/authService";

const STORAGE_KEY = "curacare_user";

const getStoredUser = () => {
  if (typeof window === "undefined") return null;
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY));
  } catch {
    return null;
  }
};

const useAuthStore = create((set) => ({
  user: getStoredUser(),
  status: "idle", // idle | loading | error
  error: null,

  login: async (email, password) => {
    set({ status: "loading", error: null });
    try {
      const user = await loginRequest(email, password);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      set({ user, status: "idle" });
      return user;
    } catch (err) {
      set({ status: "error", error: err.message || "Login failed" });
      throw err;
    }
  },

  register: async ({ name, email, password }) => {
    set({ status: "loading", error: null });
    try {
      const user = await registerRequest({ name, email, password });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      set({ user, status: "idle" });
      return user;
    } catch (err) {
      set({ status: "error", error: err.message || "Registration failed" });
      throw err;
    }
  },

  logout: () => {
    localStorage.removeItem(STORAGE_KEY);
    set({ user: null });
  },
}));

export default useAuthStore;
