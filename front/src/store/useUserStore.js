import { toast } from "react-hot-toast";
import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

export const useUserStore = create((set) => ({
    user: null,
    loading: false,

    updateProfile: async (data) => {
        try {
            set({ loading: true });
            const res = await axiosInstance.put("/users/update", data);
            set({ user: res.data.user });
            toast.success(res.data.message);
        } catch (err) {
            console.log(err);
            toast.error(err.response.data.message || "Something went wrong");
        }
        finally {
            set({ loading: false });
        }
    }
}))