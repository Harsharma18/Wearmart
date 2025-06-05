
import React, { useState } from "react";
import { useUpdateUserroleMutation } from "../../../../redux/Auth/authapi";
import toast from "react-hot-toast";

function UpdateUserrole({ selectUser, onClose, onRoleUpdate }) {
  const [role, setRole] = useState();
  const [updateUserrole] = useUpdateUserroleMutation();

  const handleEditRole = async () => {
    try {
  await updateUserrole({ userId: selectUser?._id, role }).unwrap();
  toast.success("Updated role successfully!");
  onRoleUpdate();
  onClose();
} catch (error) {
  console.error("Failed to update user role", error);
  toast.error("Something went wrong"); 
}

  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 py-6 sm:px-0">
      <div className="bg-white w-full max-w-md mx-auto rounded-lg shadow-lg p-6 sm:p-8 transform transition-all duration-300 scale-100">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Edit User Role
        </h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Email
          </label>
          <input
            type="email"
            value={selectUser?.email}
            readOnly
            className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-700 text-sm focus:outline-none"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Role
          </label>
          <select
            className="w-full px-4 py-2 border border-gray-300 bg-gray-50 rounded-md text-sm text-gray-700 focus:outline-none"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
          
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleEditRole}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default UpdateUserrole;
