import { create } from "zustand";
import axios from "axios";

const EditQuestionPackageStore = create((set) => ({
    selectedPackage: null,
    isPopupOpen: false,
    newQuestion: { question: "", time: "" },
    isLoading: false,
    error: null,

    fetchQuestionPackageById: async (id) => {
        set({ isLoading: true });
        try {
            const response = await axios.get(`http://localhost:4000/api/question-packages/${id}`);
            set({ selectedPackage: response.data.data, isLoading: false });
        } catch (error) {
            set({ error: "Failed to fetch question package", isLoading: false });
        }
    },

    // Open the pop-up
    openPopup: () => set({ isPopupOpen: true }),

    // Close the pop-up
    closePopup: () => set({ isPopupOpen: false }),

    // Set new question data
    setNewQuestion: (field, value) =>
        set((state) => ({
            newQuestion: { ...state.newQuestion, [field]: value },
        })),

    // Add new question to the selected package (ensure time is an integer)
    addQuestion: () => {
        set((state) => ({
            selectedPackage: {
                ...state.selectedPackage,
                questions: [
                    ...state.selectedPackage.questions,
                    {
                        question: state.newQuestion.question,
                        time: parseInt(state.newQuestion.time, 10), // Convert time to integer
                    },
                ],
            },
            newQuestion: { question: "", time: "" }, // Reset form data
            isPopupOpen: false,
        }));
    },

    // Save updated package (PUT request)
    savePackage: async (id, updatedPackage) => {
        set({ isLoading: true });
        try {
            await axios.put(`http://localhost:4000/api/question-packages/${id}`, updatedPackage);
            set({ isLoading: false });
        } catch (error) {
            set({ error: "Failed to update question package", isLoading: false });
        }
        console.log("OLDU AQ")
        
    },
}));

export default EditQuestionPackageStore;