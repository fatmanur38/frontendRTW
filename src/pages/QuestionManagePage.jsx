import React, { useEffect } from "react";
import { FaTrash, FaPen } from "react-icons/fa";
import useQuestionPackageStore from "../Stores/ManageQuestionPackages/ManageQuestionPackagesStore";
import { useNavigate } from "react-router-dom";

const ManageQuestionPackages = () => {
    const {
        questionPackages,
        fetchQuestionPackages,
        deleteQuestionPackage,
        isLoading,
        error,
    } = useQuestionPackageStore();

    const navigate = useNavigate();


    useEffect(() => {
        fetchQuestionPackages();
    }, [fetchQuestionPackages]);

    // Handle delete when trash icon is clicked
    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this package?")) {
            deleteQuestionPackage(id);
        }
    };

    // Handle edit when pen icon is clicked
    const handleEdit = (id) => {
        navigate(`/manage/${id}`); // Navigate to the edit page
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            <div className="flex-1 p-6">
                <h1 className="text-xl font-bold mb-4">Manage Question Package</h1>

                {isLoading && <p>Loading...</p>}
                {error && <p className="text-red-500">{error}</p>}

                <table className="w-full bg-white rounded-md shadow-md">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="p-2 text-left">#</th>
                            <th className="p-2 text-left">Package Name</th>
                            <th className="p-2 text-left">Question Count</th>
                            <th className="p-2 text-left">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {questionPackages.map((packageData, index) => (
                            <tr key={packageData._id} className="border-t">
                                <td className="p-2">{index + 1}</td>
                                <td className="p-2">{packageData.title}</td>
                                <td className="p-2">{packageData.questionCount}</td>
                                <td className="p-2">
                                    <button
                                        className="text-blue-500 mr-4"
                                        onClick={() => handleEdit(packageData._id)}
                                    >
                                        <FaPen />
                                    </button>
                                    <button
                                        className="text-red-500"
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