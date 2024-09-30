import React, { useEffect, useState, useRef } from 'react';

const InterviewPage = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const questions = [
    { id: 1, text: 'Tell us about yourself.', timeLimit: 60 },
    { id: 2, text: 'What are your strengths?', timeLimit: 90 },
    { id: 3, text: 'Why do you want to work here?', timeLimit: 60 },
  ];

  useEffect(() => {
    if (isRecording) {
      setTimeRemaining(questions[currentQuestionIndex].timeLimit);

      const timer = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev === 1) {
            nextQuestion();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [currentQuestionIndex, isRecording]);

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Mülakat bittiğinde video kaydını bitir ve gönder
      stopRecording();
    }
  };

  const startRecording = () => {
    setIsRecording(true);
    // Video kaydı başlatma mantığı buraya eklenir
  };

  const stopRecording = () => {
    setIsRecording(false);
    // Video kaydı durdurma ve kaydetme mantığı buraya eklenir
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">Video Mülakat</h1>
      <div className="w-full max-w-lg p-4 rounded-lg shadow-lg bg-gray-800 mb-6">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="w-full h-auto rounded-lg shadow-md"
        />
      </div>

      <div className="bg-white p-4 rounded-lg shadow-lg text-center w-full max-w-md">
        <p className="text-xl font-bold mb-4">{questions[currentQuestionIndex].text}</p>
        <p>Kalan Süre: {timeRemaining} saniye</p>
      </div>

      <div className="mt-4">
        {!isRecording ? (
          <button
            onClick={startRecording}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-all duration-300 shadow-md"
          >
            Mülakata Başla
          </button>
        ) : (
          <button
            onClick={nextQuestion}
            className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-all duration-300 shadow-md"
          >
            Sonraki Soru
          </button>
        )}
      </div>
    </div>
  );
};

export default InterviewPage;