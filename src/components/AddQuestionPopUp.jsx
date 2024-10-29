import React, { useState } from 'react';

const AddQuestionPopUp = ({ isOpen, closePopup, addQuestionToInterview }) => {
    const [newQuestion, setNewQuestion] = useState({ question: '', time: '' });

    const handleInputChange = (field, value) => {
        setNewQuestion((prev) => ({
            ...prev,
            [field]: value
        }));
    };

    const handleAddQuestion = () => {
        addQuestionToInterview(newQuestion);
        setNewQuestion({ question: '', time: '' }); 
        closePopup();
    };

    return isOpen ? (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center popup-background">
            <div className="bg-white p-6 rounded-lg shadow-lg min-w-[700px] min-h-[400px]">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-bold">Add Question</h2>
                    <button onClick={closePopup} className="text-xl font-bold">&times;</button>
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-semibold mb-1">Question</label>
                    <textarea
                        placeholder="Enter question"
                        className="border p-2 rounded-md w-full h-32" 
                        value={newQuestion.question}
                        onChange={(e) => handleInputChange("question", e.target.value)}
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-semibold mb-1">Time (in seconds)</label>
                    <input
                        type="number"
                        placeholder="Enter time in seconds"
                        className="border p-2 rounded-md w-full"
                        value={newQuestion.time}
                        onChange={(e) => handleInputChange("time", e.target.value)}
                    />
                </div>

                <div className="flex justify-end">
                    <button
                        className="bg-emerald-500 hover:bg-emerald-400 text-white px-4 py-2 rounded-md"
                        onClick={handleAddQuestion}
                    >
                        Add
                    </button>
                </div>
            </div>
        </div>
    ) : null;
};

export default AddQuestionPopUp;