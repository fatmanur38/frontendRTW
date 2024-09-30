import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminPanel from './components/AdminPanel';  // Import the AdminPanel component
import InterviewPage from './components/InterviewPage';  // Import the InterviewPage component
import Dashboard from './components/DashBoard';  // Assuming you have a dashboard or a home page

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} /> {/* Default home or dashboard page */}
        <Route path="/admin" element={<AdminPanel />} /> {/* Admin panel route */}
        <Route path="/interview" element={<InterviewPage />} /> {/* Video interview route */}
      </Routes>
    </Router>
  );
};

export default App;