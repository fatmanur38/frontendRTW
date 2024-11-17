// components/AdminLayout.js
import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminLayout = () => {
    const apiURL = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            // Send request to logout endpoint
            await axios.post(`${apiURL}/api/auth/logout`, {}, { withCredentials: true });

            // Clear any remaining cookies on the client side (e.g., js-cookie or document.cookie if necessary)
            document.cookie = "token=; Max-Age=-99999999; path=/;";

            // Redirect to the sign-in page
            navigate('/signin');
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <div className="w-64 bg-gray-800 text-white flex flex-col">
                <div className="p-4 text-xl font-bold">Admin Panel</div>
                <ul className="p-2 space-y-4">
                    <li>
                        <a
                            href="/manage-question-packages"
                            className="block text-left transition duration-300 ease-in-out pl-2 transform hover:scale-105 hover:text-yellow-300"
                        >
                            Manage Question Package
                        </a>
                    </li>
                    <li>
                        <a
                            href="/interview-list"
                            className="block text-left transition duration-300 ease-in-out pl-2 transform hover:scale-105 hover:text-yellow-300"
                        >
                            Interview List
                        </a>
                    </li>
                </ul>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6">
                {/* Header */}
                <div className="flex justify-between items-center mb-4 border-b-2 border-gray-300 pb-4">
                    <h1 className="text-xl font-semibold">Remote-Tech Admin Page</h1>
                    <button
                        onClick={handleLogout}
                        className="bg-amber-300 hover:bg-amber-500 text-white px-4 py-2 rounded-md"
                    >
                        Log Out
                    </button>
                </div>

                {/* Outlet will render the nested routes */}
                <Outlet />
            </div>
        </div>
    );
};

export default AdminLayout;