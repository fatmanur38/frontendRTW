import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './pages/sign-in/SignIn';
import ManageQuestionPackages from './pages/QuestionManagePage';
import EditSinglePackage from './components/EditSinglePackage';
import InterviewList from './pages/InterviewListPage';
import CandidateInterview from './pages/CandidateInterview/CandidateInterview';
import AdminLayout from './Layouts/AdminLayout';
import VideoCollection from './components/VideoCollection';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/signin" element={<SignIn />} />

        {/* Candidate interview route */}
        <Route path="/candidate/interview/:interviewLink" element={<CandidateInterview />} /> {/* Interview link route */}

        {/* Admin Routes with Admin Layout */}
        <Route element={<AdminLayout />}>
          <Route path="/manage-question-packages" element={<ManageQuestionPackages />} />
          <Route path="/manage/:id" element={<EditSinglePackage />} /> {/* Route for editing a single package */}
          <Route path="/interview-list" element={<InterviewList />} />
          <Route path="/video-collection" element={<VideoCollection />} /> {/* New route for Video Collection */}

        </Route>
      </Routes>
    </Router>
  );
}

export default App;