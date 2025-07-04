import React, { useState } from "react";
import { useUpdateOrderstatusMutation } from "../../../../redux/Orders/Orderapi";
import {toast} from 'react-hot-toast';
function UpdateOrderStatus({ selectOrder, isOpen, onClose, OnStatusUpdate }) {
//   console.log("Selected order details", selectOrder);
  const [status, setStatus] = useState(selectOrder?.status);
  const [UpdateOrderStatus,{isLoading,isError}] = useUpdateOrderstatusMutation();
  const handleUpdateOrderStatus = async () => {
    try {
      const response = await UpdateOrderStatus({ id: selectOrder?._id, status });
    //   console.log("updated order status", response);
      toast.success("Order status update successfully");
      OnStatusUpdate();
      onClose();
    } catch (err) {
      console.error("Failed to update order status:", err);
    }
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                <h2 className="text-xl font-semibold mb-4">Update Order Status</h2>
                
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="status">Status</label>
                    <select
                        id="status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="border border-gray-300 p-2 rounded w-full"
                    >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>
                
                {isError && <p className="text-red-500 mb-4">Failed to update status.</p>}
                
                <div className="flex justify-end space-x-2">
                    <button
                        onClick={onClose}
                        className="bg-gray-300 cursor-pointer  text-gray-800 px-4 py-2 rounded"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleUpdateOrderStatus}
                        disabled={isLoading}
                        className="bg-blue-500 cursor-pointer  text-white px-4 py-2 rounded"
                    >
                        {isLoading ? 'Updating...' : 'Update'}
                    </button>
                </div>
            </div>
        </div>
  )
}

export default UpdateOrderStatus;
