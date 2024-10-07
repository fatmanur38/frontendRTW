import { create } from 'zustand';
import axios from 'axios';

const useInterviewStore = create((set) => ({
    interviews: [],
    isLoading: false,
    error: null,

    // Fetch interviews from the API
    fetchInterviews: async () => {
        set({ isLoading: true });
        const apiURL = import.meta.env.VITE_API_URL; // Adjust to your API URL
        try {
            const response = await axios.get(`${apiURL}/api/interviews`);
            set({ interviews: response.data.data, isLoading: false });
        } catch (error) {
            set({ error: 'Failed to fetch interviews', isLoading: false });
        }
    },
}));

export default useInterviewStore;