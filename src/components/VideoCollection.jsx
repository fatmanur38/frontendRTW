import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import useUserStore from '../Stores/useUserInterviewStore';
import { MdOutlineVerified } from 'react-icons/md';
import { MdOutlineError } from 'react-icons/md'; // Error icon

const VideoCard = ({ name, surname, videoUrl, onClick }) => (
    <div
        onClick={onClick}
        className="bg-white shadow-md rounded-lg p-4 w-[250px] h-[180px] flex flex-col items-center m-4 cursor-pointer"
    >
        <div className="bg-gray-200 w-full h-full rounded-lg flex items-center justify-center relative">
            <span className="text-5xl text-gray-500">▶️</span>
        </div>
        <h3 className="text-center font-semibold mt-2">
            {name} {surname}
        </h3>
    </div>
);

const VideoDetail = ({ videoData, onBack }) => {
    const { status, note, setStatus, setNote, saveData } = useUserStore();

    const handleSave = () => {
        saveData(videoData._id); // Pass the user's ID to the save function
    };

    return (
        <div className="bg-gray-50 shadow-md rounded-lg p-6 flex flex-col space-y-4">
            <PopupSwitchNotification isOn={status} handleToggle={() => setStatus(!status)} />

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
                        <h4 className="font-medium">Questions:</h4>
                        {videoData.question.map((q, index) => (
                            <p key={index} className="text-gray-600">- {q.question}</p>
                        ))}
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
                    <SwitchButton isOn={status} handleToggle={() => setStatus(!status)} />
                </div>

            </div>
            <div className="flex justify-between items-center mt-4">
                <button
                    onClick={onBack}
                    className="w-32 px-6 py-3 bg-gray-300 rounded-full hover:bg-gray-400"
                >
                    Back
                </button>
                <button
                    onClick={handleSave}
                    className="w-32 px-6 py-3 bg-gray-300 rounded-full shadow-md hover:bg-gray-400"
                >
                    Save
                </button>
            </div>
        </div>
    );
};
const VideoCollection = () => {
    const location = useLocation();
    const { userData } = location.state || { userData: [] };
    const [selectedVideo, setSelectedVideo] = useState(null);

    const handleCardClick = (videoData) => {
        setSelectedVideo(videoData);
    };

    const handleBack = () => {
        setSelectedVideo(null);
    };

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-6">Backend Interview Video Collection</h1>
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
                            onClick={() => handleCardClick(user)}
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
            // Show the popup
            setVisible(true);

            // Hide the popup after 3 seconds
            const timer = setTimeout(() => {
                setVisible(false);
                setSaveStatus(null); // Reset the save status after hiding
            }, 3000);

            // Cleanup timer on unmount
            return () => clearTimeout(timer);
        }
    }, [saveStatus, setSaveStatus]);

    if (!saveStatus) return null; // Don't render if there's no status

    return (
        <div
            className={`fixed top-4 right-4 p-4 bg-white rounded-lg shadow-lg transition-opacity duration-500 ${visible ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
        >
            <div className="flex items-center space-x-2">
                {saveStatus === 'success' ? (
                    <>
                        <MdOutlineVerified className="text-green-500 text-3xl" />
                        <p className="text-2xl font-medium text-green-500">Başarıyla kaydedildi</p>
                    </>
                ) : (
                    <>
                        <MdOutlineError className="text-red-500 text-3xl" />
                        <p className="text-2xl font-medium text-red-500">Kaydedilemedi</p>
                    </>
                )}
            </div>
        </div>
    );
};


export default VideoCollection;