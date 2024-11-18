import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import useUserStore from '../Stores/useUserInterviewStore';
import { MdOutlineVerified, MdOutlineError } from 'react-icons/md';

const VideoCard = ({ name, surname, videoUrl, note, status, onClick }) => (
    <div
        onClick={onClick}
        className="bg-white shadow-md rounded-lg p-4 w-[250px] h-[220px] flex flex-col items-center m-4 cursor-pointer"
    >
        <div className="bg-gray-200 w-full h-[120px] rounded-lg flex items-center justify-center relative">
            <span className="text-5xl text-gray-500">▶️</span>
        </div>
        <h3 className="text-center font-semibold mt-2">
            {name} {surname}
        </h3>
        <p className="text-center text-gray-500 text-sm mt-2">{note || 'No notes available'}</p>
        <p
            className={`text-center font-medium mt-2 ${status === 'active' ? 'text-green-500' : 'text-red-500'}`}
        >
            {status === 'active' ? 'İzlendi' : 'Bekliyor'}
        </p>
    </div>
);
const VideoDetail = ({ videoData, onBack }) => {
    const { setStatus, saveData } = useUserStore();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [fade, setFade] = useState(false);
    const [note, setNote] = useState(videoData.note || ''); // Initialize with the passed note
    const [status, setLocalStatus] = useState(videoData.userStatus === 'active'); // Initialize based on userStatus

    const handleNextQuestion = () => {
        if (currentQuestionIndex < videoData.questions.length - 1) {
            setFade(true);
            setTimeout(() => {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
                setFade(false);
            }, 300);
        }
    };

    const handlePreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setFade(true);
            setTimeout(() => {
                setCurrentQuestionIndex(currentQuestionIndex - 1);
                setFade(false);
            }, 300);
        }
    };

    const handleSave = async () => {
        console.log("Saving for userId:", videoData.userId);
        await saveData(videoData.userId, note); // Save data for the user along with the note
        setStatus(status); // Save the current status in the global state
    };

    const handleToggleSwitch = () => {
        setLocalStatus(!status); // Toggle the local status
    };

    return (
        <div className="bg-gray-50 shadow-md rounded-lg p-6 flex flex-col space-y-4">
            <PopupSwitchNotification />

            <div className="flex flex-row space-x-6">
                <div className="w-1/2 flex items-center justify-center relative">
                    <video
                        src={videoData.videoUrl}
                        controls
                        className="rounded-lg w-full h-auto"
                    />
                </div>
                <div className="w-1/2 flex flex-col space-y-4">
                    <h3 className="text-lg font-semibold">
                        {videoData.name} {videoData.surname}
                    </h3>
                    <div className="bg-gray-100 p-4 rounded-lg space-y-2">
                        <h4 className="font-medium">Question {currentQuestionIndex + 1}:</h4>
                        {videoData.questions && videoData.questions.length > 0 ? (
                            <div
                                className={`transition-opacity duration-300 ${fade ? 'opacity-0' : 'opacity-100'
                                    }`}
                            >
                                <p className="text-gray-600 text-lg">
                                    {videoData.questions[currentQuestionIndex]?.question || "No question text available"}
                                </p>
                            </div>
                        ) : (
                            <p className="text-gray-600">No questions available.</p>
                        )}
                        <div className="flex justify-between mt-4">
                            <button
                                onClick={handlePreviousQuestion}
                                disabled={currentQuestionIndex === 0}
                                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 disabled:opacity-50"
                            >
                                Previous
                            </button>
                            <button
                                onClick={handleNextQuestion}
                                disabled={currentQuestionIndex === videoData.questions.length - 1}
                                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 disabled:opacity-50"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                    <textarea
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        placeholder="Note..."
                        className="bg-white border border-gray-300 rounded-lg p-2 w-full h-24 resize-none"
                    />
                </div>
            </div>
            <div className="flex justify-between items-center mt-4">
                <div className="flex items-center space-x-2">
                    <label className="font-medium">Status:</label>
                    <SwitchButton isOn={status} handleToggle={handleToggleSwitch} />
                </div>
                <button
                    onClick={onBack}
                    className="w-32 px-6 py-3 bg-gray-300 rounded-full hover:bg-gray-400"
                >
                    Geri Git
                </button>
                <button
                    onClick={handleSave}
                    className="w-32 px-6 py-3 bg-gray-300 rounded-full shadow-md hover:bg-gray-400"
                >
                    Kaydet
                </button>
            </div>
        </div>
    );
};

const VideoCollection = () => {
    const location = useLocation();
    const { userData = [], title = 'Video Collection', questions = [], userNotes = [], userStatus = [] } = location.state || {};
    const [selectedVideo, setSelectedVideo] = useState(null);
    console.log("userStatus:", userStatus);




    const handleCardClick = (videoData, note, userStatus) => {
        const videoQuestions = questions; // Assume all questions are related for now
        setSelectedVideo({ ...videoData, questions: videoQuestions, note, userStatus });
        console.log("Clicked videoData with questions:", { ...videoData, questions: videoQuestions, note, userStatus });


    };

    const handleBack = () => {
        setSelectedVideo(null);
    };

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-6">{title}</h1>
            {selectedVideo ? (
                <VideoDetail videoData={selectedVideo} onBack={handleBack} />
            ) : (
                <div className="flex flex-wrap justify-center">
                    {userData.map((user, index) => (
                        <VideoCard
                            key={index}
                            name={user.name}
                            surname={user.surname}
                            videoUrl={user.videoUrl}
                            note={userNotes[index]} // Pass the corresponding note
                            status={userStatus[index]?.status || 'inactive'} // Pass corresponding status
                            onClick={() => handleCardClick(user, userNotes[index], userStatus[index].status)} // Pass note when clicked

                        />
                    ))}
                </div>
            )}
        </div>
    );
};

const SwitchButton = ({ isOn, handleToggle }) => (
    <div
        className={`w-12 h-6 flex items-center bg-gray-300 rounded-full p-1 cursor-pointer ${isOn ? 'bg-green-500' : 'bg-gray-300'
            }`}
        onClick={handleToggle}
    >
        <div
            className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ${isOn ? 'translate-x-6' : 'translate-x-0'
                }`}
        ></div>
    </div>
);

const PopupSwitchNotification = () => {
    const { saveStatus, setSaveStatus } = useUserStore();
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (saveStatus) {
            setVisible(true);
            const timer = setTimeout(() => {
                setVisible(false);
                setSaveStatus(null);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [saveStatus, setSaveStatus]);

    if (!saveStatus) return null;

    return (
        <div
            className={`fixed top-4 right-4 p-4 bg-white rounded-lg shadow-lg transition-opacity duration-500 ${visible ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
        >
            <div className="flex items-center space-x-2">
                {saveStatus === 'success' ? (
                    <>
                        <MdOutlineVerified className="text-green-500 text-3xl" />
                        <p className="text-2xl font-medium text-green-500">Successfully saved</p>
                    </>
                ) : (
                    <>
                        <MdOutlineError className="text-red-500 text-3xl" />
                        <p className="text-2xl font-medium text-red-500">Save failed</p>
                    </>
                )}
            </div>
        </div>
    );
};

export default VideoCollection;