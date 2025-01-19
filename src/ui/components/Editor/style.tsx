export const styles = {
  container: {
    display: "flex",
    height: "80vh",
    width: "80vw",
    backgroundColor: "#1a1a1a",
    overflow: "hidden",
    borderRadius: 2,
    boxShadow: 3,
    flexDirection: "column",
    p: 3,
    mt: 2,
    mb: 1,
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    mb: 2,
    borderBottom: "1px solid #3f3f46",
  },

  tabs: {
    minHeight: "48px",
    "& .MuiTabs-indicator": {
      backgroundColor: "#60a5fa",
    },
  },

  tab: {
    color: "#e4e4e7",
    minHeight: "48px",
    textTransform: "none",
    fontSize: "1rem",
    fontWeight: 500,
    "&.Mui-selected": {
      color: "#60a5fa",
    },
  },

  textField: {
    flex: 1,
    "& .MuiInputBase-root": {
      height: "100%",
      bgcolor: "#3f3f46",
      color: "#e4e4e7",
      fontSize: "1.1rem",
      "& fieldset": {
        borderColor: "#52525b",
      },
      "&:hover fieldset": {
        borderColor: "#60a5fa !important",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#60a5fa !important",
      },
    },
    "& .MuiInputBase-input": {
      height: "100% !important",
    },
    "& textarea": {
      height: "100% !important",
    },
  },

  processButton: {
    mb: 1,
    bgcolor: "#2563eb",
    "&:hover": {
      bgcolor: "#1d4ed8",
    },
    "&.Mui-disabled": {
      bgcolor: "#2563eb50",
    },
  },

  processedContent: {
    flex: 1,
    bgcolor: "#3f3f46",
    borderRadius: 1,
    p: 2,
    overflowY: "auto",
    border: "1px solid #52525b",
    "&::-webkit-scrollbar": {
      width: "8px",
    },
    "&::-webkit-scrollbar-track": {
      background: "#1a1a1a",
      borderRadius: "4px",
    },
    "&::-webkit-scrollbar-thumb": {
      background: "#404040",
      borderRadius: "4px",
      border: "2px solid #1a1a1a",
      "&:hover": {
        background: "#525252",
      },
    },
    scrollbarWidth: "thin",
    scrollbarColor: "#404040 #1a1a1a",
  },

  emptyState: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  processedText: {
    color: "#e4e4e7",
    fontSize: "1.1rem",
    whiteSpace: "pre-wrap",
  },
};
