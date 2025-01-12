import { FC, useState, useEffect } from "react";
import { Box, Card, CardContent, Typography, IconButton } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

import { requestApi } from "../../../../core/utils/request";
import { getStyle } from "./style";

interface Application {
  id: string;
  status: string;
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
        // Group applications by tryout ID
        const grouped = response.applications.reduce(
          (acc: GroupedApplications, app: Application) => {
            if (!acc[app.trId]) {
              acc[app.trId] = [];
            }
            acc[app.trId].push(app);
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
  ) => {};

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

                  <Box sx={getStyle("applicantsList")}>
                    {apps.map((app) => (
                      <Box key={app.id} sx={getStyle("applicantItem")}>
                        <Typography sx={getStyle("athleteName")}>
                          {app.athlete_name}
                        </Typography>
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
