import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaTrash, FaPlus } from "react-icons/fa";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import EditQuestionPackageStore from "../Stores/EditQuestionPackageStore";

// Constants for DnD item types
const ItemType = {
    QUESTION: 'question',
};

const formatTime = (timeInSeconds) => {
    if (timeInSeconds < 60) return `${timeInSeconds} sec`;
    if (timeInSeconds >= 3600) return `${(timeInSeconds / 3600).toFixed(1)} hr`;
    return `${Math.floor(timeInSeconds / 60)} min`;
};

// Draggable question row component
const DraggableQuestionRow = ({ question, index, moveQuestion, handleDeleteQuestion }) => {
    const [{ isDragging }, dragRef] = useDrag({
        type: ItemType.QUESTION,
        item: { index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const [, dropRef] = useDrop({
        accept: ItemType.QUESTION,
        hover: (draggedItem) => {
            if (draggedItem.index !== index) {
                moveQuestion(draggedItem.index, index);
                draggedItem.index = index;
            }
        },
    });

    return (
        <tr
            ref={(node) => dragRef(dropRef(node))}
            style={{ opacity: isDragging ? 0.5 : 1 }}
            className="border-t"
        >
            <td className="p-6 text-2xl">≡</td>
            <td className="p-2">{question.question}</td>
            <td className="p-2">{formatTime(question.time)}</td>
            <td className="p-2">
                <button className="text-red-500" onClick={() => handleDeleteQuestion(index)}>
                    <FaTrash />
                </button>
            </td>
        </tr>
    );
};

const EditSinglePackage = () => {
    const { id } = useParams();
    const {
        selectedPackage,
        fetchQuestionPackageById,
        isPopupOpen,
        openPopup,
        closePopup,
        setNewQuestion,
        newQuestion,
        addQuestion,
        savePackage,
    } = EditQuestionPackageStore();


    useEffect(() => {
        fetchQuestionPackageById(id);
    }, [id]);

    const [questions, setQuestions] = useState([]);
    const [packageTitle, setPackageTitle] = useState(""); // Local state to handle the title


    useEffect(() => {
        if (selectedPackage) {
            setQuestions(selectedPackage.questions);
        }
    }, [selectedPackage]);

    const moveQuestion = (fromIndex, toIndex) => {
        const updatedQuestions = [...questions];
        const [movedItem] = updatedQuestions.splice(fromIndex, 1);
        updatedQuestions.splice(toIndex, 0, movedItem);
        setQuestions(updatedQuestions);
    };

    const handleSave = () => {
        // Use the current package title or fallback to the old title
        const updatedTitle = packageTitle.trim() === "" ? selectedPackage.title : packageTitle;

        const formattedQuestions = questions.map(({ question, time }) => ({
            question,
            time,
        }));

        const updatedPackage = {
            title: updatedTitle, // Use updated title
            questions: formattedQuestions, // Use formatted questions
        };

        savePackage(id, updatedPackage); // Send updated package to the store's savePackage function
    };
    const handleDeleteQuestion = (index) => {
        const updatedQuestions = [...questions];
        updatedQuestions.splice(index, 1); // Remove the question at the clicked index
        setQuestions(updatedQuestions); // Update the state with the remaining questions
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="flex min-h-screen bg-gray-100 p-6">
                {selectedPackage ? (
                    <div className="w-full max-w-4xl mx-auto bg-white p-6 rounded-md shadow-md">
                        {/* Editable Package Title and Plus Icon */}
                        <div className="flex justify-between items-center mb-4">
                            <input
                                type="text"
                                placeholder={selectedPackage.title} // Display current package title as placeholder
                                value={packageTitle} // Bind input to local state
                                onChange={(e) => setPackageTitle(e.target.value)} // Allow editing of the title
                                className="block w-1/3 text-lg font-bold border-b-2 pl-3 py-2 rounded-md bg-gray-200"
                            />
                            <button
                                className="ml-4 bg-emerald-500 hover:bg-emerald-400 text-white p-2 rounded-full"
                                onClick={openPopup}
                            >
                                <FaPlus />
                            </button>
                        </div>

                        {/* Drag and Drop Questions */}
                        <table className="w-full cursor-pointer bg-white rounded-md shadow-md">
                            <thead className="bg-gray-200">
                                <tr>
                                    <th className="p-2 text-left">Order</th>
                                    <th className="p-2 text-left">Question</th>
                                    <th className="p-2 text-left">Time</th>
                                    <th className="p-2 text-left">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {questions.map((question, index) => (
                                    <DraggableQuestionRow
                                        key={question._id}
                                        question={question}
                                        index={index}
                                        moveQuestion={moveQuestion}
                                        handleDeleteQuestion={() => handleDeleteQuestion(index)} // Pass the index
                                    />
                                ))}
                            </tbody>
                        </table>

                        {/* Buttons */}
                        <div className="mt-4 flex justify-between">
                            <button className="bg-gray-400 text-white px-4 py-2 rounded-md">
                                Cancel
                            </button>
                            <button
                                className="bg-emerald-500 hover:bg-emerald-400 text-white px-4 py-2 rounded-md"
                                onClick={handleSave}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                ) : (
                    <p>No package found.</p>
                )}
            </div>

            {/* Pop-up Form */}
            {isPopupOpen && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-bold">Add Question</h2>
                            <button onClick={closePopup}>&times;</button>
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-semibold mb-1">Question</label>
                            <textarea
                                placeholder="Enter question"
                                className="border p-2 rounded-md w-full"
                                value={newQuestion.question}
                                onChange={(e) => setNewQuestion("question", e.target.value)}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-semibold mb-1">Time (in seconds)</label>
                            <input
                                type="number"
                                placeholder="Enter time in seconds"
                                className="border p-2 rounded-md w-full"
                                value={newQuestion.time}
                                onChange={(e) => setNewQuestion("time", e.target.value)}
                            />
                        </div>

                        <div className="flex justify-end">
                            <button
                                className="bg-emerald-500 hover:bg-emerald-400 text-white px-4 py-2 rounded-md"
                                onClick={addQuestion}
                            >
                                Add
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </DndProvider>
    );
};

export default EditSinglePackage;