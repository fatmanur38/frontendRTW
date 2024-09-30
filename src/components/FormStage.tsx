import React, { useState } from 'react';

const FormStage = ({ onNext }: { onNext: () => void }) => {
  const [formData, setFormData] = useState({ name: '', position: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate and save data, then move to next stage
    onNext();
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Stage 1: Candidate Information</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="border p-2 w-full"
          type="text"
          placeholder="Candidate Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <input
          className="border p-2 w-full"
          type="text"
          placeholder="Position"
          value={formData.position}
          onChange={(e) => setFormData({ ...formData, position: e.target.value })}
          required
        />
        <button className="bg-blue-500 text-white px-4 py-2" type="submit">
          Next
        </button>
      </form>
    </div>
  );
};

export default FormStage;