import { Box } from "@mui/material";
import NavBar from "../../components/NavBar";
import ChatComponent from "../../components/Chat";

// MOCK DATA
const currentUser = {
  id: 1,
  name: "Current User",
};

const users = [
  {
    id: 2,
    name: "John Doe",
    lastMessage: "Hello there!",
    time: "12:30",
  },
  {
    id: 3,
    name: "Jane Smith",
    lastMessage: "How are you?",
    time: "11:45",
  },
];

const messages = [
  {
    id: 1,
    senderId: 1,
    receiverId: 2,
    content: "Hey John!",
    timestamp: "12:28",
  },
  {
    id: 2,
    senderId: 2,
    receiverId: 1,
    content: "Hello there!",
    timestamp: "12:30",
  },
];

const Messaging = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#393939",
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
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: "1200px",
            height: "80vh",
            borderRadius: 2,
          }}
        >
          <ChatComponent
            currentUser={currentUser}
            users={users}
            messages={messages}
            onSendMessage={(message, receiverId) =>
              console.log("New message:", message, "To:", receiverId)
            }
            onUserSelect={(user) => console.log("Selected user:", user)}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Messaging;
