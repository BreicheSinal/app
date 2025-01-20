import { FC, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Link,
  Button,
} from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { getStatusColor, getStyle } from "./style";
import { AthleteTryOut } from "../../../../core/utils/globalUtils";

export const MyTryouts: FC = () => {
  const athleteTryouts = useSelector(
    (state: RootState) => state.athlete.details?.tryOuts || []
  );

  const [expandedTryouts, setExpandedTryouts] = useState<{
    [key: string]: boolean;
  }>({});

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const toggleDetails = (tryoutId: string) => {
    setExpandedTryouts((prev) => ({
      ...prev,
      [tryoutId]: !prev[tryoutId],
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
            MY TRY-OUTS
          </Typography>
        </Box>

        <Box sx={getStyle("tryoutsList")}>
          {athleteTryouts.length === 0 ? (
            <Typography sx={getStyle("infoValue")}>
              No try-outs applied yet
            </Typography>
          ) : (
            athleteTryouts.map((tryout: AthleteTryOut) => (
              <Box
                key={tryout.id}
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
                  <Typography sx={getStyle("clubName")}>
                    {tryout.club_name}
                  </Typography>

                  <Box>
                    <Typography component="span" sx={getStyle("infoLabel")}>
                      Name:
                    </Typography>
                    <Typography component="span" sx={getStyle("infoValue")}>
                      {tryout.name}
                    </Typography>
                  </Box>

                  {expandedTryouts[tryout.id] && (
                    <>
                      <Box>
                        <Typography component="span" sx={getStyle("infoLabel")}>
                          Date:
                        </Typography>
                        <Typography component="span" sx={getStyle("infoValue")}>
                          {formatDate(tryout.date)}
                        </Typography>
                      </Box>

                      {tryout.description && (
                        <Typography sx={getStyle("description")}>
                          {tryout.description}
                        </Typography>
                      )}

                      {tryout.status === "accepted" && (
                        <Box>
                          <Typography
                            component="span"
                            sx={getStyle("infoLabel")}
                          >
                            Link:
                          </Typography>
                          <Link
                            href={tryout.meetingUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={getStyle("link")}
                          >
                            Join Meeting
                          </Link>
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
                      onClick={() => toggleDetails(tryout.id.toString())}
                      sx={{ minWidth: 100, textTransform: "none" }}
                      disableRipple
                    >
                      {expandedTryouts[tryout.id]
                        ? "Show Less"
                        : "More Details"}
                    </Button>
                    <Typography
                      sx={{
                        ...getStyle("status"),
                        color: getStatusColor(tryout.status),
                      }}
                    >
                      {tryout.status.toUpperCase()}
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
