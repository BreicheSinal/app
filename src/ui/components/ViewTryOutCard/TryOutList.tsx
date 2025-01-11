import { FC } from "react";
import { Box, Card, CardContent, Typography, Link } from "@mui/material";
import { Button } from "@mui/material";
import { ViewTryOuts } from "../../../redux/users/tryOutSlice";
import { getStyle } from "./style";

interface TryoutsListProps {
  tryouts: ViewTryOuts[];
  onApply?: (id: number) => void;
}

export const TryoutsList: FC<TryoutsListProps> = ({ tryouts, onApply }) => {
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
            TRY-OUTS
          </Typography>
        </Box>

        <Box sx={getStyle("tryoutsList")}>
          {tryouts.map((tryout) => (
            <Box key={tryout.id} sx={getStyle("tryoutItem")}>
              <Box sx={getStyle("tryoutContent")}>
                <Typography sx={getStyle("clubName")}>
                  {tryout.club_name}
                </Typography>

                <Box sx={getStyle("tryoutInfo")}>
                <Box sx={getStyle("tryoutInfo")}>
                    <Typography component="span" sx={getStyle("infoLabel")}>
                      Name:
                    </Typography>
                    <Typography component="span" sx={getStyle("infoValue")}>
                      {tryout.name}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={getStyle("tryoutInfo")}>
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

                <Box sx={getStyle("tryoutInfo")}>
                  <Typography sx={getStyle("infoLabel")}>Link: </Typography>
                  <Link
                    href={tryout.meetingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={getStyle("link")}
                  >
                    {tryout.meetingUrl}
                  </Link>
                </Box>
              </Box>

              <Button
                variant="outlined"
                sx={getStyle("applyButton")}
                onClick={() => onApply?.(tryout.id)}
                disableRipple
              >
                Apply
              </Button>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};
