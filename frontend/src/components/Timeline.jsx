import moment from "moment";

function Timeline({ step, isComplete, isCurrent, isLaststep, icon, order }) {
  // Colors based on state
  const iconBgColor = isComplete || isCurrent ? "bg-blue-600" : "bg-gray-200";
  const iconTextColor = isComplete || isCurrent ? "text-white" : "text-gray-400";
  const connectorColor = isComplete ? "bg-blue-600" : "bg-gray-300";
  const labelTextColor = isComplete || isCurrent ? "text-gray-900 font-semibold" : "text-gray-500";
  const descriptionTextColor = isComplete || isCurrent ? "text-gray-700" : "text-gray-400";

  return (
    <li className="flex flex-col sm:flex-row items-start sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
      {/* Icon and connector */}
      <div className="flex items-center sm:flex-col sm:items-center">
        <div
          className={`${iconBgColor} ${iconTextColor} flex items-center justify-center w-10 h-10 rounded-full ring-2 ring-white shadow-md`}
        >
          <i className={`fas ${icon.iconName} text-lg`}></i>
        </div>

        {/* Connector line */}
        {!isLaststep && (
          <>
           
            <div
              className={`hidden   sm:flex h-1 w-full ${connectorColor}   mt-2 `}
             
            ></div>
          </>
        )}
      </div>

      {/* Text content */}
      <div className="max-w-xs text-start sm:text-left">
        <h3 className={`${labelTextColor} text-lg`}>{step.label}</h3>
        <time className="block text-sm text-gray-400 mt-1">
          {order?.updatedAt ? moment(order.updatedAt).format("MMMM DD YYYY, h:mm A") : "Time not available"}
        </time>
        <p className={`${descriptionTextColor} mt-2 text-sm`}>{step.description}</p>
      </div>
    </li>
  );
}

export default Timeline;
