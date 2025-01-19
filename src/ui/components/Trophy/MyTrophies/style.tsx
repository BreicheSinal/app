const myTryoutsStyles = {
  container: {
    width: "315px",
    minWidth: "315px",
    height: "fit-content",
    border: "none",
    borderRadius: 2,
    mt: 1,
    mr: 0.8,
  },
  cardContent: {
    p: 1.5,
    ml: 1,
    mr: 1,
  },
  headerBox: {
    mb: 1.5,
  },
  headerText: {
    fontWeight: "bold",
    letterSpacing: "0.5px",
  },
  tryoutsList: {
    display: "flex",
    flexDirection: "column",
  },
  tryoutItem: {
    display: "flex",
    flexDirection: "column",
    bgcolor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 1,
    p: 1,
    transition: "background-color 0.2s ease-in-out",
    "&:hover": {
      bgcolor: "rgba(255, 255, 255, 0.08)",
    },
  },
  tryoutContent: {
    display: "flex",
    flexDirection: "column",
    gap: 1,
  },
  clubName: {
    color: "white",
    fontWeight: "bold",
  },
  infoLabel: {
    color: "rgba(255, 255, 255, 0.6)",
    marginRight: "4px",
    fontSize: "0.875rem",
  },
  infoValue: {
    color: "white",
    fontSize: "0.875rem",
  },
  description: {
    color: "white",
    fontSize: "0.875rem",
  },
  link: {
    ml: 1,
    color: "primary.main",
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  status: {
    fontSize: "0.875rem",
    fontWeight: "medium",
    mt: 1,
  },
} as const;

// Helper function to get styles
export const getStyle = (key: keyof typeof myTryoutsStyles) =>
  myTryoutsStyles[key];

const STATUS_MAP = {
  0: "PENDING",
  1: "APPROVED",
  2: "REJECTED",
} as const;

const isValidStatus = (status: number): status is 0 | 1 | 2 => {
  return [0, 1, 2].includes(Number(status));
};

export const getStatusColor = (status: number) => {
  const numericStatus = Number(status);

  if (!isValidStatus(numericStatus)) {
    console.warn(`Invalid status value received: ${status}`);
  }

  switch (numericStatus) {
    case 1:
      return "#4caf50";
    case 2:
      return "#f44336";
    case 0:
      return "#ffa726";
    default:
      return "#ffa726"; 
  }
};

// Function to get status text from number
export const getStatusText = (status: number): string => {
  return STATUS_MAP[status as keyof typeof STATUS_MAP] || "Unknown";
};
