import { FC } from "react";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import { RootState } from "../../../redux/store";
import { TryoutsList } from "./TryOutList";

const ViewTryouts: FC = () => {
  const { tryOuts } = useSelector((state: RootState) => state.tryOuts);

  const apply = () => {

  };
  return (
    <Box className="flex column" sx={{ padding: "10px" }}>
      <TryoutsList tryouts={tryOuts} onApply={apply} />
    </Box>
  );
};

export default ViewTryouts;
