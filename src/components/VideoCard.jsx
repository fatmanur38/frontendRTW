import React from 'react';
import { useLocation } from 'react-router-dom';

const VideoCard = ({ name, surname, videoUrl }) => (
    <div className="bg-white shadow-md rounded-lg p-4 w-[250px] h-[180px] flex flex-col items-center m-4">
        <div className="bg-gray-200 w-full h-full rounded-lg flex items-center justify-center relative">
            <a href={videoUrl} target="_blank" rel="noopener noreferrer" className="w-full h-full flex items-center justify-center">
                <span className="text-5xl text-gray-500">▶️</span>
            </a>
        </div>
        <h3 className="text-center font-semibold mt-2">{name} {surname}</h3>
        <h3 className="text-center font-semibold"></h3>
    </div>
);

const VideoCollection = () => {
    const location = useLocation();
    const { userData } = location.state || { userData: [] }; // Get userData from location state

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-6">Backend Interview Video Collection</h1>
            <div className="flex flex-wrap justify-center">
                {userData.map((user, index) => (
                    <VideoCard key={index} name={user.name} surname={user.surname} videoUrl={user.videoUrl} />
                ))}
            </div>
            <button className="mt-6 px-6 py-2 bg-gray-300 rounded-lg shadow-md hover:bg-gray-400">
                Save
            </button>
        </div>
    );
};

export default VideoCollection;