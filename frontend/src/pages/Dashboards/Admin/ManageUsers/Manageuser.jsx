
import React, { useState } from "react";
import {
  useDeleteUserMutation,
  useGetUserQuery,
} from "../../../../redux/Auth/authapi";
import { toast } from "react-hot-toast";
import UpdateUserrole from "./UpdateUserrole";
import { UserOrderSkeleton } from "../../../../components/DashboardSkelton";

function Manageuser() {
  const [ismodelOpen, setismodelOpen] = useState(false);
  const [selectUser, setselectUser] = useState(null);
  const { data: users = [], isLoading, isError, refetch } = useGetUserQuery();
  const [deleteUser] = useDeleteUserMutation();
     
  const handleDeleteUser = async (id) => {
    try {
      await deleteUser(id).unwrap();
      toast.error("User deleted successfully");
      refetch();
    } catch (error) {
      console.error("Failed to delete user", error);
    }
  };

  const handleEditUserrole = (user) => {
    setselectUser(user);
    setismodelOpen(true);
  };

  const handleClosemodel = () => {
    setismodelOpen(false);
    setselectUser(null);
  };
 if (isLoading) {
    return <UserOrderSkeleton/>;
  }
  return (
    <>
      <section className="py-4 px-2 sm:px-6 bg-blueGray-50">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">All Users</h3>

        {/* Table for Desktop */}
        <div className="hidden md:block">
          <div className="overflow-x-auto bg-white rounded shadow-md">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    No.
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Edit
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user, index) => (
                  <tr key={user._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          user.role === "admin"
                            ? "bg-indigo-500 text-white"
                            : "bg-yellow-300 text-black"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleEditUserrole(user)}
                        className="text-indigo-600 hover:text-indigo-900 flex items-center gap-1"
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleDeleteUser(user._id)}
                        className="text-red-600 hover:text-red-800 flex items-center gap-1"
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Card view for Mobile */}
        <div className="md:hidden   space-y-4 mt-4">
          {users.map((user, index) => (
            <div key={user._id} className="bg-white p-4 rounded-lg shadow-md">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-semibold">User #{index + 1}</span>
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    user.role === "admin"
                      ? "bg-indigo-500 text-white"
                      : "bg-yellow-300 text-black"
                  }`}
                >
                  {user.role}
                </span>
              </div>
              <p className="text-sm mb-2">
                <span className="font-medium text-gray-600">Email:</span>{" "}
                {user.email}
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => handleEditUserrole(user)}
                  className="flex items-center gap-1 text-indigo-600 hover:text-indigo-900"
                >
                                       <i className="fas fa-edit"></i>

                  
                </button>
                <button
                  onClick={() => handleDeleteUser(user._id)}
                  className="flex items-center gap-1 text-red-600 hover:text-red-800"
                >
                                       <i className="fas fa-trash"></i>

                  
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {ismodelOpen && (
        <UpdateUserrole
          selectUser={selectUser}
          onClose={handleClosemodel}
          onRoleUpdate={refetch}
        />
      )}
    </>
  );
}

export default Manageuser;
