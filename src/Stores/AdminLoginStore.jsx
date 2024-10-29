import { create } from 'zustand';
import axios from 'axios';
import Cookies from 'js-cookie'; // Import js-cookie

const useAdminLoginStore = create((set) => ({
    email: '',
    password: '',
    error: '',

    login: async ({ email, password }) => {  // Accept email and password as arguments
        const apiURL = import.meta.env.VITE_API_URL; // Adjust to your API URL
        try {
            console.log('email:', email);
            console.log('password:', password);
            const response = await axios.post(`${apiURL}/api/auth/login`, {
                email: email,  // Use the email from the form
                password: password, // Use the password from the form
            });

            console.log("response:", response);
            Cookies.set('authToken', response.data.token, { expires: 1 }); // Expires in 7 days

            set({ email: '', password: '', error: '' }); // Clear the store state after login
        } catch (error) {
            set({ error: 'Invalid email or password' });
        }
    }
}));

export default useAdminLoginStore;