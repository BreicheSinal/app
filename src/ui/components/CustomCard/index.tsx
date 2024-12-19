import { FC } from "react";
import { Card, CardContent, Box, Typography, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

import "./style.css";

// defining props for CustomCard component
interface CardProps {
  width: number;
}

const CustomCard: FC<CardProps> = ({ width }) => {
  return (
    <Box className="Box flex align-start">
      <Card
        className="Card white-bg"
        sx={{
          width: width,
          height: "auto",
        }}
      >
        <CardContent>
          <Box className="flex space-between align-center">
            <Typography variant="h6" gutterBottom>
              Welcome!
            </Typography>
            <IconButton>
              <EditIcon className="primary-color" fontSize="small" />
            </IconButton>
          </Box>
          <Typography variant="body2">HALA MADRID!</Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CustomCard;
