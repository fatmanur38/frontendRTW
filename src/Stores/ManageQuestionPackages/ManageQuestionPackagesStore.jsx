import { create } from "zustand";
import axios from "axios";

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
            const response = await axios.get(`${apiURL}/api/question-packages`);
            set({ questionPackages: response.data.data, isLoading: false });
        } catch (error) {
            set({ error: "Failed to fetch question packages", isLoading: false });
        }
    },

    // Fetch a single question package by ID
    fetchQuestionPackageById: async (id) => {
        set({ isLoading: true });
        const apiURL = import.meta.env.VITE_API_URL;
        try {
            const response = await axios.get(`${apiURL}/api/question-packages/${id}`);

            set({ selectedPackage: response.data.data, isLoading: false });
        } catch (error) {
            set({ error: "Failed to fetch question package", isLoading: false });
        }
    },

    // Delete a question package by ID
    deleteQuestionPackage: async (id) => {
        set({ isLoading: true });
        const apiURL = import.meta.env.VITE_API_URL;
        try {
            await axios.delete(`${apiURL}/api/question-packages/${id}`);
            set({ isLoading: false });
            await useQuestionPackageStore.getState().fetchQuestionPackages();
        } catch (error) {
            set({ error: "Failed to delete question package", isLoading: false });
        }
    },
}));

export default useQuestionPackageStore;