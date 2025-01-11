import { SxProps, Theme } from "@mui/material";

export const tryoutsStyles = {
  container: {
    width: { xs: "90%", sm: "500px", md: "632px" },
    minWidth: "300px",
    maxWidth: "632px",
    height: "auto",
    border: "none",
    borderRadius: 2,
  },

  cardContent: {
    p: 2,
  },

  headerBox: {
    mb: 2,
  },

  headerText: {
    fontWeight: "bold",
    letterSpacing: "0.5px",
  },

  tryoutsList: {
    display: "flex",
    flexDirection: "column",
    gap: 1,
  },

  tryoutItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
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

  tryoutInfo: {
    display: "flex",
    gap: 2,
    "& > div": {
      display: "flex",
      alignItems: "center",
    },
  },

  clubName: {
    color: "white",
    fontWeight: "bold",
  },

  infoLabel: {
    color: "rgba(255, 255, 255, 0.6)",
    marginRight: "4px",
  },
  infoValue: {
    color: "white",
  },

  description: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: "0.875rem",
  },

  applyButton: {
    color: "primary.main",
    borderColor: "primary.main",
    padding: "8px 16px",
    borderRadius: 1,
    textTransform: "none",
    minWidth: "80px",
    transition: "all 0.2s ease-in-out",
    "&:hover": {
      backgroundColor: "primary.main",
      borderColor: "primary.main",
      color: "common.black",
      opacity: 1,
    },
  },

  appliedButton: {
    color: "success.main",
    borderColor: "success.main",
    padding: "8px 16px",
    borderRadius: 1,
    textTransform: "none",
    minWidth: "80px",
    cursor: "default",
    "&:hover": {
      backgroundColor: "transparent",
      borderColor: "success.main",
      color: "success.main",
    },
  },

  link: {
    color: "primary.light",
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
} as const;

// Type for style keys
export type TryoutStyleKeys = keyof typeof tryoutsStyles;

// Helper function to get styles
export const getStyle = (key: TryoutStyleKeys): SxProps<Theme> =>
  tryoutsStyles[key];
