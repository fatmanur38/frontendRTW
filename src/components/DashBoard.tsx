import React, { useState } from 'react';
import Header from '../components/Header';
import ProgressBar from '../components/ProgressBar';
import FormStage from '../components/FormStage';
import VideoStage from '../components/WebRTC';
import ConfirmationStage from '../components/ConfirmationStage';

const Dashboard = () => {
    const [currentStage, setCurrentStage] = useState(1);

    const goToNextStage = () => {
        setCurrentStage((prevStage) => prevStage + 1);
        console.log("currentStage: ", currentStage);
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Header />
            <ProgressBar currentStep={currentStage} />
            <div className="max-w-4xl mx-auto p-4 transition-all duration-700 ease-in-out transform">
                {currentStage === 1 && <FormStage onNext={goToNextStage} />}
                {currentStage === 2 && <VideoStage />}
                {currentStage === 3 && <ConfirmationStage />}
            </div>
        </div>
    );
};

export default Dashboard;