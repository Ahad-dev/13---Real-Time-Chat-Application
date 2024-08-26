import { create } from "zustand";
import axios from "axios";

const API_URL = "chatty-backend-ruddy.vercel.app";
axios.defaults.withCredentials = true;

export const useAuthStore = create((set) => ({
  user: null,
  message: null,
  error: null,
  isLoading: false,
  isCheckingAuth: true,
  isAuthenticated: false,

  signup: async ({ fullname, password, confirmPassword, gender, username }) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axios.post(`${API_URL}/api/auth/signup`, {
        fullname,
        password,
        confirmPassword,
        username,
        gender,
      });
      set({ user: res.data.user, isLoading: false, isAuthenticated: true });
    } catch (error) {
      set({ error: error.response.data.message, isLoading: false });
      throw error;
    }
  },

  login: async ({ username, password }) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axios.post(`${API_URL}/api/auth/login`, { username, password });
      set({ user: res.data.user, isLoading: false, isAuthenticated: true });
    } catch (error) {
      set({ error: error.response.data.message, isLoading: false, });
      throw error;
    }
  },

  logout: async () => {
    set({ isLoading: true, error: null });
    try {
      await axios.post(`${API_URL}/api/auth/logout`);
      set({ user: null, isLoading: false });
    } catch (error) {
      set({ error: error.response.data.message, isLoading: false });
      throw error;
    }
  },

  checkAuth: async () => {
    set({ isCheckingAuth: true });
    try {
      const res = await axios.get(`${API_URL}/api/auth/checkAuth`);
      set({user:res.data.user,isCheckingAuth: false, isAuthenticated: true });
    } catch (error) {
      set({ isCheckingAuth: false, isAuthenticated: false });
    }
  },

}));
