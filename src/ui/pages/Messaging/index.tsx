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
    <div>
      <NavBar />
      <ChatComponent
        currentUser={currentUser}
        users={users}
        messages={messages}
        onSendMessage={(message, receiverId) =>
          console.log("New message:", message, "To:", receiverId)
        }
        onUserSelect={(user) => console.log("Selected user:", user)}
      />
    </div>
  );
};

export default Messaging;
