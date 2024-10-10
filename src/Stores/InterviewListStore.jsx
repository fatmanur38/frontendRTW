import { create } from 'zustand';
import axios from 'axios';
import Cookies from 'js-cookie';

const useInterviewStore = create((set) => ({
    interviews: [],
    isLoading: false,
    error: null,


    fetchInterviews: async () => {
        set({ isLoading: true });
        const sebo = Cookies.get('adminToken'); // Get the authToken from cookies
        console.log("token", sebo)
        const apiURL = import.meta.env.VITE_API_URL; // Adjust to your API URL

        try {
            const response = await axios.get(`${apiURL}/api/interviews`, {
                withCredentials: true, // Ensure cookies are included in the request if necessary
            });

            set({ interviews: response.data.data, isLoading: false });
        } catch (error) {
            set({ error: 'Failed to fetch interviews', isLoading: false });
        }
    },

    // Delete interview by ID
    deleteInterview: async (id) => {
        const apiURL = import.meta.env.VITE_API_URL; // Adjust to your API URL
        try {
            await axios.delete(`${apiURL}/api/interviews/${id}`, { withCredentials: true });
            set((state) => ({
                interviews: state.interviews.filter((interview) => interview._id !== id)
            }));
        } catch (error) {
            console.error("Failed to delete interview:", error);
            set({ error: 'Failed to delete interview' });
        }
    }
}));

export default useInterviewStore;