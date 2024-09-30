import React, { useEffect, useRef, useState } from 'react';

const VideoStage = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);

  // Set up media stream and mute local audio feedback
  useEffect(() => {
    const getMedia = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.muted = true;  // Mute local audio feedback
      }
    };
    getMedia();
  }, []);

  const startRecording = () => {
    const stream = (videoRef.current!.srcObject as MediaStream);
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder;

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        setRecordedChunks((prev) => [...prev, event.data]);
      }
    };
    mediaRecorder.start();
    setIsRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
  };

  const downloadVideo = () => {
    const blob = new Blob(recordedChunks, { type: 'video/webm' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'recording.webm';
    a.click();
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg p-4 rounded-lg shadow-lg bg-gray-800 mb-6">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="w-full h-auto rounded-lg shadow-md"
        />
      </div>

      {/* Start/Stop Recording and Download Buttons */}
      <div className="space-x-4">
        {!isRecording ? (
          <button
            onClick={startRecording}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-all duration-300 shadow-md"
          >
            Start Recording
          </button>
        ) : (
          <button
            onClick={stopRecording}
            className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-all duration-300 shadow-md"
          >
            Stop Recording
          </button>
        )}
        {recordedChunks.length > 0 && (
          <button
            onClick={downloadVideo}
            className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-all duration-300 shadow-md"
          >
            Download Video
          </button>
        )}
      </div>
    </div>
  );
};

export default VideoStage;