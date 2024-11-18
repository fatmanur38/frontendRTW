import React, { useEffect, useState } from 'react';
import { IoMdAdd } from 'react-icons/io';
import useInterviewStore from '../Stores/InterviewListStore';
import InterviewCard from '../components/InterviewCard';
import CreateInterviewPopup from '../components/CreateInterviewPopUp';

const InterviewList = () => {
    const { interviews, fetchInterviews, isLoading, error } = useInterviewStore();
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    // Helper function to determine isPublished status and process users for notes and counts
    const processInterviews = (interviews) => {
        const today = new Date();
        return interviews.map((interview) => ({
            ...interview,
            isPublished: new Date(interview.expireDate) > today,
            totalCandidates: interview.users?.length || 0, // Count of users
            onHoldCandidates: interview.users?.filter(user => user.status === 'inactive').length || 0, // Count of inactive users
            userNotes: interview.users?.map(user => user.note) || [], // Collect notes from users
            userStatus: interview.users?.map(user => ({
                id: user._id,
                name: user.name,
                surname: user.surname,
                email: user.email,
                phone: user.phone,
                status: user.status,
            })) || [], // Collect user status data
        }));
    };

    useEffect(() => {
        fetchInterviews();
    }, [fetchInterviews]);

    const openPopup = () => setIsPopupOpen(true);
    const closePopup = () => setIsPopupOpen(false);

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    const processedInterviews = Array.isArray(interviews) ? processInterviews(interviews) : [];
    console.log("Processed Interviews:", processedInterviews);

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
                {processedInterviews.length > 0 ? (
                    processedInterviews.map((interview) => (
                        <InterviewCard
                            key={interview._id}
                            _id={interview._id}
                            title={interview.title}
                            totalCandidates={interview.totalCandidates}
                            onHoldCandidates={interview.onHoldCandidates}
                            isPublished={interview.isPublished}
                            questions={interview.questions}
                            interviewLink={interview.interviewLink}
                            userNotes={interview.userNotes}
                            userStatus={interview.userStatus} // Pass user status to InterviewCard
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