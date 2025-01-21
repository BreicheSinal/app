import { FC, useEffect, useState, useCallback, memo } from "react";
import { requestApi } from "../../../core/utils/request";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  List,
  ListItem,
  CircularProgress,
} from "@mui/material";

interface Trophy {
  id: number;
  name: string;
  description: string;
  status: string;
  requester: string;
}

interface ApprovalCardProps {
  width?: number;
}

const fetchPendingTrophies = async () => {
  try {
    const address = import.meta.env.VITE_PRIVATE_KEY;
    const response = await requestApi(`/trophies/owner/${address}`, "GET");

    if (!response) {
      return [];
    }

    const trophies = Array.isArray(response) ? response : [];

    const pendingTrophies = trophies.filter((trophy) => {
      return String(trophy.status) === "0";
    });

    return pendingTrophies;
  } catch (error) {
    console.error("Error fetching pending trophies:", error);
    return [];
  }
};

const updateTrophyStatus = async (trophyId: number, approved: boolean) => {
  try {
    await requestApi(`/verify/trophy/${trophyId}`, "POST", {
      approved: approved,
    });
    return true;
  } catch (error) {
    console.error("Error updating trophy status:", error);
    return false;
  }
};

const TrophyApprovalsCard: FC<ApprovalCardProps> = memo(({ width = 615 }) => {
  const [pendingTrophies, setPendingTrophies] = useState<Trophy[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [processingTrophies, setProcessingTrophies] = useState<{
    [key: number]: {
      accepting: boolean;
      rejecting: boolean;
    };
  }>({});

  const loadPendingTrophies = useCallback(async () => {
    setIsLoading(true);
    const trophies = await fetchPendingTrophies();
    setPendingTrophies(trophies);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    loadPendingTrophies();
  }, [loadPendingTrophies]);

  const handleTrophyAction = useCallback(
    async (trophyId: number, approved: boolean) => {
      try {
        setProcessingTrophies((prev) => ({
          ...prev,
          [trophyId]: {
            ...prev[trophyId],
            accepting: approved,
            rejecting: !approved,
          },
        }));
        const success = await updateTrophyStatus(trophyId, approved);

        if (success) {
          setPendingTrophies((prev) =>
            prev.filter((trophy) => trophy.id !== trophyId)
          );
        }
      } catch (error) {
        console.error("Error processing trophy action:", error);
      } finally {
        setProcessingTrophies((prev) => {
          const updated = { ...prev };
          delete updated[trophyId];
          return updated;
        });
      }
    },
    []
  );

  return (
    <Box className="Box flex align-start">
      <Card
        className="secondary-bg-color"
        sx={{
          width: { xs: "90%", sm: width, md: width },
          minWidth: "300px",
          maxWidth: "615px",
          borderRadius: 2,
        }}
      >
        <CardContent sx={{ p: 2 }}>
          <Typography
            className="tertiary-color"
            variant="h6"
            sx={{ fontWeight: "bold", letterSpacing: "0.5px" }}
          >
            PENDING TROPHIES
          </Typography>

          {isLoading ? (
            <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
              <CircularProgress />
            </Box>
          ) : pendingTrophies.length === 0 ? (
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
                No pending trophies
              </Typography>
            </Box>
          ) : (
            <List sx={{ p: 0 }}>
              {pendingTrophies.map((trophy) => {
                return (
                  <ListItem
                    key={trophy.id}
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
                    <Box>
                      <Typography
                        className="white-color"
                        sx={{ opacity: 0.7, fontSize: "0.875rem", mr: 5 }}
                      >
                        Sinal Breiche
                      </Typography>
                    </Box>
                    <Box>
                      <Typography className="white-color">
                        {trophy.name}
                      </Typography>
                      <Typography
                        className="white-color"
                        sx={{ opacity: 0.7, fontSize: "0.875rem" }}
                      >
                        {trophy.description}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", gap: 1, ml: 5 }}>
                      <Button
                        disableRipple
                        variant="contained"
                        color="error"
                        size="small"
                        disabled={
                          processingTrophies[trophy.id]?.rejecting ||
                          processingTrophies[trophy.id]?.accepting
                        }
                        onClick={() => handleTrophyAction(trophy.id, false)}
                      >
                        {processingTrophies[trophy.id]?.rejecting ? (
                          <CircularProgress size={20} color="inherit" />
                        ) : (
                          "Reject"
                        )}
                      </Button>
                      <Button
                        disableRipple
                        variant="contained"
                        color="success"
                        size="small"
                        disabled={
                          processingTrophies[trophy.id]?.accepting ||
                          processingTrophies[trophy.id]?.rejecting
                        }
                        onClick={() => handleTrophyAction(trophy.id, true)}
                      >
                        {processingTrophies[trophy.id]?.accepting ? (
                          <CircularProgress size={20} color="inherit" />
                        ) : (
                          "Accept"
                        )}
                      </Button>
                    </Box>
                  </ListItem>
                );
              })}
            </List>
          )}
        </CardContent>
      </Card>
    </Box>
  );
});

export default TrophyApprovalsCard;
