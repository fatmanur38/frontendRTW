import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import ProgressBar from '../components/ProgressBar';
import FormStage from '../components/FormStage';
import VideoStage from './VideoStage';
import ConfirmationStage from '../components/ConfirmationStage';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const [currentStage, setCurrentStage] = useState(1);

    const goToNextStage = () => {
        setCurrentStage((prevStage) => prevStage + 1);
    };

    const goToPreviousStage = () => {
        setCurrentStage((prevStage) => (prevStage > 1 ? prevStage - 1 : prevStage));
    };

    // Log current stage when it updates
    useEffect(() => {
        console.log("currentStage: ", currentStage);
    }, [currentStage]);

    return (
        <div className="min-h-screen bg-gray-100">
            <Header />
            <ProgressBar currentStep={currentStage} />

            <div className="max-w-4xl mx-auto p-4 transition-all duration-700 ease-in-out transform">
                {currentStage === 1 && <FormStage onNext={goToNextStage} />}
                {currentStage === 2 && <VideoStage />}
                {currentStage === 3 && <ConfirmationStage />}
            </div>

            {/* Add navigation for Admin and Interview page */}
            <div className="flex justify-between mt-6">
                <div>
                    {currentStage > 0 && (
                        <button
                            onClick={goToPreviousStage}
                            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-all duration-300 shadow-md"
                        >
                            Previous
                        </button>
                    )}
                </div>

                <div>
                    <Link to="/admin">
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all duration-300">
                            Go to Admin Panel
                        </button>
                    </Link>
                </div>

                <div>
                    <Link to="/interview">
                        <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-all duration-300">
                            Go to Interview Page
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;