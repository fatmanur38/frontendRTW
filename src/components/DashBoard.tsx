import React, { useState } from 'react';
import DashboardLayout from '../pages/DashboardLayout';
import FormStage from '../components/FormStage';
import VideoStage from '../components/WebRTC';
import ConfirmationStage from '../components/ConfirmationStage';

const Dashboard = () => {
    const [currentStage, setCurrentStage] = useState(1);

    const goToNextStage = () => {
        setCurrentStage((prevStage) => prevStage + 1);
    };

    return (
        <DashboardLayout>
            {currentStage === 1 && <FormStage onNext={goToNextStage} />}
            {currentStage === 2 && <VideoStage onNext={goToNextStage} />}
            {currentStage === 3 && <ConfirmationStage />}
        </DashboardLayout>
    );
};

export default Dashboard;