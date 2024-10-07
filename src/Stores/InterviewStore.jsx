import { create } from 'zustand';
import axios from 'axios';

const useInterviewStore = create((set) => ({
    questionPackages: [],
    isLoading: false,
    error: null,

    // Fetch available packages for the form
    fetchQuestionPackages: async () => {
        set({ isLoading: true });
        const apiURL = import.meta.env.VITE_API_URL; // Adjust to your API URL
        try {
            const response = await axios.get(`${apiURL}/api/question-packages`);
            set({ questionPackages: response.data.data, isLoading: false });
        } catch (error) {
            set({ error: 'Failed to fetch question packages', isLoading: false });
        }
    },

    // Submit the new interview
    submitInterview: async (interviewData) => {
        const apiURL = import.meta.env.VITE_API_URL; // Adjust to your API URL
        try {
            console.log("interviewData", interviewData)
            await axios.post(`${apiURL}/api/interviews`, interviewData);
            alert('Interview created successfully!');
        } catch (error) {
            alert('Failed to create interview');
        }
    }
}));

export default useInterviewStore;