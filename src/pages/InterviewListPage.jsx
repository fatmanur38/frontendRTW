import React, { useEffect, useState } from 'react';
import { IoMdAdd } from 'react-icons/io';
import useInterviewStore from '../Stores/InterviewListStore';
import InterviewCard from '../components/InterviewCard';
import CreateInterviewPopup from '../components/CreateInterviewPopup';

const InterviewList = () => {
    const { interviews, fetchInterviews, isLoading, error } = useInterviewStore();
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    useEffect(() => {
        fetchInterviews();
    }, [fetchInterviews]);

    const openPopup = () => setIsPopupOpen(true);
    const closePopup = () => setIsPopupOpen(false);

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="relative p-8 bg-gray-100 min-h-screen">
            <div className="flex justify-between items-center mb-6 relative">
                <h1 className="text-2xl font-bold">Interview List</h1>
                <button
                    className="text-white bg-amber-300 hover:bg-amber-500 rounded-full p-3 flex items-center"
                    onClick={openPopup}
                >
                    <IoMdAdd className="size-8 mr-2" />
                    Add Interview
                </button>
            </div>
            <div className="flex flex-wrap justify-start">
                {Array.isArray(interviews) && interviews.length > 0 ? (
                    interviews.map((interview) => (
                        <InterviewCard
                            key={interview._id}
                            _id={interview._id}
                            title={interview.title}
                            totalCandidates={interview.questions?.length || 0}
                            onHoldCandidates={interview.questions?.filter(q => q.time > 30).length || 0}
                            isPublished={interview.isPublished}
                            questions={interview.questions}
                            interviewLink={interview.interviewLink}
                        />
                    ))
                ) : (
                    <p>No interviews found.</p>
                )}
            </div>
            <CreateInterviewPopup
                isOpen={isPopupOpen}
                closePopup={closePopup}
                refreshInterviews={fetchInterviews}
            />
        </div>
    );
};

export default InterviewList;