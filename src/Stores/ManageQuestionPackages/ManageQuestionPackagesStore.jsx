import { create } from "zustand";
import axios from "axios";
import Cookies from "js-cookie"; // Import js-cookie

const useQuestionPackageStore = create((set) => ({
    questionPackages: [],
    selectedPackage: null,
    isLoading: false,
    error: null,

    // Fetch all question packages
    fetchQuestionPackages: async () => {
        set({ isLoading: true });
        const apiURL = import.meta.env.VITE_API_URL;
  
        try {
            const response = await axios.get(`${apiURL}/api/question-packages`, {
                withCredentials: true,
            });
            set({ questionPackages: response.data.data, isLoading: false });
            console.log("Question Packages:", response.data.data);
        } catch (error) {
            set({ error: "Failed to fetch question packages", isLoading: false });
            console.error("Error fetching packages:", error.response || error.message);
        }
    },

    // Fetch a single question package by ID
    fetchQuestionPackageById: async (id) => {
        set({ isLoading: true });
        const apiURL = import.meta.env.VITE_API_URL;
        const token = Cookies.get('adminToken'); // Use the correct token name
        try {
            const response = await axios.get(`${apiURL}/api/question-packages/${id}`, {
                withCredentials: true, 

            });
            set({ selectedPackage: response.data.data, isLoading: false });
        } catch (error) {
            set({ error: "Failed to fetch question package", isLoading: false });
            console.error("Error fetching package:", error.response || error.message);
        }
    },

    // Delete a question package by ID
    deleteQuestionPackage: async (id) => {
        set({ isLoading: true });
        const apiURL = import.meta.env.VITE_API_URL;
        const token = Cookies.get('adminToken'); // Use the correct token name
        try {
            await axios.delete(`${apiURL}/api/question-packages/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}` // Always prefix with 'Bearer'
                }
            });
            set({ isLoading: false });
            await useQuestionPackageStore.getState().fetchQuestionPackages(); // Refresh the list after deletion
        } catch (error) {
            set({ error: "Failed to delete question package", isLoading: false });
            console.error("Error deleting package:", error.response || error.message);
        }
    },
}));

export default useQuestionPackageStore;