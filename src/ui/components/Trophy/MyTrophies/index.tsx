import { FC, useState } from "react";
import { Box, Card, CardContent, Typography, Button } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { getStatusColor, getStatusText, getStyle } from "./style";

export interface Trophy {
  id: number;
  name: string;
  description: string;
  status: number;
}

const trophyDates: { [key: number]: Date } = {};

export const MyTrophies: FC = () => {
  const trophies = useSelector(
    (state: RootState) => state.athlete.details?.trophies || []
  );

  const [expandedTrophies, setExpandedTrophies] = useState<{
    [key: string]: boolean;
  }>({});

  const getOrCreateDate = (trophyId: number) => {
    if (!trophyDates[trophyId]) {
      trophyDates[trophyId] = new Date();
    }
    return trophyDates[trophyId];
  };

  const formatDate = (date: Date) => {
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const toggleDetails = (trophyId: string) => {
    setExpandedTrophies((prev) => ({
      ...prev,
      [trophyId]: !prev[trophyId],
    }));
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
            MY TROPHIES
          </Typography>
        </Box>

        <Box sx={getStyle("tryoutsList")}>
          {trophies.length === 0 ? (
            <Typography sx={getStyle("infoValue")}>
              No trophies requested yet
            </Typography>
          ) : (
            trophies.map((trophy: Trophy) => (
              <Box
                key={trophy.id}
                sx={{
                  ...getStyle("tryoutItem"),
                  border: 1,
                  borderColor: "divider",
                  borderRadius: 1,
                  p: 1.5,
                  mb: 1.5,
                }}
              >
                <Box sx={getStyle("tryoutContent")}>
                  <Box>
                    <Typography
                      component="span"
                      sx={getStyle("infoValue")}
                      className="bold"
                    >
                      {trophy.name}
                    </Typography>
                  </Box>

                  {expandedTrophies[trophy.id] && (
                    <>
                      <Box>
                        <Typography component="span" sx={getStyle("infoLabel")}>
                          Requested:
                        </Typography>
                        <Typography component="span" sx={getStyle("infoValue")}>
                          {formatDate(getOrCreateDate(trophy.id))}
                        </Typography>
                      </Box>

                      {trophy.description && (
                        <Box>
                          <Typography
                            component="span"
                            sx={getStyle("infoLabel")}
                          >
                            Description:
                          </Typography>
                          <Typography sx={getStyle("description")}>
                            {trophy.description}
                          </Typography>
                        </Box>
                      )}
                    </>
                  )}

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mt: 1,
                    }}
                  >
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => toggleDetails(trophy.id.toString())}
                      sx={{ minWidth: 100, textTransform: "none" }}
                      disableRipple
                    >
                      {expandedTrophies[trophy.id]
                        ? "Show Less"
                        : "More Details"}
                    </Button>
                    <Typography
                      sx={{
                        ...getStyle("status"),
                        color: getStatusColor(trophy.status),
                      }}
                    >
                      {getStatusText(trophy.status)}
                    </Typography>
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
