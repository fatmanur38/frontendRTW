import React, { useEffect } from "react";
import { FaTrash, FaPen } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import useQuestionPackageStore from "../Stores/ManageQuestionPackages/ManageQuestionPackagesStore";
import { useNavigate, useLocation } from "react-router-dom";

const ManageQuestionPackages = () => {
    const {
        questionPackages,
        fetchQuestionPackages,
        deleteQuestionPackage,
        isLoading,
        error,
    } = useQuestionPackageStore();

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        fetchQuestionPackages();
    }, [fetchQuestionPackages, location.pathname]);

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this package?")) {
            deleteQuestionPackage(id);
        }
    };

    const handleEdit = (id) => {
        navigate(`/manage/${id}`);
    };

    const handleAdd = () => {
        navigate("/manage/new");
    };

    return (
        <div className="flex min-h-screen bg-light-green-100">
            <div className="flex-1 p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-xl font-bold mb-4" style={{ color: '#317471' }}>Manage Question Package</h1>
                    <IoMdAdd
                        className="text-4xl cursor-pointer hover:bg-yellow-200 transition-all duration-300" // Lighter yellow with transition
                        style={{ color: '#317471' }}
                        onClick={handleAdd}
                    />
                </div>

                {isLoading && <p>Loading...</p>}
                {error && <p className="text-red-500">{error}</p>}

                <table className="w-full bg-white rounded-md shadow-md">
                    <thead className="bg-green-400">
                        <tr>
                            <th className="p-2 text-left" style={{ color: '#317471' }}>#</th>
                            <th className="p-2 text-left" style={{ color: '#317471' }}>Package Name</th>
                            <th className="p-2 text-left" style={{ color: '#317471' }}>Question Count</th>
                            <th className="p-2 text-left" style={{ color: '#317471' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {questionPackages.map((packageData, index) => (
                            <tr
                                key={packageData._id}
                                className="border-t hover:bg-green-100 transition-colors duration-200"
                            >
                                <td className="p-2 text-lg" style={{ color: '#317471' }}>{index + 1}</td>
                                <td className="p-2 text-lg" style={{ color: '#317471' }}>{packageData.title}</td>
                                <td className="p-2 text-lg" style={{ color: '#317471' }}>{packageData.questionCount}</td>
                                <td className="p-2">
                                    <button
                                        className="text-green-500 text-lg mr-4 hover:text-green-700 hover:animate-spinSlow"
                                        onClick={() => handleEdit(packageData._id)}
                                    >
                                        <FaPen />
                                    </button>
                                    <button
                                        className="text-yellow-400 text-lg hover:text-yellow-600 hover:animate-shake"
                                        onClick={() => handleDelete(packageData._id)}
                                    >
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageQuestionPackages;