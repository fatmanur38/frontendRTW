import React, { useState } from 'react';
import { FaTrash, FaQuestionCircle } from 'react-icons/fa';
import { IoIosLink } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import useInterviewStore from '../Stores/InterviewListStore';
import QuestionListPopUp from './QuestionListPopUp';
import useInterviewCardStore from '../Stores/InterviewCardStore';

const InterviewCard = ({ _id, title, totalCandidates, onHoldCandidates, isPublished, questions, interviewLink }) => {
    const navigate = useNavigate();
    const { deleteInterview } = useInterviewStore();
    const [isQuestionPopupOpen, setIsQuestionPopupOpen] = useState(false);
    const { getInterviewByLink } = useInterviewCardStore(); // Access getInterviewByLink action


    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this interview?')) {
            deleteInterview(_id);
        }
    };

    const handleOpenQuestions = () => {
        setIsQuestionPopupOpen(true);
    };
    const handleNavigateToCandidateInterview = async () => {
        // Fetch and log interview details by link
        const userData = await getInterviewByLink(interviewLink);
        console.log("User Data:", userData);
        navigate('/video-collection', { state: { userData, questions, title } });
    };
    const handleCopyLink = () => {
        navigator.clipboard.writeText("https://user-frontend-rtw.vercel.app/interview/"+interviewLink);
        alert('Link copied to clipboard');
    };

    return (
        <>
            <div
                className="border-l-4 border-r-4 border-b-4 p-4 rounded-xl shadow-md bg-[#ffffff] relative w-1/4 min-w-[300px] min-h-[320px] m-4 transition-all duration-200 hover:scale-105 hover:shadow-lg"
            >
                {/* Top Icons */}
                <div className="flex justify-between mb-2">
                    <FaQuestionCircle className="text-black cursor-pointer hover:text-[#00bcd4]" onClick={handleOpenQuestions} />
                    <div className="flex space-x-2">
                        <FaTrash className="text-black cursor-pointer hover:text-[#00bcd4]" onClick={handleDelete} />
                        <IoIosLink className="text-black cursor-pointer hover:text-[#00bcd4]" onClick={handleCopyLink} />
                    </div>
                </div>

                {/* Title with Border Below */}
                <h2 className="text-xl font-bold mb-2 text-black">{title}</h2>
                <hr className="border-t-2 border-[#004d61] mb-2" />

                {/* Candidate Info Section */}
                <p className="text-lg font-semibold mb-4 text-black">Candidates:</p>
                <div className="bg-[#b2dfdb] p-4 rounded-md flex justify-around mb-4">
                    <div className="text-center border-l-2 border-[#004d61] pl-4">
                        <p className="font-semibold text-[#004d61]">TOTAL</p>
                        <p className="text-xl text-[#004d61]">{totalCandidates}</p>
                    </div>
                    <div className="text-center border-l-2 border-[#004d61] pl-4">
                        <p className="font-semibold text-[#004d61]">ON HOLD</p>
                        <p className="text-xl text-[#004d61]">{onHoldCandidates}</p>
                    </div>
                </div>



                {/* Bottom Section for Status and Action Button */}
                <div className="absolute bottom-0 left-0 right-0 p-4 border-t-2 border-[#004d61] bg-[#ffffff] flex justify-between items-center">
                    <span className={`text-sm font-bold ${isPublished ? 'text-green-500' : 'text-[#d51c3f]'}`}>
                        {isPublished ? "Published" : "Unpublished"}
                    </span>
                    <button
                        className="text-black text-sm flex items-center font-semibold hover:text-[#00bcd4]"
                        onClick={handleNavigateToCandidateInterview}
                    >
                        See Videos &gt;
                    </button>
                </div>
            </div>
            <div>
                {/* Render the question list popup */}
                <QuestionListPopUp
                    isOpen={isQuestionPopupOpen}
                    closePopup={() => setIsQuestionPopupOpen(false)}
                    questions={questions}
                />
            </div>
        </>
    );
};

export default InterviewCard;