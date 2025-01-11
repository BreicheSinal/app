import { FC } from "react";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import { RootState } from "../../../redux/store";
import { TryoutsList } from "./TryOutList";
import { applyToTryOut } from "../../../core/utils/addDetails";
import { useDispatch } from "react-redux";

const ViewTryouts: FC = () => {
  const dispatch = useDispatch();

  const { tryOuts } = useSelector((state: RootState) => state.tryOuts);

  const athleteId = useSelector(
    (state: RootState) => state.athlete.details?.id
  );

  const apply = async (tryoutId: number) => {
    try {
      await applyToTryOut(dispatch, athleteId!, tryoutId);
    } catch (error) {
      // add ui error here
      console.error("Failed to apply for tryout:", error);
    }
  };
  return (
    <Box className="flex column" sx={{ padding: "10px" }}>
      <TryoutsList tryouts={tryOuts} onApply={apply} />
    </Box>
  );
};

export default ViewTryouts;
