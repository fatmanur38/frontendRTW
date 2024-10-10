import React from 'react';
import { FaTimes } from 'react-icons/fa';

const QuestionListPopup = ({ isOpen, closePopup, questions }) => {
    if (!isOpen) return null; // Don't render if not open


    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg min-w-[750px] max-w-[900px] relative">
                {/* Close Button */}
                <button onClick={closePopup} className="absolute top-4 right-4 text-xl font-bold">
                    <FaTimes />
                </button>

                {/* Title */}
                <h2 className="text-lg font-bold mb-4">Question List</h2>

                {/* Questions List */}
                <div className="space-y-4">
                    {questions.map((question, index) => (
                        <div key={index} className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow-sm">
                            <span>{question.question}</span>
                            <span className="text-gray-500">{question.time} min</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default QuestionListPopup;