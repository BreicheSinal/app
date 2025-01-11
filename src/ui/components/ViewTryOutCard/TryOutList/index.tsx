import { FC, useState } from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { Button } from "@mui/material";
import { getStyle } from "./style";
import { AthleteTryOut, selectAthleteTryoutIds } from "../../../../core/utils/globalUtils";
import { useSelector } from "react-redux";

interface TryoutsListProps {
  tryouts: AthleteTryOut[];
  onApply?: (id: number) => void;
}

export const TryoutsList: FC<TryoutsListProps> = ({ tryouts, onApply }) => {
  const [pendingApplies, setPendingApplies] = useState<number[]>([]);

  const athleteTryouts = useSelector(selectAthleteTryoutIds);

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

  const isApplied = (tryoutId: number) => {
    return (
      athleteTryouts.includes(tryoutId) || pendingApplies.includes(tryoutId)
    );
  };

  const handleApply = async (tryoutId: number) => {
    if (!isApplied(tryoutId)) {
      setPendingApplies((prev) => [...prev, tryoutId]);
      try {
        await onApply?.(tryoutId);
      } catch (error) {
        setPendingApplies((prev) => prev.filter((id) => id !== tryoutId));
        console.error("Failed to apply:", error);
      }
    }
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
              </Box>

              <Button
                variant="outlined"
                sx={
                  isApplied(tryout.id)
                    ? getStyle("appliedButton")
                    : getStyle("applyButton")
                }
                onClick={() => handleApply(tryout.id)}
                disabled={isApplied(tryout.id)}
                disableRipple
              >
                {isApplied(tryout.id) ? "Applied" : "Apply"}
              </Button>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};
