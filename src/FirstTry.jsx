import React, { useEffect } from "react";
import useMeetingStore from "./Stores/FetchRoomData";  // Adjust the import path if necessary

const MyComponent = () => {
    // Destructure the values from useMeetingStore
    const { createMeeting, meetingData, loading, error } = useMeetingStore();

    return (
        <div>
            <button onClick={createMeeting}>Create Meeting</button>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {meetingData ? (
                <div>
                    <h2>Meeting Created!</h2>
                    <p>Room Name: {meetingData.roomName}</p>
                    <p>Meeting URL: {meetingData.roomUrl}</p>
                    <iframe
                        src={meetingData.roomUrl}
                        allow="camera; microphone; fullscreen; speaker; display-capture"
                        width="640"
                        height="480"
                        frameBorder="0"
                        title="Whereby Meeting"
                    ></iframe>
                </div>
            ) : (
                <p>No meeting created yet.</p>
            )}
        </div>
    );
};

export default MyComponent;