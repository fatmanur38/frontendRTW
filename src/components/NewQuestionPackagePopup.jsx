import React, { useState } from "react";
import { FaTrash, FaPlus } from "react-icons/fa";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const ItemType = {
    QUESTION: "question",
};

const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;
    let result = "";

    if (hours > 0) result += `${hours} ${hours === 1 ? "hour" : "hours"}`;
    if (minutes > 0) result += `${minutes} ${minutes === 1 ? "min" : "mins"}`;
    if (seconds > 0) result += `${seconds} ${seconds === 1 ? "second" : "seconds"}`;

    return result || "0 seconds";
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
        <tr ref={(node) => dragRef(dropRef(node))} style={{ opacity: isDragging ? 0.5 : 1 }} className="border-t">
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

const CreateQuestionPackage = () => {
    const [questions, setQuestions] = useState([]); // Empty questions for the new package
    const [packageTitle, setPackageTitle] = useState(""); // Package title state
    const [newQuestion, setNewQuestion] = useState({ question: "", time: "" });

    const moveQuestion = (fromIndex, toIndex) => {
        const updatedQuestions = [...questions];
        const [movedItem] = updatedQuestions.splice(fromIndex, 1);
        updatedQuestions.splice(toIndex, 0, movedItem);
        setQuestions(updatedQuestions);
    };

    const handleAddQuestion = () => {
        if (newQuestion.question && newQuestion.time) {
            setQuestions([...questions, newQuestion]);
            setNewQuestion({ question: "", time: "" }); // Clear the input fields after adding
        }
    };

    const handleDeleteQuestion = (index) => {
        const updatedQuestions = [...questions];
        updatedQuestions.splice(index, 1);
        setQuestions(updatedQuestions);
    };

    const handleSave = () => {
        const updatedPackage = {
            title: packageTitle,
            questions: questions.map(({ question, time }) => ({ question, time })),
        };
        console.log("Package Saved:", updatedPackage);
        // Add your save logic here (e.g., POST request to save the new package)
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="flex min-h-screen bg-gray-100 p-6">
                <div className="w-full max-w-4xl mx-auto bg-white p-6 rounded-md shadow-md">
                    {/* Editable Package Title and Plus Icon */}
                    <div className="flex justify-between items-center mb-4">
                        <input
                            type="text"
                            placeholder="Enter package title"
                            value={packageTitle}
                            onChange={(e) => setPackageTitle(e.target.value)}
                            className="block w-1/3 text-lg font-bold border-b-2 pl-3 py-2 rounded-md bg-gray-200"
                        />
                        <button className="ml-4 bg-emerald-500 hover:bg-emerald-400 text-white p-2 rounded-full" onClick={handleAddQuestion}>
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
                                    key={index}
                                    question={question}
                                    index={index}
                                    moveQuestion={moveQuestion}
                                    handleDeleteQuestion={() => handleDeleteQuestion(index)}
                                />
                            ))}
                        </tbody>
                    </table>

                    {/* Buttons */}
                    <div className="mt-4 flex justify-between">
                        <button className="bg-gray-400 text-white px-4 py-2 rounded-md">
                            Cancel
                        </button>
                        <button className="bg-emerald-500 hover:bg-emerald-400 text-white px-4 py-2 rounded-md" onClick={handleSave}>
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </DndProvider>
    );
};

export default CreateQuestionPackage;