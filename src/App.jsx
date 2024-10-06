import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import QuestionPackages from './components/QuestionPackages';
import ManageQuestionPackages from './pages/QuestionManagePage';
import EditSinglePackage from './components/EditSinglePackage';

function App() {
  return (
    <Router>
      <div className="flex min-h-screen bg-gray-100">
        {/* Sidebar */}
        <div className="w-64 bg-gray-800 text-white flex flex-col">
          <div className="p-4 text-xl font-bold">Admin Panel</div>
          <ul className="p-2 space-y-4">
            <li>
              <a
                href="/manage"
                className="block text-left transition duration-300 ease-in-out pl-2 transform hover:scale-105 hover:text-yellow-300"
              >
                Manage Question Package
              </a>
            </li>
            <li>
              <a
                href="/interview"
                className="block text-left transition duration-300 ease-in-out pl-2 transform hover:scale-105 hover:text-yellow-300"
              >
                Interview List
              </a>
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-4 border-b-2 border-gray-300 pb-4">
            <h1 className="text-xl font-semibold">Remote-Tech Admin Page</h1>
            <button className="bg-emerald-500 hover:bg-emerald-400 text-white px-4 py-2 rounded-md">Log Out</button>
          </div>

          {/* Dynamic Content */}
          <Routes>
            <Route path="/manage" element={<QuestionPackages />} />
            <Route path="/question-packages" element={<ManageQuestionPackages />} />
            <Route path="/manage/:id" element={<EditSinglePackage />} /> {/* Route for editing a single package */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;