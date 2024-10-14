import { create } from 'zustand';  // Fixing the named import
import axios from 'axios';

const useMeetingStore = create((set) => ({
    meetingData: null,
    loading: false,
    error: null,

    // Action to create a meeting
    createMeeting: async () => {
        const apiKey = import.meta.env.VITE_API_KEY;  // Ensure VITE_API_KEY is defined in .env
        const url = 'https://api.whereby.dev/v1/meetings';

        const meetingData = {
            isLocked: false,  // Customize meeting options
            roomName: 'Sebonun Odası',  // Optional, or let Whereby auto-generate
            roomMode: 'normal',  // 'normal' for 1:1 or small meetings, 'group' for larger
            startDate: new Date().toISOString(),
            endDate: new Date(Date.now() + 60 * 60 * 1000).toISOString(), // 1 hour meeting
        };

        set({ loading: true, error: null });

        try {
            const response = await axios.post(url, meetingData, {
                withCredentials: true,
            });

            set({ meetingData: response.data, loading: false });
            console.log("Meeting Data:", response.data);  // Log the API response
        } catch (error) {
            set({ error: error.message, loading: false });
        }
    },
}));

export default useMeetingStore;