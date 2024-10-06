import React, { useEffect, useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import useQuestionStore from "../Stores/CreateQuestionStore";
import { MdMenu } from "react-icons/md";

function QuestionPackages() {

    const {
        questions,
        isPopupOpen,
        openPopup,
        closePopup,
        setQuestionText,
        setCategoryName,
        setTimeLimit,
        submitQuestion,
        fetchQuestions,
    } = useQuestionStore();


    useEffect(() => {

        fetchQuestions();

    }, [submitQuestion]);


    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Main Content */}
            <div className="flex-1 p-6">
                {/* Package Title and Add Button */}
                <div className="flex justify-between mb-4">
                    <input
                        type="text"
                        placeholder="Package Title..."
                        className="border p-2 rounded-md w-1/2"
                    />
                    <button
                        className="bg-emerald-500 hover:bg-emerald-400 text-white p-2 rounded-full"
                        onClick={openPopup}
                    >
                        <FaPlus />
                    </button>
                </div>

                {/* Question List */}
                <table className="w-full bg-white rounded-md shadow-md">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="p-2 text-left">Order</th>
                            <th className="p-2 text-left">Question</th>
                            <th className="p-2 text-left">Time</th>
                            <th className="p-2 text-left">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {questions.map((q, index) => (
                            <tr key={index} className="border-t">
                                <td className="p-6 text-2xl"><MdMenu /></td>
                                <td className="p-2">{q.question}</td>
                                <td className="p-2">{q.timeLimit}</td>
                                <td className="p-2">
                                    <button className="text-red-500">
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Save and Cancel Buttons */}
                <div className="mt-4 flex justify-between">
                    <button className="bg-gray-400 text-white px-4 py-2 rounded-md">
                        Cancel
                    </button>
                    <button className="bg-emerald-500 hover:bg-emerald-400 text-white px-4 py-2 rounded-md">
                        Save
                    </button>
                </div>

                {/* Pop-up Form */}
                {isPopupOpen && (
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
                        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-lg font-bold">Add Question</h2>
                                <button onClick={closePopup}>&times;</button>
                            </div>

                            {/* Question Text Area */}
                            <div className="mb-4">
                                <label className="block text-sm font-semibold mb-1">Question</label>
                                <textarea
                                    placeholder="Input..."
                                    className="border p-2 rounded-md w-full"
                                    onChange={(e) => setQuestionText(e.target.value)}
                                />
                            </div>

                            {/* Category Name Input */}
                            <div className="mb-4">
                                <label className="block text-sm font-semibold mb-1">Category Name</label>
                                <input
                                    type="text"
                                    placeholder="Enter category name"
                                    className="border p-2 rounded-md w-full"
                                    onChange={(e) => setCategoryName(e.target.value)}
                                />
                            </div>

                            {/* Timer Text Box */}
                            <div className="mb-4">
                                <label className="block text-sm font-semibold mb-1">Timer</label>
                                <input
                                    type="text"
                                    placeholder="00:00:00"
                                    className="border p-2 rounded-md w-full"
                                    onChange={(e) => setTimeLimit(e.target.value)}
                                />
                            </div>

                            {/* Submit Button */}
                            <div className="flex justify-end">
                                <button
                                    className="bg-emerald-500 hover:bg-emerald-400 text-white px-4 py-2 rounded-md"
                                    onClick={submitQuestion}
                                >
                                    Add
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default QuestionPackages;