import React, { useEffect, useState } from "react";
import { getBaseUrl } from "../../src/utils/baseUrl";
import { steps } from "../data/steps";
import Timeline from "./Timeline";

const PaymentSuccess = () => {
  const [order, setOrder] = useState(null);

  const fetchOrder = async () => {
    const sessionId = new URLSearchParams(window.location.search).get("session_id");

    if (sessionId) {
      try {
        const response = await fetch(`${getBaseUrl()}/api/order/confirm-payment`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ session_id: sessionId }),
        });

        const data = await response.json();
        setOrder(data.order);
      } catch (error) {
        console.error("Error confirming payment:", error);
      }
    }
  };

  useEffect(() => {
    fetchOrder();
  }, []);

  const isCompleted = (status) => {
    const statuses = ["pending", "processing", "shipped", "completed"];
    const stepIndex = statuses.indexOf(status);
    const currentIndex = statuses.indexOf(order?.status);
    return stepIndex < currentIndex;
  };

  const isCurrent = (currStatus) => order?.status === currStatus;

  if (!order) return <div className="p-4 text-center text-gray-500">Loading order details...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h1 className="text-2xl font-bold text-green-700 mb-4 flex items-center space-x-2">
        <span>✅</span> <span>Payment Success</span>
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8 text-gray-700 font-medium">
        <div>
          <p className="text-gray-500 text-sm uppercase">Order ID</p>
          <p>{order.orderId}</p>
        </div>
        <div>
          <p className="text-gray-500 text-sm uppercase">Email</p>
          <p>{order.email}</p>
        </div>
        <div>
          <p className="text-gray-500 text-sm uppercase">Amount Paid</p>
          <p className="text-lg font-semibold">${order.amount.toFixed(2)}</p>
        </div>
      </div>

      <div>
        <p className="mb-4 text-gray-700 font-semibold">
          Current Status: <span className="capitalize">{order.status}</span>
        </p>

        {/* Timeline container: vertical on mobile, horizontal on desktop */}
        <ol className="grid grid-cols-1  md:grid-cols-4 sm:space-x-6 space-y-8 sm:space-y-0">
          {steps.map((step, index) => (
            <Timeline
              key={index}
              step={step}
              order={order}
              isComplete={isCompleted(step.status)}
              isCurrent={isCurrent(step.status)}
              isLaststep={index === steps.length - 1}
              icon={step.icon}
            />
          ))}
        </ol>
      </div>
    </div>
  );
};

export default PaymentSuccess;
