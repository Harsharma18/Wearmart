
import { useSelector } from 'react-redux';
import { useGetOrderByEmailsQuery } from '../../../redux/Orders/Orderapi';
import { Link } from 'react-router-dom';

function UserOrder() {
  const { user } = useSelector((state) => state.auth);
  const {
    data: orderData,
    isLoading,
    isError,
  } = useGetOrderByEmailsQuery(user?.email);

  const orders = orderData?.orders;

  if (isLoading) return <div className="text-center py-10 text-gray-500">Loading...</div>;
  if (isError || !orders?.length) return <div className="text-center py-10 text-red-500">No order found!</div>;

  return (
    <section className="py-6 px-4 md:px-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-gray-700">Your Orders</h3>
          <button className="bg-indigo-600 text-white text-sm font-medium px-4 py-1.5 rounded hover:bg-indigo-700 transition">
            See all
          </button>
        </div>

      
        <div className="space-y-4 md:hidden">
          {orders.map((order, index) => (
            <div key={index} className="bg-white p-4 shadow rounded-lg">
              <div className="text-sm text-gray-700 mb-2">#{index + 1}</div>
              <div className="text-sm"><strong>Order ID:</strong> {order?.orderId}</div>
              <div className="text-sm"><strong>Date:</strong> {new Date(order?.createdAt).toLocaleDateString()}</div>
              <div className="text-sm">
                <strong>Status:</strong>{" "}
                <span className={`px-2 py-1 rounded text-xs font-medium 
                  ${order?.status === 'completed' ? 'bg-green-100 text-green-700'
                    : order?.status === 'pending' ? 'bg-red-100 text-red-700'
                    : order?.status === 'processing' ? 'bg-blue-100 text-blue-600'
                    : 'bg-indigo-100 text-indigo-600'
                  }`}>
                  {order?.status}
                </span>
              </div>
              <div className="text-sm"><strong>Total:</strong> ₹{order?.amount}</div>
              <div className="text-sm">
                <Link to={`/orders/${order?._id}`} className="text-indigo-600  hover:text-indigo-800">
                  View Order
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Table layout for medium and above screens */}
        <div className="hidden md:block  bg-white shadow rounded-lg overflow-hidden">
          <table className=" min-w-full text-sm text-center">
            <thead className="bg-gray-100  text-gray-600 uppercase text-xs">
              <tr>
                <th className="px-6 py-3">#</th>
                <th className="px-6 py-3">Order ID</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Total</th>
                <th className="px-6 py-3">View</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={index} className="border-t">
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4">{order?.orderId}</td>
                  <td className="px-6 py-4">{new Date(order?.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium 
                      ${order?.status === 'completed' ? 'bg-green-100 text-green-700'
                        : order?.status === 'pending' ? 'bg-red-100 text-red-700'
                        : order?.status === 'processing' ? 'bg-blue-100 text-blue-600'
                        : 'bg-indigo-100 text-indigo-600'
                      }`}>
                      {order?.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">₹{order?.amount}</td>
                  <td className="px-6 py-4">
                    <Link to={`/orders/${order?._id}`} className="text-indigo-600  hover:text-indigo-800">
                      View Order
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </section>
  );
}

export default UserOrder;
