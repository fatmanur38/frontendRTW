import React, { useState } from 'react';

const FormStage = ({ onNext }: { onNext: () => void }) => {
  const [formData, setFormData] = useState({ name: '', position: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Step 1: Candidate Information</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Candidate Name Input */}
          <div className="relative">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="name">
              Candidate Name
            </label>
            <input
              className="border-2 border-gray-300 p-3 w-full rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              type="text"
              id="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          {/* Position Input */}
          <div className="relative">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="position">
              Position
            </label>
            <input
              className="border-2 border-gray-300 p-3 w-full rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              type="text"
              id="position"
              placeholder="Enter your desired position"
              value={formData.position}
              onChange={(e) => setFormData({ ...formData, position: e.target.value })}
              required
            />
          </div>

          {/* Next Button */}
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full hover:bg-blue-600 transition-all duration-300 shadow-md"
            type="submit"
          >
            Next
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormStage;