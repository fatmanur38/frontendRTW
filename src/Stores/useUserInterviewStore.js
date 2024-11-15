import { create } from 'zustand';
import axios from 'axios';
const apiURL = import.meta.env.VITE_API_URL + "/api";

const useUserStore = create((set) => ({
    status: false,
    note: '',
    saveStatus: null, // null, 'success', or 'error'
    setStatus: (value) => set({ status: value }),
    setNote: (value) => set({ note: value }),
    setSaveStatus: (status) => set({ saveStatus: status }), // Sets save status
    saveData: async (userId) => {
        try {
            const statusText = useUserStore.getState().status ? 'active' : 'inactive';
            const note = useUserStore.getState().note;
            const response = await axios.put(`${apiURL}/users/${userId}`, {
                status: statusText,
                note: note
            });
            console.log(response)
            set({ saveStatus: 'success' }); // Set save status to success
        } catch (error) {
            set({ saveStatus: 'error' }); // Set save status to error if request fails
            console.error('Error saving data:', error);
        }
    },
}));

export default useUserStore;