import { create } from "zustand";
import axios from "axios";
// 
const useQuestionStore = create((set) => ({
    questions: [],
    isPopupOpen: false,
    questionText: "",
    categoryName: "",
    timeLimit: 0,


    openPopup: () => set({ isPopupOpen: true }),


    closePopup: () => set({ isPopupOpen: false }),


    setQuestionText: (text) => set({ questionText: text }),


    setCategoryName: (name) => set({ categoryName: name }),


    setTimeLimit: (timeInSeconds) => set({ timeLimit: parseInt(timeInSeconds) }),


    addQuestion: (newQuestion) =>
        set((state) => ({
            questions: [...state.questions, newQuestion], // Add the new question to the list
        })),


    submitQuestion: async () => {
        const { questionText, categoryName, timeLimit, addQuestion } =
            useQuestionStore.getState();
        const dataToSave = {
            question: questionText,
            categoryName: categoryName,
            timeLimit: timeLimit,
        };
        const apiURL = import.meta.env.VITE_API_URL;
        try {
            const response = await axios.post(
                apiURL + "/api/question-packages",
                dataToSave,
                {
                    withCredentials: true,
                }
            );
            console.log("Response from server:", response.data._id);

            // Add the new question to the questions array
            addQuestion(dataToSave);

            // Close the modal after submission
            set({ isPopupOpen: false });
        } catch (error) {
            console.error("Error submitting question:", error);
        }
    },

    fetchQuestions: async () => {
        const apiURL = import.meta.env.VITE_API_URL;
        try {
            const response = await axios.get(apiURL + "/api/question-packages", { withCredentials: true });
            console.log("Fetched questions:", response.data);

            set({ questions: response.data });
        } catch (error) {
            console.error("Error fetching questions:", error);
        }
    },

    // Fetch a single question package by ID
    fetchQuestionPackageById: async (id) => {
        try {
            const response = await axios.get(`${apiURL}/api/question-packages/${id}`);
            console.log("Fetched question package:", response.data);

            // Here, you can store the specific package data into Zustand for use in the manage page
            set({
                questionText: response.data.title,
                categoryName: response.data.categoryName,
                timeLimit: response.data.timeLimit,
                questions: response.data.questions, // Assuming this array contains the questions in the package
            });
        } catch (error) {
            console.error("Error fetching question package by ID:", error);
        }
    },
}));

export default useQuestionStore;