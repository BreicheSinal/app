export const styles = {
  card: {
    width: { xs: "90%", sm: "500px", md: "620px" },
    minWidth: "300px",
    maxWidth: "620px",
    height: "auto",
    border: "none",
    borderRadius: 2,
    mb: 2,
  },

  title: {
    fontWeight: "bold",
    letterSpacing: "0.5px",
  },

  label: {
    color: "rgba(255, 255, 255, 0.7)",
    mb: 0.5,
    fontSize: "0.875rem",
    display: "flex",
    alignItems: "center",
    "& .required": {
      color: "#f44336",
      marginLeft: "4px",
    },
  },

  textField: {
    width: "100%",
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "rgba(255, 255, 255, 0.23)",
      },
      "&:hover fieldset": {
        borderColor: "rgba(255, 255, 255, 0.23)",
      },
    },
    "& .MuiInputBase-input": {
      color: "white",
    },
  },

  autocompletePopper: {
    "& .MuiPaper-root": {
      backgroundColor: "#1a1a1a",
      color: "white",
    },
    "& .MuiAutocomplete-listbox": {
      backgroundColor: "#1a1a1a",
      color: "white",
      "& .MuiAutocomplete-option": {
        color: "white",
        "&:hover": {
          backgroundColor: "rgba(255, 255, 255, 0.1)",
        },
        "&.Mui-focused": {
          backgroundColor: "rgba(255, 255, 255, 0.15)",
        },
      },
    },
  },

  autocompleteEndAdornment: {
    "& .MuiAutocomplete-endAdornment": {
      "& .MuiSvgIcon-root": {
        color: "white",
      },
    },
  },

  submitButton: {
    bgcolor: "primary.main",
    color: "white",
    "&:hover": {
      bgcolor: "primary.dark",
    },
    "&.Mui-disabled": {
      bgcolor: "#d3d3d3 !important",
      color: "#808080 !important",
    },
    padding: "8px",
  },
} as const;
