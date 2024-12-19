import { FC } from "react";
import { Card, CardContent, Box, Typography, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

import "./style.css";

// defining props for CustomCard component
interface CardProps {
  width: number;
  title: string;
  content: string;
  showButtons?: boolean;
}

const CustomCard: FC<CardProps> = ({ width, title, content, showButtons }) => {
  return (
    <Box className="Box flex align-start">
      <Card
        className="Card secondary-bg-color"
        sx={{
          width: { xs: "90%", sm: width, md: width },
          minWidth: "300px",
          maxWidth: "600px",
          height: "auto",
          border: "none",
        }}
      >
        <CardContent>
          <Box className="flex space-between align-center">
            <Typography variant="h6" gutterBottom className="tertiary-color">
              {title}
            </Typography>
            {showButtons && (
              <IconButton>
                <EditIcon className="primary-color" fontSize="small" />
              </IconButton>
            )}
          </Box>
          <Typography variant="body2" className="white-color">
            {content}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CustomCard;
