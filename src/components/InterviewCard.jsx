import React, { useState } from 'react';
import { FaTrash, FaQuestionCircle } from 'react-icons/fa';
import { IoIosLink } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import useInterviewStore from '../Stores/InterviewListStore';
import QuestionListPopup from './QuestionListPopUp';

const InterviewCard = ({ _id, title, totalCandidates, onHoldCandidates, isPublished, questions, interviewLink }) => {
    const navigate = useNavigate();
    const { deleteInterview } = useInterviewStore();
    const [isQuestionPopupOpen, setIsQuestionPopupOpen] = useState(false);

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this interview?')) {
            deleteInterview(_id);
        }
    };

    const handleOpenQuestions = () => {
        setIsQuestionPopupOpen(true);
    };

    const handleNavigateToCandidateInterview = () => {
        navigate(`http:localhost:5174/interview/${interviewLink}`);
    };

    return (
        <>
            <div
                className="border-l-4 border-r-4 border-b-4 border-[#004d61] p-4 rounded-md shadow-md bg-[#80cbc4] relative w-1/4 min-w-[300px] min-h-[350px] m-4 transition-all duration-200 hover:border-[#00bcd4]"
            >
                {/* Top Icons */}
                <div className="flex justify-between mb-2">
                    <FaQuestionCircle className="text-white cursor-pointer hover:text-[#00bcd4]" onClick={handleOpenQuestions} />
                    <div className="flex space-x-2">
                        <FaTrash className="text-white cursor-pointer hover:text-[#00bcd4]" onClick={handleDelete} />
                        <IoIosLink className="text-white cursor-pointer hover:text-[#00bcd4]" onClick={handleNavigateToCandidateInterview} />
                    </div>
                </div>

                {/* Title with Border Below */}
                <h2 className="text-xl font-bold mb-2 text-white">{title}</h2>
                <hr className="border-t-2 border-[#004d61] mb-2" />

                {/* Candidate Info Section */}
                <p className="text-lg font-semibold mb-4 text-white">Candidates:</p>
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

                {/* Render the question list popup */}
                <QuestionListPopup
                    isOpen={isQuestionPopupOpen}
                    closePopup={() => setIsQuestionPopupOpen(false)}
                    questions={questions}
                />

                {/* Bottom Section for Status and Action Button */}
                <div className="absolute bottom-0 left-0 right-0 p-4 border-t-2 border-[#004d61] bg-[#80cbc4] flex justify-between items-center">
                    <span className={`text-sm font-bold ${isPublished ? 'text-white' : 'text-[#d51c3f]'}`}>
                        {isPublished ? "Published" : "Unpublished"}
                    </span>
                    <button
                        className="text-white text-sm flex items-center font-semibold hover:text-[#00bcd4]"
                        onClick={handleNavigateToCandidateInterview}
                    >
                        See Videos &gt;
                    </button>
                </div>
            </div>
        </>
    );
};

export default InterviewCard;