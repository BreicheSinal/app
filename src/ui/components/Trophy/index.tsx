import { FC, useState } from "react";
import { Box } from "@mui/material";
import { requestApi } from "../../../core/utils/request";
import { RequestTrophy } from "./RequestTrophy";
import { addTrophy } from "../../../redux/users/athleteSlice";
import { useDispatch } from "react-redux";

interface TrophiesManagerProps {
  role: string;
}

const TrophiesManager: FC<TrophiesManagerProps> = ({ role }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();

  const handleAddTrophy = async (trophy: {
    name: string;
    description: string;
  }) => {
    setIsSubmitting(true);
    try {
      const response = await requestApi("/req/trophy", "POST", {
        name: trophy.name,
        description: trophy.description,
        role: role,
      });

      if (response) {
        dispatch(
          addTrophy({
            id: response.trophyId,
            name: response.name,
            description: response.description,
            status: 0,
          })
        );
      }
    } catch (error) {
      console.error("Failed to request trophy:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box className="flex column" sx={{ padding: "10px 22px 12px 10px" }}>
      <RequestTrophy onAdd={handleAddTrophy} isLoading={isSubmitting} />
    </Box>
  );
};

export default TrophiesManager;
