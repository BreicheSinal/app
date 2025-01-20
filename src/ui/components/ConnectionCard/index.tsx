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

import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { getStoredRole } from "../../../core/utils/globalUtils";

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
  width: number;
}

const ConnectionsCard: FC<ConnectionsCardProps> = ({
  currentUserId,
  width = 250,
}) => {
  const navigate = useNavigate();
  const [connections, setConnections] = useState<TransformedConnection[]>([]);
  const [loading, setLoading] = useState(true);

  const role = getStoredRole();

  const details = useSelector((state: RootState) =>
    role === "Athlete"
      ? state.athlete.details
      : role === "Coach"
      ? state.coach.details
      : role === "Club"
      ? state.club.details
      : state.federation.details
  );

  const navigateToProfile = (user: UserData) => {
    if (user.id != details?.user_id) navigate(`/view/${user.id}/${user.role}`);
    else navigate("/profile");
  };

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
    <Box className="flex align-start">
      <Card
        className="secondary-bg-color"
        sx={{
          width: { xs: "86%", sm: width, md: width },
          minWidth: "300px",
          maxWidth: "600px",
          height: "auto",
          border: "none",
          borderRadius: 2,
          mt: 1,
          pr: 1,
          pl: 1,
          ml: 1.5,
        }}
      >
        <CardContent
          sx={{
            p: 1.5,
            "&:last-child": {
              pb: 1.5,
            },
          }}
        >
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
                  onClick={() => navigateToProfile(user)}
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
