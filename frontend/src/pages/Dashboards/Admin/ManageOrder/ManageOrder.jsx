import React, { useState } from "react";
import {
  useDeleteOrderMutation,
  useGetAllOrdersQuery,
} from "../../../../redux/Orders/Orderapi";
import { toast } from "react-hot-toast";
import { UserOrderSkeleton } from "../../../../components/DashboardSkelton";
import UpdateOrderStatus from "./UpdateOrderStatus";
import moment from "moment";
import { Link } from "react-router-dom";

function ManageOrder() {
  const { data: orders, isLoading, isError, refetch } = useGetAllOrdersQuery();
  const [selectOrder, setselectOrder] = useState(null);
  const [ismodelOpen, setismodelOpen] = useState(false);
  const [deleteOrder] = useDeleteOrderMutation();

  const handleEditOrder = (order) => {
    setismodelOpen(true);
    setselectOrder(order);
  };

  const handleclosemodel = () => {
    setselectOrder(null);
    setismodelOpen(false);
  };

  const handleDeleteOrder = async (id) => {
    try {
      await deleteOrder(id).unwrap();
      toast.success("Order deleted successfully");
      refetch();
    } catch (err) {
      toast.error("Failed to delete order");
      console.error("Error deleting order:", err);
    }
  };

  if (isLoading) return <UserOrderSkeleton />;

  return (
    <>
      <section className="py-4 px-2 sm:px-6 bg-gray-50 min-h-screen">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">
          Manage Orders
        </h3>

        {/*  Table layout for Desktop View */}
        <div className="hidden md:block">
          <div className="overflow-x-auto bg-white rounded shadow-md">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">#</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orders.map((order, index) => (
                  <tr key={order?._id}>
                    <td className="px-6 py-4 text-sm">{index + 1}</td>
                    <td className="px-6 py-4 text-sm">{order?.email}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-block px-3 py-1 text-xs text-white rounded-full ${getStatusColor(order?.status)}`}>
                        {order?.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {moment(order?.updatedAt).isSame(order?.createdAt)
                        ? moment(order?.createdAt).format("MMM DD, YYYY hh:mm A")
                        : moment(order?.updatedAt).format("MMM DD, YYYY hh:mm A")}
                    </td>
                    <td className="px-6 py-4 space-x-4 text-sm">
                      <Link to={`/orders/${order?._id}`} className="text-indigo-600 hover:underline">View</Link>
                      <button onClick={() => handleEditOrder(order)} className="text-blue-600 hover:text-blue-900">
                        <i className="fas fa-edit" />
                      </button>
                      <button onClick={() => handleDeleteOrder(order?._id)} className="text-red-600 hover:text-red-800">
                        <i className="fas fa-trash" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/*  Card layout for Mobile View */}
        <div className="md:hidden space-y-4">
          {orders.map((order, index) => (
            <div key={order?._id} className="bg-white shadow-md rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-sm font-semibold text-gray-700">#{index + 1}</h4>
                <span className={`text-xs text-white px-2 py-1 rounded ${getStatusColor(order?.status)}`}>
                  {order?.status}
                </span>
              </div>

              <p className="text-sm text-gray-600 mb-1"><strong>Customer:</strong> {order?.email}</p>

              <p className="text-sm text-gray-600 mb-1">
                <strong>Date:</strong>{" "}
                {moment(order?.updatedAt).isSame(order?.createdAt)
                  ? moment(order?.createdAt).format("MMM DD, YYYY hh:mm A")
                  : moment(order?.updatedAt).format("MMM DD, YYYY hh:mm A")}
              </p>

              <div className="flex justify-between items-center mt-3">
                <Link to={`/orders/${order?._id}`} className="text-indigo-600 text-sm hover:underline">View</Link>
                <div className="flex gap-3">
                  <button onClick={() => handleEditOrder(order)} className="text-blue-600">
                    <i className="fas fa-edit" />
                  </button>
                  <button onClick={() => handleDeleteOrder(order?._id)} className="text-red-600">
                    <i className="fas fa-trash" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {selectOrder && (
        <UpdateOrderStatus
          OnStatusUpdate={refetch}
          selectOrder={selectOrder}
          isOpen={ismodelOpen}
          onClose={handleclosemodel}
        />
      )}
    </>
  );
}

export default ManageOrder;

const getStatusColor = (status) => {
  switch (status) {
    case "pending":
      return "bg-yellow-500";
    case "processing":
      return "bg-blue-500";
    case "shipped":
      return "bg-green-500";
    case "completed":
      return "bg-gray-500";
    default:
      return "bg-gray-300";
  }
};
