import React, { useEffect, useState } from 'react';
import useInterviewStore from '../Stores/InterviewStore';
import { FaPlus, FaTimes } from 'react-icons/fa';

const CreateInterviewPopup = ({ isOpen, closePopup, refreshInterviews }) => {
    const { questionPackages, fetchQuestionPackages, submitInterview } = useInterviewStore();

    const [title, setTitle] = useState('');
    const [selectedPackages, setSelectedPackages] = useState([]);
    const [expireDate, setExpireDate] = useState('');
    const [canSkip, setCanSkip] = useState(false);
    const [showAtOnce, setShowAtOnce] = useState(false);

    // Fetch available question packages when the component mounts
    useEffect(() => {
        fetchQuestionPackages();
    }, []);

    // Close the popup on ESC key press
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') {
                closePopup();
            }
        };
        window.addEventListener('keydown', handleEsc);
        return () => {
            window.removeEventListener('keydown', handleEsc);
        };
    }, [closePopup]);

    // Handle click outside to close popup
    const handleClickOutside = (e) => {
        if (e.target.classList.contains('popup-background')) {
            closePopup();
        }
    };

    // Handle adding a new interview
    // Handle adding a new interview with merged questions
    const handleSubmit = () => {
        console.log("Merged Questions:", mergedQuestions);

        const interviewData = {
            title,
            packages: selectedPackages,
            questions: mergedQuestions,
            expireDate,
            canSkip,
            showAtOnce,
        };

        submitInterview(interviewData)
            .then(() => {
                refreshInterviews();  // Fetch updated interviews list
                closePopup();         // Close the popup after success
            })
            .catch((error) => {
                console.error("Error submitting interview:", error);
            });
    };

    // Add package to the selected packages list
    const handlePackageSelect = (e) => {
        const selectedValue = e.target.value;
        if (!selectedPackages.includes(selectedValue)) {
            setSelectedPackages([...selectedPackages, selectedValue]);
        }
    };

    // Remove a package from the selected list
    const removePackage = (pkg) => {
        setSelectedPackages(selectedPackages.filter(p => p !== pkg));
    };

    return isOpen ? (
        <div
            className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center popup-background"
            onClick={handleClickOutside}
        >
            <div className="bg-white p-6 rounded-lg shadow-lg min-w-[700px] relative">                {/* Close button inside the popup */}
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
                    <div className="relative">
                        <select
                            className="border p-2 rounded-md w-full"
                            onChange={handlePackageSelect}
                            value=""
                        >
                            <option value="" disabled>Select Package</option>
                            {questionPackages.map(pkg => (
                                <option key={pkg._id} value={pkg.title}>{pkg.title}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex flex-wrap mt-2">
                        {selectedPackages.map((pkg) => (
                            <div key={pkg} className="bg-gray-200 rounded-full px-3 py-1 m-1 flex items-center">
                                <span>{pkg}</span>
                                <button
                                    className="ml-2 text-red-500"
                                    onClick={() => removePackage(pkg)}
                                >
                                    <FaTimes />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Add Question Button */}
                <div className="flex justify-end mb-4">
                    <button className="flex items-center text-blue-500 text-sm">
                        <FaPlus className="mr-1" />
                        Add a question
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
            </div>
        </div>
    ) : null;
};

export default CreateInterviewPopup;