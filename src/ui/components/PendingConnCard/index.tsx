import { FC, useEffect, useState, useCallback, memo } from "react";
import { requestApi } from "../../../core/utils/request";
import {
  Box,
  CardContent,
  Typography,
  Button,
  List,
  ListItem,
  CircularProgress,
} from "@mui/material";

import "./style.css";

interface User {
  id: string;
  name: string;
}

interface Connection {
  user: User;
}

interface PendingConnectionCardProps {
  userId: number;
  width?: number;
}

const fetchPendingConnections = async (userId: number) => {
  try {
    const response = await requestApi(`/user/pending/${userId}`, "GET");

    if (!response || !response.connections) {
      return [];
    }

    return response.connections;
  } catch (error) {
    console.error("Error fetching pending connections:", error);
    return [];
  }
};

const updateConnectionStatus = async (
  connectedUserId: number,
  userId: number,
  status: "accepted" | "rejected"
) => {
  try {
    await requestApi(`/user/${connectedUserId}`, "PUT", {
      userId,
      status,
    });
    return true;
  } catch (error) {
    console.error("Error updating connection status:", error);
    return false;
  }
};

const PendingConnectionCard: FC<PendingConnectionCardProps> = memo(
  ({ userId, width = 615 }) => {
    const [pendingConnections, setPendingConnections] = useState<Connection[]>(
      []
    );
    const [isLoading, setIsLoading] = useState(true);

    const loadPendingConnections = useCallback(async () => {
      setIsLoading(true);
      try {
        const response = await fetchPendingConnections(userId);
        if (response) {
          setPendingConnections(response);
        } else {
          console.error("Invalid connections data format:", response);
          setPendingConnections([]);
        }
      } catch (error) {
        console.error("Error loading pending connections:", error);
        setPendingConnections([]);
      } finally {
        setIsLoading(false);
      }
    }, [userId]);

    useEffect(() => {
      loadPendingConnections();
    }, [loadPendingConnections]);

    const handleConnectionAction = useCallback(
      async (user_Id: number, status: "accepted" | "rejected") => {
        const connectedUserId = userId;
        const success = await updateConnectionStatus(
          connectedUserId,
          user_Id,
          status
        );

        if (success) {
          setPendingConnections((prev) =>
            prev.filter((conn) => Number(conn.user.id) !== user_Id)
          );
        }
      },
      [userId]
    );

    return (
      <Box className="Box flex align-start">
        <Box
          className="secondary-bg-color"
          sx={{
            width: { xs: "87%", sm: width, md: width },
            minWidth: "300px",
            maxWidth: "615px",
            borderRadius: 2,
          }}
        >
          <CardContent>
            <Typography
              className="tertiary-color"
              variant="h6"
              sx={{ fontWeight: "bold", letterSpacing: "0.5px" }}
            >
              PENDING CONNECTIONS
            </Typography>

            {isLoading ? (
              <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
                <CircularProgress />
              </Box>
            ) : pendingConnections.length === 0 ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  mt: 1,
                  borderRadius: 1,
                }}
              >
                <Typography
                  sx={{
                    color: "white",
                    fontWeight: 500,
                    fontSize: 14,
                  }}
                >
                  No pending connections
                </Typography>
              </Box>
            ) : (
              <List sx={{ p: 0 }}>
                {pendingConnections.map((connection) => {
                  return (
                    <ListItem
                      key={`${connection.user.id}`}
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        borderBottom: "1px solid ",
                        borderColor: "rgba(255, 255, 255, 0.2)",
                        py: 2,
                        "&:last-child": {
                          borderBottom: "none",
                        },
                      }}
                    >
                      <Typography className="white-color">
                        {connection.user.name}
                      </Typography>
                      <Box sx={{ display: "flex", gap: 1 }}>
                        <Button
                          disableRipple
                          variant="contained"
                          color="error"
                          size="small"
                          onClick={() =>
                            handleConnectionAction(
                              Number(connection.user.id),
                              "rejected"
                            )
                          }
                        >
                          Reject
                        </Button>
                        <Button
                          disableRipple
                          variant="contained"
                          color="success"
                          size="small"
                          onClick={() =>
                            handleConnectionAction(
                              Number(connection.user.id),
                              "accepted"
                            )
                          }
                        >
                          Accept
                        </Button>
                      </Box>
                    </ListItem>
                  );
                })}
              </List>
            )}
          </CardContent>
        </Box>
      </Box>
    );
  }
);

export default PendingConnectionCard;
