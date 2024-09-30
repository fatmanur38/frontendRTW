import React from 'react';

interface ProgressBarProps {
  currentStep: number; // Current active step
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep }) => {
  const steps = [
    { id: 1, name: 'Invitation received' },
    { id: 2, name: 'Personal details' },
    { id: 3, name: 'Application details' },
    { id: 4, name: 'Confirmation' },
  ];

  return (
    <div className="flex justify-between items-center mx-auto max-w-4xl pt-10">
      {steps.map((step, index) => (
        <div key={step.id} className="flex-1">
          <div className="flex items-center">
            <div
              className={`relative z-10 flex items-center justify-center w-10 h-10 rounded-full transition-colors duration-300 ${
                currentStep >= step.id
                  ? 'bg-green-500 text-white'
                  : 'bg-white border-2 border-gray-300 text-gray-500'
              }`}
            >
              {currentStep > step.id ? (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              ) : (
                <span>{step.id}</span>
              )}
            </div>

            {index !== steps.length - 1 && (
              <div
                className={`flex-grow h-1 transition-all duration-300 ${
                  currentStep > step.id
                    ? 'bg-green-500'
                    : 'bg-gray-300'
                }`}
              ></div>
            )}
          </div>
          <div className="text-center mt-2 text-sm">
            <span
              className={`transition-colors duration-300 ${
                currentStep >= step.id
                  ? 'text-green-500'
                  : 'text-gray-500'
              }`}
            >
              {step.name}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProgressBar;