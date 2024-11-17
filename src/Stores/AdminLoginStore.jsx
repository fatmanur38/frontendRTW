import { create } from 'zustand';
import axios from 'axios';
import Cookies from 'js-cookie'; // Import js-cookie



const useAdminLoginStore = create((set) => ({
    email: '',
    password: '',
    error: '',
    isLoading: false, // Add a loading state for better UX

    login: async ({ email, password, navigate }) => { // Accept email, password, and navigate
        const apiURL = import.meta.env.VITE_API_URL; // Adjust to your API URL

        set({ isLoading: true, error: '' }); // Set loading state and clear previous errors

        try {
            console.log('Attempting login with email:', email);

            const response = await axios.post(`${apiURL}/api/auth/login`, {
                email,
                password,
            },
            {
                withCredentials: true, // Enable sending cookies with the request
            }
        );

            console.log("Login response:", response);

            // Store token in cookies
           // Cookies.set('authToken', response.data.token, { expires: 1 }); // Expires in 1 day
            
            // Add a slight delay to ensure the cookie is set
            setTimeout(() => {
                // Clear form state
                set({ email: '', password: '', error: '', isLoading: false });

                // Navigate to the next page
                navigate('/manage-question-packages');
            }, 100); // Adjust timeout if needed

        } catch (error) {
            console.error('Login failed:', error.message);
            set({
                error: 'Invalid email or password',
                isLoading: false, // Stop loading on error
            });
        }
    },
}));

export default useAdminLoginStore;