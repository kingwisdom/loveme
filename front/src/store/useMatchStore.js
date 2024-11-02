import { create } from "zustand"
import { axiosInstance } from "../lib/axios"
import toast from "react-hot-toast"
import { getSocket } from "../socket/socket.client"



export const useMatchStore = create((set) => ({
    isMatchLoading: false,
    isProfileLoading: false,
    matches: [],
    userProfiles: [],
    swipeFeedback: '',
    getMyMatches: async () => {
        try {
            set({ isMatchLoading: true })
            const res = await axiosInstance.get('/match')
            // console.log(res.data)
            set({ matches: res.data.matches })
        } catch (err) {
            console.log(err)
            set({ matches: [] })
            toast.error(err.response.data.message || "Something went wrong")
        } finally {
            set({ isMatchLoading: false })
        }
    },

    getUserProfiles: async () => {
        try {
            set({ isProfileLoading: true })
            const res = await axiosInstance.get('/match/user-profiles')
            set({ userProfiles: res.data.users })
        } catch (err) {
            console.log(err)
            set({ userProfiles: [] })
            toast.error(err.response.data.message || "Something went wrong")
        }
        finally {
            set({ isProfileLoading: false })
        }
    },
    swipeRight: async (data) => {
        try {
            set({ swipeFeedback: 'liked' })
            await axiosInstance.post('/match/swipe-right/' + data?._id);
            toast.success("Liked")
        } catch (error) {
            console.log(error)
            toast.error("Failing to swipe")
        }
        finally {
            setTimeout(() => {
                set({ swipeFeedback: null })
            }, 1500);
        }
    },
    swipeLeft: async (data) => {
        try {
            set({ swipeFeedback: 'passed' })
            await axiosInstance.post('/match/swipe-left/' + data?._id);
            toast.error("Passed")
        } catch (error) {
            console.log(error)
            toast.error("Failing to swipe")
        }
        finally {
            setTimeout(() => {
                set({ swipeFeedback: null })
            }, 1500);
        }
    },
    subscribeToNewMatches: () => {
        try {
            const socket = getSocket();

            socket.on("newMatch", (newMatch) => {
                set((state) => ({
                    matches: [...state.matches, newMatch],
                }));
                toast.success("You got a new match!");
            });
        } catch (error) {
            console.log(error);
        }
    },

    unsubscribeFromNewMatches: () => {
        try {
            const socket = getSocket();
            socket.off("newMatch");
        } catch (error) {
            console.error(error);
        }
    },
}))