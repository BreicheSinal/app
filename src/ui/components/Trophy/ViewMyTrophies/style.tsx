const myTryoutsStyles = {
  container: {
    width: "628px",
    minWidth: "315px",
    height: "fit-content",
    border: "none",
    borderRadius: 2,
    ml: 1.2,
    mt: 1,
    mr: 0.8,
    bgcolor: "transparent",
    boxShadow: "none",
  },
  cardContent: {
    p: 1.5,
    ml: 1,
    mr: 1,
  },
  headerBox: {},
  headerText: {
    fontWeight: "bold",
    letterSpacing: "0.5px",
  },
  tryoutsList: {
    display: "flex",
    flexDirection: "column",
  },
  addButton: {
    color: "primary.main",
    "&:hover": {
      backgroundColor: "rgba(9, 132, 255, 0.08)",
    },
    "& .MuiSvgIcon-root": {
      fontSize: "1.2rem",
    },
  },
  trophyContent: {
    display: "flex",
    flexDirection: "column",
    pt: 1.5,
    pl: 1.5,
  },
  trophyName: {
    color: "white",
    fontSize: "0.925rem",
    fontWeight: "bold",
    mb: 0.5, 
  },
  trophyDescription: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: "0.875rem",
  },
  divider: {
    mt: 1.5,
    bgcolor: "rgba(255, 255, 255, 0.12)", 
  },
  infoValue: {
    color: "white",
    fontSize: "0.875rem",
  },
} as const;

// Helper function to get styles
export const getStyle = (key: keyof typeof myTryoutsStyles) =>
  myTryoutsStyles[key];
