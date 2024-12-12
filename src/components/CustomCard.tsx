import { Card } from "@mui/material";

// defining props for CustomCard component
interface CardProps {
  width: number;
  height: number;
}

const CustomCard: React.FC<CardProps> = ({ width, height }) => {
  return (
    <Card
      sx={{
        width: width,
        height: height,
        borderRadius: "10px",
        boxShadow: 1,
        padding: 2,
        backgroundColor: "white",
      }}
    ></Card>
  );
};

export default CustomCard;
