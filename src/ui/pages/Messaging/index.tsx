import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import NavBar from "../../components/NavBar";
import ChatComponent from "../../components/Chat";
import { RootState } from "../../../redux/store";
import { getStoredRole } from "../../../core/utils/globalUtils";
import { useChat } from "../../../core/hooks/chatHook";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import { useState } from "react";

const Messaging = () => {
  const [showError, setShowError] = useState(true);
  const roleCurrentUser = getStoredRole();
  const currentUser = useSelector((state: RootState) => {
    switch (roleCurrentUser) {
      case "Athlete":
        return state.athlete.details;
      case "Coach":
        return state.coach.details;
      case "Club":
        return state.club.details;
      case "Federation":
        return state.federation.details;
      default:
        return null;
    }
  });

  const {
    users = [],
    messages = [],
    loading,
    error,
    sendMessage,
    selectUser,
  } = useChat(currentUser?.user_id || 0);

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#393939" }}>
      <NavBar />

      {error && showError && (
        <Box
          sx={{
            position: "fixed",
            top: 20,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 1100,
            width: "auto",
            maxWidth: "90%",
          }}
        >
          <Alert
            severity="error"
            onClose={() => setShowError(false)}
            sx={{ boxShadow: 3 }}
          >
            {error}
          </Alert>
        </Box>
      )}

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          p: 2,
          position: "relative",
          mt: 4,
        }}
      >
        {loading && (
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 1000,
            }}
          >
            <CircularProgress />
          </Box>
        )}

        <Box sx={{ width: "100%", maxWidth: "1200px" }}>
          <ChatComponent
            currentUser={{
              id: currentUser?.user_id || 0,
              name: currentUser?.name || "",
              avatar: currentUser?.avatar || "",
            }}
            users={users}
            messages={messages}
            onSendMessage={(message, receiverId) => {
              const chat = users.find((u) => u.id === receiverId);
              if (chat) {
                sendMessage(message, chat.chatID!);
              }
            }}
            onUserSelect={(user) => {
              const chatUser = users.find((u) => u.id === user.id);
              if (chatUser) {
                selectUser(chatUser);
              }
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Messaging;
