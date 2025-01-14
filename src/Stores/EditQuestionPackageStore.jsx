import { create } from "zustand";
import axios from "axios";
const apiURL = import.meta.env.VITE_API_URL;
const EditQuestionPackageStore = create((set) => ({
    selectedPackage: null,
    isPopupOpen: false,
    newQuestion: { question: "", time: "" },
    isLoading: false,
    error: null,


    resetStore: () => set(() => ({
        selectedPackage: {
            _id: "", // Boş string
            title: "", // Boş string
            questionCount: 0, // 0 olarak sıfırlanacak
            questions: [], // Boş dizi
            __v: 0, // Sıfırlanabilir veya isteğe bağlı olarak tutulabilir
        },
        newQuestion: { question: "", time: "" },
        isPopupOpen: false,
        isLoading: false,
        error: null,
    })),


    fetchQuestionPackageById: async (id) => {
        set({ isLoading: true });
        try {
            const response = await axios.get(`${apiURL}/api/question-packages/${id}`, { withCredentials: true });
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
                    ...(state.selectedPackage?.questions || []), // Eğer questions null/undefined ise boş bir dizi kullan
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



    // Save or create a package (POST for new, PUT for existing)
    savePackage: async (id, packageData, navigate) => {
        set({ isLoading: true });
        try {
            if (id === "new" || !id) {
                // POST request to create a new package
                await axios.post(`${apiURL}/api/question-packages`, packageData, { withCredentials: true });
                navigate("/manage-question-packages");
            } else {
                // PUT request to update an existing package
                console.log("imdat")
                await axios.put(`${apiURL}/api/question-packages/${id}`, packageData, { withCredentials: true });
                navigate("/manage-question-packages");
            }
            set({ isLoading: false });
        } catch (error) {
            set({ error: "Failed to save question package", isLoading: false });
        }
    },
}));

export default EditQuestionPackageStore;