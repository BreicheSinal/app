import { useEffect, useState, FC } from "react";
import {
  Card,
  CardContent,
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { requestApi } from "../../../core/utils/request";

interface UserData {
  id: number;
  name: string;
  role: string;
}

interface Connection {
  status: string;
  user: UserData;
  connectedUser: UserData;
}

interface TransformedConnection {
  id: number;
  name: string;
  role: string;
}

interface ConnectionsCardProps {
  currentUserId: number;
}

const ConnectionsCard: FC<ConnectionsCardProps> = ({ currentUserId }) => {
  const navigate = useNavigate();
  const [connections, setConnections] = useState<TransformedConnection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConnections = async () => {
      try {
        const response = await requestApi(`/user/accepted/${currentUserId}`);
        
        if (!response) {
          setConnections([]);
          return;
        }
  
        const transformedConnections = response.connections.map(
          (conn: Connection) => {
            const otherUser =
              conn.user.id == currentUserId ? conn.connectedUser : conn.user;
            return {
              id: otherUser.id,
              name: otherUser.name,
              role: otherUser.role,
            };
          }
        );
  
        setConnections(transformedConnections);
      } catch (error) {
        console.error("Error fetching connections:", error);
        setConnections([]); 
      } finally {
        setLoading(false);
      }
    };
  
    fetchConnections();
  }, [currentUserId]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: 200,
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box className="Box flex align-start">
      <Card
        className="Card secondary-bg-color"
        sx={{
          width: { xs: "90%", sm: 300, md: 300 },
          minWidth: "300px",
          maxWidth: "615px",
          height: "auto",
          border: "none",
          borderRadius: 2,
        }}
      >
        <CardContent sx={{ p: 1 }}>
          <Typography
            variant="h6"
            className="tertiary-color"
            sx={{ fontWeight: "bold", letterSpacing: "0.5px", mb: 1 }}
          >
            CONNECTIONS
          </Typography>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {connections.length > 0 ? (
              connections.map((user, idx) => (
                <Box
                  key={user.id}
                  onClick={() => navigate(`/view/${user.id}/${user.role}`)}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                    borderBottom:
                      idx === connections.length - 1
                        ? "none"
                        : "1px solid rgba(255, 255, 255, 0.2)",
                    cursor: "pointer",
                    "&:hover": {
                      bgcolor: "rgba(255, 255, 255, 0.05)",
                    },
                    padding: "8px",
                    margin: "0 -8px",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{ color: "#fff", fontSize: "14px" }}
                    >
                      {user.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#fff",
                        opacity: 0.7,
                        textAlign: "right",
                      }}
                    >
                      {user.role}
                    </Typography>
                  </Box>
                </Box>
              ))
            ) : (
              <Typography
                variant="body1"
                sx={{ color: "#fff", fontSize: "14px" }}
              >
                No connections found
              </Typography>
            )}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ConnectionsCard;
