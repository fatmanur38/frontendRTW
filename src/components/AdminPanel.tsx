import React, { useState } from 'react';

const AdminPanel = () => {
  const [questions, setQuestions] = useState([
    { id: 1, text: 'Tell us about yourself.', timeLimit: 60 },
    { id: 2, text: 'What are your strengths?', timeLimit: 90 },
  ]);
  const [newQuestion, setNewQuestion] = useState('');
  const [newTimeLimit, setNewTimeLimit] = useState(60);

  const handleAddQuestion = () => {
    setQuestions([...questions, { id: questions.length + 1, text: newQuestion, timeLimit: newTimeLimit }]);
    setNewQuestion('');
    setNewTimeLimit(60);
  };

  const handleDeleteQuestion = (id: number) => {
    setQuestions(questions.filter((q) => q.id !== id));
  };

  const handleSendInvitation = () => {
    // İşlem: Davet linki oluşturma ve adaya mail gönderme
    alert('Davet linki başarıyla oluşturuldu ve adaya gönderildi.');
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>

      {/* Soru Ekleme Alanı */}
      <div className="mb-6">
        <h2 className="font-semibold text-lg mb-4">Sorular</h2>
        <div className="space-y-4">
          {questions.map((question) => (
            <div key={question.id} className="flex justify-between items-center">
              <p>{question.text} ({question.timeLimit} saniye)</p>
              <button
                onClick={() => handleDeleteQuestion(question.id)}
                className="text-red-500 hover:text-red-600"
              >
                Sil
              </button>
            </div>
          ))}
        </div>

        {/* Yeni Soru Ekle */}
        <div className="mt-4">
          <input
            type="text"
            className="border p-2 mr-2 w-full md:w-auto rounded-md"
            placeholder="Yeni soru ekle"
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
          />
          <input
            type="number"
            className="border p-2 mr-2 w-24 rounded-md"
            placeholder="Süre (sn)"
            value={newTimeLimit}
            onChange={(e) => setNewTimeLimit(Number(e.target.value))}
          />
          <button
            onClick={handleAddQuestion}
            className="bg-green-500 text-white px-4 py-2 rounded-md"
          >
            Ekle
          </button>
        </div>
      </div>

      {/* Davet Linki Oluşturma */}
      <div>
        <button
          onClick={handleSendInvitation}
          className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-all duration-300"
        >
          Davet Linki Oluştur
        </button>
      </div>
    </div>
  );
};

export default AdminPanel;