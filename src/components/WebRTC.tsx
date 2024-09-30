import React, { useRef, useState } from 'react';

const VideoStage = ({ onNext }: { onNext: () => void }) => {
  const [isRecording, setIsRecording] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    if (videoRef.current) videoRef.current.srcObject = stream;

    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder;

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        setRecordedChunks((prev) => prev.concat(event.data));
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
    const blob = new Blob(recordedChunks, { type: 'video/mp4' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'interview.mp4';
    a.click();
  };

  return (
    <div>
      <h2 className="text-2xl font-bold">Stage 2: Video Recording</h2>
      <video ref={videoRef} autoPlay className="border w-full h-64"></video>
      <div className="space-x-4 mt-4">
        {isRecording ? (
          <button className="bg-red-500 text-white px-4 py-2" onClick={stopRecording}>
            Stop Recording
          </button>
        ) : (
          <button className="bg-blue-500 text-white px-4 py-2" onClick={startRecording}>
            Start Recording
          </button>
        )}
        <button className="bg-green-500 text-white px-4 py-2" onClick={downloadVideo}>
          Download Video
        </button>
        <button className="bg-blue-500 text-white px-4 py-2" onClick={onNext}>
          Next
        </button>
      </div>
    </div>
  );
};

export default VideoStage;