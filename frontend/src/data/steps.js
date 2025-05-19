export const steps = [
  {
    status: "pending",
    label: "Pending",
    description: "Your order has been created and is awaiting processing.",
    icon: { iconName: "fa-clock", bgColor: "red-500", textColor: "gray-800" },
  },
  {
    status: "processing",
    label: "Processing",
    description: "Your order is currently being processed.",
    icon: {
      iconName: "fa-spinner",
      bgColor: "yellow-800",
      textColor: "yellow-800",
    },
  },
  {
    status: "shipped",
    label: "Shipped",
    description: "Your order has been shipped.",
    icon: { iconName: "fa-truck", bgColor: "blue-800", textColor: "blue-800" },
  },
  {
    status: "completed",
    label: "Completed",
    description: "Your order has been successfully completed.",
    icon: {
      iconName: "fa-check-circle",
      bgColor: "green-800",
      textColor: "green-900",
    },
  },
];
