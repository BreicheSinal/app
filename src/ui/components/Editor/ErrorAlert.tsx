import { FC } from "react";
import { Alert, AlertTitle, IconButton, Portal, Box } from "@mui/material";
import { Error as ErrorIcon, Close as CloseIcon } from "@mui/icons-material";

interface ErrorAlertProps {
  message: string;
  onClose?: () => void;
}

const alertStyles = {
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    zIndex: 1300,
  },
  alert: {
    backgroundColor: "#2C1F24",
    color: "#EFA6A6",
    border: "1px solid #803434",
    maxWidth: "80%",
    minWidth: "300px",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
    "& .MuiAlert-icon": {
      color: "#F87171",
    },
    "& .MuiAlert-message": {
      width: "100%",
    },
    "& .MuiAlert-action": {
      paddingTop: 0,
      color: "#EFA6A6",
    },
    "& .MuiIconButton-root:hover": {
      backgroundColor: "rgba(239, 166, 166, 0.08)",
    },
  },
  title: {
    color: "#F87171",
    fontWeight: 600,
  },
};

const ErrorAlert: FC<ErrorAlertProps> = ({ message, onClose }) => {
  return (
    <Portal>
      <Box sx={alertStyles.overlay}>
        <Alert
          severity="error"
          icon={<ErrorIcon />}
          sx={alertStyles.alert}
          action={
            onClose && (
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={onClose}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            )
          }
        >
          <AlertTitle sx={alertStyles.title}>Error</AlertTitle>
          {message}
        </Alert>
      </Box>
    </Portal>
  );
};

export default ErrorAlert;
