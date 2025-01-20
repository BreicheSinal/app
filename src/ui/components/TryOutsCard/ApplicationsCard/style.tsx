const myApplicationsStyles = {
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
    p: 2,
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
  applicantItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    mb: 1,
  },
  athleteName: {
    color: "white",
    fontSize: "0.875rem",
  },
  buttonGroup: {
    display: "flex",
    gap: 0.5,
  },
  acceptButton: {
    color: "success.main",
    padding: "4px",
    "&:hover": {
      bgcolor: "rgba(76, 175, 80, 0.08)",
    },
  },
  rejectButton: {
    color: "error.main",
    padding: "4px",
    "&:hover": {
      bgcolor: "rgba(244, 67, 54, 0.08)",
    },
  },
  acceptedStatus: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  },
} as const;

export const getStyle = (key: keyof typeof myApplicationsStyles) =>
  myApplicationsStyles[key];
