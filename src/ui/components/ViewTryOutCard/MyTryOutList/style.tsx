const myTryoutsStyles = {
  container: {
    width: "315px",
    minWidth: "315px",
    height: "auto",
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
    color: "rgba(255, 255, 255, 0.7)",
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
    color: "success.main",
    fontSize: "0.875rem",
    fontWeight: "medium",
    mt: 1,
  },
} as const;

// Helper function to get styles
export const getStyle = (key: keyof typeof myTryoutsStyles) =>
  myTryoutsStyles[key];
