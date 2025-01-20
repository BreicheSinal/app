import { FC, useState, useEffect } from "react";
import { Box, Card, CardContent, Typography, IconButton } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

import { requestApi } from "../../../../core/utils/request";
import { getStyle } from "./style";

interface Application {
  id: string;
  status: "pending" | "accepted" | "rejected";
  athleteId: string;
  athlete_userId: string;
  athlete_name: string;
  trId: string;
  tr_club_name: string;
}

interface GroupedApplications {
  [key: string]: Application[];
}

const ClubApplications: FC<{ clubId: number }> = ({ clubId }) => {
  const [applications, setApplications] = useState<GroupedApplications>({});

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await requestApi(`club/applications/${clubId}`);
        const grouped = response.applications.reduce(
          (acc: GroupedApplications, app: Application) => {
            if (app.status !== "rejected") {
              if (!acc[app.trId]) {
                acc[app.trId] = [];
              }
              acc[app.trId].push(app);
            }
            return acc;
          },
          {}
        );
        setApplications(grouped);
      } catch (error) {
        console.error("Failed to fetch applications:", error);
      }
    };

    fetchApplications();
  }, [clubId]);

  const handleResponse = async (
    applicationId: string,
    action: "accepted" | "rejected"
  ) => {
    try {
      await requestApi(`club/update/applications/${applicationId}`, "PUT", {
        action,
      });

      setApplications((prev) => {
        const updated = { ...prev };

        Object.keys(updated).forEach((tryoutId) => {
          updated[tryoutId] = updated[tryoutId].map((app) => {
            if (app.id === applicationId) {
              return { ...app, status: action };
            }
            return app;
          });

          if (action === "rejected") {
            updated[tryoutId] = updated[tryoutId].filter(
              (app) => app.id !== applicationId
            );
          }

          if (updated[tryoutId].length === 0) {
            delete updated[tryoutId];
          }
        });

        return updated;
      });
    } catch (error) {
      console.error(`Failed to ${action} application:`, error);
    }
  };

  const renderApplicationActions = (app: Application) => {
    if (app.status === "pending") {
      return (
        <Box sx={getStyle("buttonGroup")}>
          <IconButton
            size="small"
            sx={getStyle("rejectButton")}
            onClick={() => handleResponse(app.id, "rejected")}
            disableRipple
          >
            <CloseIcon fontSize="small" />
          </IconButton>
          <IconButton
            size="small"
            sx={getStyle("acceptButton")}
            onClick={() => handleResponse(app.id, "accepted")}
            disableRipple
          >
            <CheckIcon fontSize="small" />
          </IconButton>
        </Box>
      );
    } else if (app.status === "accepted") {
      return (
        <Box sx={getStyle("acceptedStatus")}>
          <CheckIcon fontSize="small" sx={{ color: "green" }} />
          <Typography variant="body2" sx={{ color: "green", ml: 1 }}>
            Approved
          </Typography>
        </Box>
      );
    }
    return null;
  };

  return (
    <Card className="secondary-bg-color" sx={getStyle("container")}>
      <CardContent sx={getStyle("cardContent")}>
        <Box
          className="flex space-between align-center"
          sx={getStyle("headerBox")}
        >
          <Typography
            variant="h6"
            className="tertiary-color"
            sx={getStyle("headerText")}
          >
            TRYOUT APPLICATIONS
          </Typography>
        </Box>

        <Box sx={getStyle("tryoutsList")}>
          {Object.keys(applications).length === 0 ? (
            <Typography sx={getStyle("athleteName")}>
              No applications received
            </Typography>
          ) : (
            Object.entries(applications).map(([tryoutId, apps]) => (
              <Box
                key={tryoutId}
                sx={{
                  ...getStyle("tryoutItem"),
                  border: 1,
                  borderColor: "divider",
                  borderRadius: 1,
                  p: 2,
                  mb: 2,
                }}
              >
                <Box sx={getStyle("tryoutContent")}>
                  <Typography sx={getStyle("clubName")}>
                    {apps[0].tr_club_name}
                  </Typography>

                  <Box>
                    {apps.map((app) => (
                      <Box key={app.id} sx={getStyle("applicantItem")}>
                        <Typography sx={getStyle("athleteName")}>
                          {app.athlete_name}
                        </Typography>
                        {renderApplicationActions(app)}
                      </Box>
                    ))}
                  </Box>
                </Box>
              </Box>
            ))
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default ClubApplications;
