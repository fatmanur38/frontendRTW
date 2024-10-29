import React, { useEffect, useState } from 'react';
import { FaTrash, FaQuestionCircle } from 'react-icons/fa';
import { IoIosLink, IoMdAdd } from 'react-icons/io'; // Import IoMdAdd for the add button
import useInterviewStore from '../Stores/InterviewListStore';
import { useNavigate } from 'react-router-dom';
import QuestionListPopup from '../components/QuestionListPopUp';
import CreateInterviewPopup from '../components/CreateInterviewPopup'; // Import the pop-up for adding new interviews

const InterviewCard = ({ _id, title, totalCandidates, onHoldCandidates, isPublished, questions, interviewLink }) => {
    const navigate = useNavigate();
    const { deleteInterview } = useInterviewStore(); // Use the deleteInterview function
    const [isQuestionPopupOpen, setIsQuestionPopupOpen] = useState(false); // State to open/close question popup


    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this interview?')) {
            deleteInterview(_id); // Call delete function with the interview ID
        }
    };

    const handleOpenQuestions = () => {
        setIsQuestionPopupOpen(true); // Open question popup when question mark is clicked
    };

    const handleNavigateToCandidateInterview = () => {
        navigate(`http:localhost:5174/interview/${interviewLink}`); // Navigate to candidate/interview + interviewLink
    };

    return (
        <>
            <div className="border p-4 rounded-md shadow-md bg-light-green-100 relative w-1/4 min-w-[300px] min-h-[350px] m-4">
                {/* Top Icons */}
                <div className="flex justify-between mb-2">
                    <FaQuestionCircle className="text-gray-400 cursor-pointer hover:text-gray-600" onClick={handleOpenQuestions} />
                    <div className="flex space-x-2">
                        <FaTrash className="text-gray-400 cursor-pointer hover:text-gray-600" onClick={handleDelete} />
                        <IoIosLink className="text-gray-400 cursor-pointer hover:text-gray-600" onClick={handleNavigateToCandidateInterview} />
                    </div>
                </div>

                {/* Title with Border Below */}
                <h2 className="text-xl font-bold mb-2" style={{ color: '#47A7A2' }}>{title}</h2>
                <hr className="border-t-2  border-fuchsia-400 mb-2" />
                <p className="text-lg font-semibold mb-4" style={{ color: '#47A7A2' }}>Candidates:</p>

                {/* Candidate Info with Left Borders */}
                <div className="bg-gray-100 p-4 rounded-md flex justify-around mb-4">
                    <div className="text-center border-l-2 border-gray-300 pl-4">
                        <p className="font-semibold text-gray-600">TOTAL</p>
                        <p className="text-xl text-gray-800">{totalCandidates}</p>
                    </div>
                    <div className="text-center border-l-2 border-gray-300 pl-4">
                        <p className="font-semibold text-gray-600">ON HOLD</p>
                        <p className="text-xl text-gray-800">{onHoldCandidates}</p>
                    </div>
                </div>

                {/* Bottom Section with Border Above */}
                <hr className="border-t-2 border-gray-300 mb-4" />
                <div className="flex justify-between items-center">
                    <span className={`text-sm ${isPublished ? 'text-gray-600' : 'text-red-500'}`}>
                        {isPublished ? "Published" : "Unpublished"}
                    </span>
                    <button
                        className="text-gray-500 text-sm flex items-center hover:text-gray-700"
                        onClick={handleNavigateToCandidateInterview}
                    >
                        See Videos &gt;
                    </button>
                </div>

                {/* Render the question list popup */}
                <QuestionListPopup
                    isOpen={isQuestionPopupOpen}
                    closePopup={() => setIsQuestionPopupOpen(false)}
                    questions={questions} // Pass the questions to the popup
                />
            </div>
        </>
    );
};

const InterviewList = () => {
    const { interviews, fetchInterviews, isLoading, error } = useInterviewStore();
    const [isPopupOpen, setIsPopupOpen] = useState(false); // State to control add interview popup

    useEffect(() => {
        fetchInterviews(); // Fetch interviews when the component mounts
    }, [fetchInterviews]); // fetchInterviews function added to dependency array

    const openPopup = () => setIsPopupOpen(true); // Open add interview popup
    const closePopup = () => setIsPopupOpen(false); // Close add interview popup

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="relative p-8 bg-gray-100 min-h-screen">
            <div className="flex justify-between items-center mb-6 relative">
                <h1 className="text-2xl font-bold">Interview List</h1>
                {/* Add Interview Button */}
                <button
                    className="text-white bg-emerald-500 hover:bg-emerald-400 rounded-full p-3 flex items-center"
                    onClick={openPopup}
                >
                    <IoMdAdd className="size-8 mr-2" />
                    Add Interview
                </button>
            </div>

            {/* Interview cards */}
            <div className="flex flex-wrap justify-start">
                {Array.isArray(interviews) && interviews.length > 0 ? (
                    interviews.map((interview) => (
                        <InterviewCard
                            key={interview._id}
                            _id={interview._id} // Pass the interview ID
                            title={interview.title}
                            totalCandidates={interview.questions?.length || 0} // Safely access questions length
                            onHoldCandidates={interview.questions?.filter(q => q.time > 30).length || 0} // Safely filter questions
                            isPublished={interview.isPublished} // Adjust the published status if needed
                            questions={interview.questions}
                            interviewLink={interview.interviewLink} // Pass interviewLink to InterviewCard
                        />
                    ))
                ) : (
                    <p>No interviews found.</p>
                )}
            </div>

            {/* Add Interview Pop-up */}
            <CreateInterviewPopup
                isOpen={isPopupOpen}
                closePopup={closePopup}
                refreshInterviews={fetchInterviews} // Pass the fetchInterviews function
            />
        </div>
    );
};

export default InterviewList;