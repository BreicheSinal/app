import { Card, CardContent, Box } from "@mui/material";
import "./style.css";

// defining props for CustomCard component
interface CardProps {
  width: number;
  height: number;
}

const CustomCard: React.FC<CardProps> = ({ width, height }) => {
  return (
    <Box className="Box flex justify-center align-center">
      <Card
        className="Card white-bg"
        sx={{
          width: width,
          height: height,
        }}
      >
        <CardContent>
          <Box className="flex space-between align-center"></Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CustomCard;
