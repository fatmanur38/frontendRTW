import React from 'react';
import { FaTimes } from 'react-icons/fa';



const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;

    let result = '';

    if (hours > 0) {
        result += `${hours} ${hours === 1 ? 'hour' : 'hours'}`;
    }

    if (minutes > 0) {
        if (result) result += ' ';
        result += `${minutes} ${minutes === 1 ? 'min' : 'mins'}`;
    }

    if (seconds > 0) {
        if (result) result += ' ';
        result += `${seconds} ${seconds === 1 ? 'second' : 'seconds'}`;
    }

    return result || '0 seconds';
};

const QuestionListPopup = ({ isOpen, closePopup, questions }) => {
    if (!isOpen) return null; // Don't render if not open

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg min-w-[850px] max-w-[1000px] relative">
                {/* Close Button */}
                <button onClick={closePopup} className="absolute top-4 right-4 text-xl font-bold">
                    <FaTimes />
                </button>

                {/* Title */}
                <h2 className="text-lg font-bold mb-4">Question List</h2>

                <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                    {questions.map((question, index) => (
                        <div key={index} className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow-sm">
                            <span>{question.question}</span>
                            <span className="text-gray-500">{formatTime(question.time)}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default QuestionListPopup;