import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import NavBar from "../../components/NavBar";
import ChatComponent from "../../components/Chat";
import { RootState } from "../../../redux/store";
import { getStoredRole } from "../../../core/utils/globalUtils";
import { useChat } from "../../../core/hooks/chatHook";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";

const Messaging = () => {
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

  const formattedUsers = Array.isArray(users)
    ? users.map((user) => ({
        id: user.id,
        name: user.name,
        avatar: user.avatar,
        lastMessage:
          messages
            .filter((m) => m.chatID === user.chatID)
            .sort(
              (a, b) =>
                new Date(b.timestamp).getTime() -
                new Date(a.timestamp).getTime()
            )[0]?.content || "",
        time:
          messages
            .filter((m) => m.chatID === user.chatID)
            .sort(
              (a, b) =>
                new Date(b.timestamp).getTime() -
                new Date(a.timestamp).getTime()
            )[0]?.timestamp || "",
      }))
    : [];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#121212",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <NavBar />
      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 4,
          position: "relative",
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

        {error && (
          <Box sx={{ position: "absolute", top: 16, right: 16, zIndex: 1000 }}>
            <Alert severity="error" onClose={() => {}}>
              {error}
            </Alert>
          </Box>
        )}

        <Box sx={{ width: "100%", height: "calc(100vh - 150px)" }}>
          <ChatComponent
            currentUser={{
              id: currentUser?.user_id || 0,
              name: currentUser?.name || "",
              avatar: currentUser?.avatar || "",
            }}
            users={formattedUsers}
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
