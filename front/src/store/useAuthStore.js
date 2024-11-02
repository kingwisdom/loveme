import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-hot-toast";
import { disconnectSocket, initializeSocket } from "../socket/socket.client";

export const useAuthStore = create((set) => ({
    user: null,
    loading: false,
    checkingAuth: true,

    setUser: (user) => set({ user }),
    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/me");
            set({ user: res.data.user });
            initializeSocket(res.data.user._id);
        } catch (err) {
            // console.log(err);
            set({ user: null });
            toast.error(err.response.data.message || "Something went wrong");
        }
        finally {
            set({ checkingAuth: false });
        }
    },

    logout: async () => {
        try {
            set({ loading: true });
            const res = await axiosInstance.post("/auth/logout");
            // console.log(res.data);
            set({ user: null });
            disconnectSocket()
            toast.success("Logged out successfully");
        } catch (err) {
            console.log(err);
            toast.error(err.response.data.message || "Something went wrong");
        }
        finally {
            set({ loading: false });
        }
    },
    register: async (data) => {
        try {
            set({ loading: true });
            const res = await axiosInstance.post("/auth/register", data);
            // console.log(res.data);
            initializeSocket(res.data.user._id);
            set({ user: res.data.user });
            toast.success(res.data.message);
        } catch (err) {
            console.log(err);
            toast.error(err.response.data.message || "Something went wrong");
        }
        finally {
            set({ loading: false });
        }
    },
    login: async (data) => {
        try {
            set({ loading: true });
            const res = await axiosInstance.post("/auth/login", data);
            // console.log(res.data);
            set({ user: res.data.user });
            initializeSocket(res.data.user._id);
            toast.success(res.data.message);
        } catch (err) {
            console.log(err);
            toast.error(err.response.data.message || "Something went wrong");
        }
        finally {
            set({ loading: false });
        }
    },
}));

export default useAuthStore