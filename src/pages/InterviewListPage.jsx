import React, { useEffect, useState } from 'react';
import { FaTrash, FaCopy, FaPlus, FaQuestionCircle } from 'react-icons/fa';
import useInterviewStore from '../Stores/InterviewListStore';
import CreateInterviewPopup from '../components/CreateInterviewPopUp'; // Import the pop-up component
import { useNavigate } from 'react-router-dom';

const InterviewCard = ({ title, totalCandidates, onHoldCandidates, isPublished, openPopup }) => {
    const navigate = useNavigate();

    const handleCopyLink = () => {
        alert("Interview link copied!");
    };

    const handleSeeVideos = () => {
        navigate("/videos");
    };

    return (
        <div className="border p-4 rounded-md shadow-md bg-white relative w-1/4 min-w-[300px] m-4">
            {/* Top Icons */}
            <div className="flex justify-between mb-2">
                <FaQuestionCircle className="text-gray-400 cursor-pointer" />
                <div className="flex space-x-2">
                    <FaTrash className="text-gray-400 cursor-pointer" />
                    <FaCopy className="text-gray-400 cursor-pointer" onClick={handleCopyLink} />
                </div>
            </div>

            {/* Title */}
            <h2 className="text-xl font-bold mb-4">{title}</h2>

            {/* Candidate Info */}
            <div className="bg-gray-100 p-4 rounded-md flex justify-around mb-4">
                <div className="text-center">
                    <p className="font-semibold">TOTAL</p>
                    <p className="text-xl">{totalCandidates}</p>
                </div>
                <div className="text-center">
                    <p className="font-semibold">ON HOLD</p>
                    <p className="text-xl">{onHoldCandidates}</p>
                </div>
            </div>

            {/* Bottom Section */}
            <div className="flex justify-between items-center">
                <span className={`text-sm ${isPublished ? 'text-green-500' : 'text-red-500'}`}>
                    {isPublished ? "Published" : "Unpublished"}
                </span>
                <button
                    className="text-blue-500 text-sm flex items-center"
                    onClick={handleSeeVideos}
                >
                    See Videos &gt;
                </button>
            </div>
        </div>
    );
};

const InterviewList = () => {
    const { interviews, fetchInterviews, isLoading, error } = useInterviewStore();

    const [isPopupOpen, setIsPopupOpen] = useState(false); // Handle the pop-up state

    const openPopup = () => setIsPopupOpen(true); // Open pop-up
    const closePopup = () => setIsPopupOpen(false); // Close pop-up

    useEffect(() => {
        fetchInterviews(); // Fetch interviews when the component mounts
    }, []);

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            {/* Flex container for heading and button */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Interview List</h1>

                {/* Plus Icon to open the create interview popup */}
                <button
                    className="text-white bg-blue-500 hover:bg-blue-400 rounded-full p-3"
                    onClick={openPopup}
                >
                    <FaPlus />
                </button>
            </div>

            {/* Interview cards */}
            <div className="flex flex-wrap justify-start">
                {interviews.map((interview) => {
                    const totalCandidates = interview.questions.length;
                    const onHoldCandidates = interview.questions.filter(
                        (q) => q.time > 30 // Example criteria for on hold
                    ).length;

                    return (
                        <InterviewCard
                            key={interview._id}
                            title={interview.title}
                            totalCandidates={totalCandidates}
                            onHoldCandidates={onHoldCandidates}
                            isPublished={true} // Assuming published status, adjust as needed
                            openPopup={openPopup}
                        />
                    );
                })}
            </div>
            <CreateInterviewPopup isOpen={isPopupOpen} closePopup={closePopup} />
        </div>
    );
};

export default InterviewList;