import { Card } from "@mui/material";
import "./style.css";

// defining props for CustomCard component
interface CardProps {
  width: number;
  height: number;
}

const CustomCard: React.FC<CardProps> = ({ width, height }) => {
  return (
    <Card
      className="Card white-bg"
      sx={{
        width: width,
        height: height,
      }}
    ></Card>
  );
};

export default CustomCard;
