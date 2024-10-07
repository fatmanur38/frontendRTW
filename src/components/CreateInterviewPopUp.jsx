import React, { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import useInterviewStore from '../Stores/InterviewStore';

const CreateInterviewPopup = ({ isOpen, closePopup }) => {
    const { questionPackages, fetchQuestionPackages, submitInterview, isLoading } = useInterviewStore();

    const [title, setTitle] = useState('');
    const [selectedPackages, setSelectedPackages] = useState([]);
    const [expireDate, setExpireDate] = useState('');
    const [canSkip, setCanSkip] = useState(false);
    const [showAtOnce, setShowAtOnce] = useState(false);

    // Fetch available question packages when the component mounts
    useEffect(() => {
        fetchQuestionPackages();
    }, []);

    // Handle adding a new interview
    const handleSubmit = () => {
        const interviewData = {
            title,
            packages: selectedPackages,
            expireDate,
            canSkip,
            showAtOnce
        };
        submitInterview(interviewData);
        closePopup(); // Close the popup after submission
    };

    return isOpen ? (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                {/* Close button */}
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

                {/* Select Packages */}
                <div className="mb-4">
                    <label className="block text-sm font-semibold mb-1">Package</label>
                    <select
                        multiple
                        value={selectedPackages}
                        onChange={(e) => setSelectedPackages(Array.from(e.target.selectedOptions, opt => opt.value))}
                        className="border p-2 rounded-md w-full"
                    >
                        {questionPackages.map(pkg => (
                            <option key={pkg._id} value={pkg.title}>{pkg.title}</option>
                        ))}
                    </select>
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