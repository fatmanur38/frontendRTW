import React, { useEffect, useState } from 'react';
import useInterviewStore from '../Stores/InterviewStore';
import { FaPlus, FaTimes } from 'react-icons/fa';
import AddQuestionPopUp from './AddQuestionPopUp'; // Import the new popup

const CreateInterviewPopup = ({ isOpen, closePopup, refreshInterviews }) => {
    const { questionPackages, fetchQuestionPackages, submitInterview } = useInterviewStore();

    const [title, setTitle] = useState('');
    const [selectedPackages, setSelectedPackages] = useState([]);
    const [expireDate, setExpireDate] = useState('');
    const [canSkip, setCanSkip] = useState(false);
    const [showAtOnce, setShowAtOnce] = useState(false);
    const [questions, setQuestions] = useState([]); // Store added questions

    const [isQuestionPopupOpen, setIsQuestionPopupOpen] = useState(false); // State to control AddQuestionPopUp

    useEffect(() => {
        fetchQuestionPackages();
    }, []);

    const handleSubmit = () => {
        const interviewData = {
            title,
            packages: selectedPackages,
            questions,
            expireDate,
            canSkip,
            showAtOnce,
        };

        submitInterview(interviewData)
            .then(() => {
                refreshInterviews();
                closePopup();
            })
            .catch((error) => {
                console.error("Error submitting interview:", error);
            });
    };

    const addQuestionToInterview = (newQuestion) => {
        setQuestions((prev) => [...prev, newQuestion]); // Add the new question to the list
    };

    return isOpen ? (
        <div
            className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center popup-background"
            onClick={(e) => e.target.classList.contains('popup-background') && closePopup()}
        >
            <div className="bg-white p-6 rounded-lg shadow-lg min-w-[700px] relative">
                <button onClick={closePopup} className="absolute top-4 right-4 text-xl font-bold">&times;</button>
                <h2 className="text-lg font-bold mb-4">Create Interview</h2>

                {/* Interview Title */}
                <div className="mb-4">
                    <label className="block text-sm font-semibold mb-1">Title</label>
                    <input
                        type="text"
                        placeholder="Input...."
                        className="border p-2 rounded-md w-full"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>

                {/* Select Packages with dropdown */}
                <div className="mb-4">
                    <label className="block text-sm font-semibold mb-1">Package</label>
                    <select
                        className="border p-2 rounded-md w-full"
                        onChange={(e) => setSelectedPackages([...selectedPackages, e.target.value])}
                        value=""
                    >
                        <option value="" disabled>Select Package</option>
                        {questionPackages.map(pkg => (
                            <option key={pkg._id} value={pkg.title}>{pkg.title}</option>
                        ))}
                    </select>

                    {/* Display selected packages */}
                    <div className="flex flex-wrap mt-2">
                        {selectedPackages.map((pkg) => (
                            <div key={pkg} className="bg-gray-200 rounded-full px-3 py-1 m-1 flex items-center">
                                <span>{pkg}</span>
                                <button className="ml-2 text-red-500" onClick={() => setSelectedPackages(selectedPackages.filter(p => p !== pkg))}>
                                    <FaTimes />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Add Question Button */}
                <div className="flex justify-end mb-4">
                    <button
                        className="flex items-center text-blue-500 text-sm"
                        onClick={() => setIsQuestionPopupOpen(true)} // Open AddQuestionPopUp
                    >
                        <FaPlus className="mr-1" />
                        Soru Ekle
                    </button>
                </div>

                {/* Expire Date */}
                <div className="mb-4">
                    <label className="block text-sm font-semibold mb-1">Expire Date</label>
                    <input
                        type="date"
                        className="border p-2 rounded-md w-full"
                        value={expireDate}
                        onChange={(e) => setExpireDate(e.target.value)}
                    />
                </div>

                {/* Toggles */}
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <label className="block text-sm font-semibold mb-1">Can Skip</label>
                        <input
                            type="checkbox"
                            checked={canSkip}
                            onChange={() => setCanSkip(!canSkip)}
                            className="border p-2 rounded-md"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-1">Show At Once</label>
                        <input
                            type="checkbox"
                            checked={showAtOnce}
                            onChange={() => setShowAtOnce(!showAtOnce)}
                            className="border p-2 rounded-md"
                        />
                    </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end">
                    <button
                        className="bg-emerald-500 hover:bg-emerald-400 text-white px-4 py-2 rounded-md"
                        onClick={handleSubmit}
                    >
                        Add
                    </button>
                </div>

                {/* AddQuestionPopUp */}
                <AddQuestionPopUp
                    isOpen={isQuestionPopupOpen}
                    closePopup={() => setIsQuestionPopupOpen(false)}
                    addQuestionToInterview={addQuestionToInterview}
                />
            </div>
        </div>
    ) : null;
};

export default CreateInterviewPopup;