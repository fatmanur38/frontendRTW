import React, { useState, useRef, useEffect } from 'react';
import { useTimer } from 'react-timer-hook';
import ProgressBar from 'react-bootstrap/ProgressBar';

const questionsData = [
    { question: "What is caching?", time: 120 },
    { question: "Can you explain Big-O notation?", time: 180 },
    { question: "What is JWT?", time: 90 },
];

const CandidateInterview = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [progress, setProgress] = useState(0);
    const [isRecording, setIsRecording] = useState(false);
    const [mediaRecorder, setMediaRecorder] = useState(null);
    const [videoBlobUrl, setVideoBlobUrl] = useState(null);
    const videoRef = useRef(null);
    const streamRef = useRef(null);

    const totalQuestions = questionsData.length;
    const currentQuestion = questionsData[currentQuestionIndex];

    const time = new Date();
    time.setSeconds(time.getSeconds() + currentQuestion.time);

    const { seconds, minutes, start, restart } = useTimer({
        expiryTimestamp: time,
        onExpire: () => handleNextQuestion(),
    });

    useEffect(() => {
        // Ask for camera and mic permissions when component mounts
        async function requestPermissions() {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
                videoRef.current.srcObject = stream;
                streamRef.current = stream;
            } catch (error) {
                console.error("Error accessing camera/microphone:", error);
            }
        }
        requestPermissions();
    }, []);

    const handleNextQuestion = () => {
        if (currentQuestionIndex < totalQuestions - 1) {
            setCurrentQuestionIndex((prev) => prev + 1);
            updateProgress();
            const nextTime = new Date();
            nextTime.setSeconds(nextTime.getSeconds() + questionsData[currentQuestionIndex + 1].time);
            restart(nextTime);
        } else {
            alert("Interview Completed!");
        }
    };

    const updateProgress = () => {
        const progressPercentage = ((currentQuestionIndex + 1) / totalQuestions) * 100;
        setProgress(progressPercentage);
    };

    const handleStartStopRecording = () => {
        if (!isRecording) {
            startRecording();
        } else {
            stopRecording();
        }
        setIsRecording(!isRecording);
    };

    const startRecording = () => {
        if (!streamRef.current) {
            console.error('Stream not initialized.');
            return;
        }

        const mediaRecorder = new MediaRecorder(streamRef.current, { mimeType: 'video/webm' });

        mediaRecorder.ondataavailable = (event) => {
            if (event.data.size > 0) {
                const videoBlob = new Blob([event.data], { type: 'video/webm' });
                const videoUrl = URL.createObjectURL(videoBlob);
                setVideoBlobUrl(videoUrl);
            }
        };

        mediaRecorder.start();
        setMediaRecorder(mediaRecorder);
    };

    const stopRecording = () => {
        if (mediaRecorder) {
            mediaRecorder.stop();
            // Automatically download the video when recording stops
            if (videoBlobUrl) {
                downloadRecording(videoBlobUrl);
            }
        }
    };

    const downloadRecording = (videoUrl) => {
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = videoUrl;
        a.download = 'interview-recording.webm'; // Save as webm
        document.body.appendChild(a);
        a.click();
        URL.revokeObjectURL(videoUrl);
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-100 p-6">
            <div className="mb-6">
                <ProgressBar now={progress} label={`${Math.round(progress)}%`} />
            </div>

            <div className="flex">
                {/* Left Side: Candidate Camera View */}
                <div className="w-2/3 p-4 bg-white rounded-md shadow-md mr-4">
                    <h2 className="text-xl font-bold mb-4">Candidate Camera</h2>
                    <video
                        ref={videoRef}
                        autoPlay
                        muted
                        className="bg-black w-full h-80"
                    ></video>
                </div>

                {/* Right Side: Question Section */}
                <div className="w-1/3 p-4 bg-white rounded-md shadow-md">
                    <div className="mb-4">
                        <h3 className="text-lg font-bold">Question Timer</h3>
                        <p>
                            {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
                        </p>
                    </div>

                    <div className="mb-4">
                        <h3 className="text-lg font-bold">Current Question</h3>
                        <p>{currentQuestion.question}</p>
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-between">
                        <button
                            className="bg-gray-400 text-white px-4 py-2 rounded-md"
                            onClick={handleNextQuestion}
                        >
                            Skip
                        </button>
                        <button
                            className={`bg-${isRecording ? 'red-500' : 'emerald-500'} hover:bg-${isRecording ? 'red-400' : 'emerald-400'
                                } text-white px-4 py-2 rounded-md`}
                            onClick={handleStartStopRecording}
                        >
                            {isRecording ? 'Stop' : 'Start'} Recording
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CandidateInterview;