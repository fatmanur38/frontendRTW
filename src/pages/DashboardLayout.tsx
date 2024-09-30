import React from 'react';
import Navbar from '../components/Navbar';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1 p-6">
                {children}
            </main>
        </div>
    );
};

export default DashboardLayout;