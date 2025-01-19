import { FC } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Divider,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { getStyle } from "./style";
import { createSelector } from "@reduxjs/toolkit";

import { useNavigate } from "react-router-dom";

export interface Trophy {
  id: number;
  name: string;
  description: string;
  status: number;
}

const selectApprovedTrophies = createSelector(
  [(state: RootState) => state.athlete.details?.trophies],
  (trophies) => trophies?.filter((trophy) => trophy.status == 1) || []
);

export const ViewMyTrophies: FC = () => {
  const navigate = useNavigate();
  const trophies = useSelector(selectApprovedTrophies);

  const handleAddClick = () => {
    navigate("/feed");
  };

  return (
    <Card className="secondary-bg-color" sx={getStyle("container")}>
      <CardContent sx={getStyle("cardContent")}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mr: 1.5,
          }}
        >
          <Typography
            variant="h6"
            className="tertiary-color"
            sx={getStyle("headerText")}
          >
            TROPHIES
          </Typography>
          <IconButton
            onClick={handleAddClick}
            size="small"
            color="primary"
            sx={getStyle("addButton")}
          >
            <AddIcon />
          </IconButton>
        </Box>

        <Box sx={getStyle("tryoutsList")}>
          {trophies.length === 0 ? (
            <Typography sx={getStyle("infoValue")}>
              No approved trophies yet
            </Typography>
          ) : (
            trophies.map((trophy: Trophy, index: number) => (
              <Box key={trophy.id}>
                <Box sx={getStyle("trophyContent")}>
                  <Typography sx={getStyle("trophyName")}>
                    {trophy.name}
                  </Typography>
                  {trophy.description && (
                    <Typography sx={getStyle("trophyDescription")}>
                      {trophy.description}
                    </Typography>
                  )}
                </Box>
                {index !== trophies.length - 1 && (
                  <Divider sx={getStyle("divider")} />
                )}
              </Box>
            ))
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

interface ViewVMyTrophiesProps {
  trophies: Trophy[];
}

export const ViewVMyTrophies: FC<ViewVMyTrophiesProps> = ({ trophies }) => {
  return (
    <Card className="secondary-bg-color" sx={getStyle("container")}>
      <CardContent sx={getStyle("cardContent")}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mr: 1.5,
          }}
        >
          <Typography
            variant="h6"
            className="tertiary-color"
            sx={getStyle("headerText")}
          >
            TROPHIES
          </Typography>
        </Box>

        <Box sx={getStyle("tryoutsList")}>
          {trophies.length === 0 ? (
            <Typography sx={getStyle("infoValue")}>
              No approved trophies yet
            </Typography>
          ) : (
            trophies.map((trophy: Trophy, index: number) => (
              <Box key={trophy.id}>
                <Box sx={getStyle("trophyContent")}>
                  <Typography sx={getStyle("trophyName")}>
                    {trophy.name}
                  </Typography>
                  {trophy.description && (
                    <Typography sx={getStyle("trophyDescription")}>
                      {trophy.description}
                    </Typography>
                  )}
                </Box>
                {index !== trophies.length - 1 && (
                  <Divider sx={getStyle("divider")} />
                )}
              </Box>
            ))
          )}
        </Box>
      </CardContent>
    </Card>
  );
};
