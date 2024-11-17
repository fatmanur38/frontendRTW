// useInterviewStore.js
import { create } from 'zustand';
import axios from 'axios';

const apiURL = import.meta.env.VITE_API_URL + "/api";

const useInterviewStore = create((set) => ({
    error: null,
    usersData: [], // Store to hold each user's name and video URL

    // Action to fetch interview by link
    getInterviewByLink: async (interviewLink) => {
        try {
            const resp = await axios.get(`${apiURL}/interviews/link/${interviewLink}`);
            const interview = resp.data.interview;
            console.log("Interview:", interview); // Log for debugging
            // Extract user's name and video URL
            const usersData = interview.users.map(user => ({
                name: user.name,
                surname: user.surname,
                videoUrl: user.videoUrl,
                userId: user._id,
            }));

            // Store the extracted users data in the Zustand state
            set({ usersData });
            console.log("Users Data:", usersData); // Log for debugging
            return usersData;
        } catch (error) {
            console.error('Error fetching interview by link:', error);
            set({ error: 'Failed to fetch interview by link' });
        }
    },
}));

export default useInterviewStore;