import { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";
import { addTryout, deleteTryout } from "../../../redux/users/clubSlice";
import { RootState } from "../../../redux/store";
import { AddTryoutForm } from "./AddTryOut";
import { TryoutsList } from "./TryOutList";
import { ConfirmationDialog } from "./ConfirmationDialog";

const TryoutsManager: FC = () => {
  const dispatch = useDispatch();
  const tryouts = useSelector((state: RootState) => state.club.tryouts);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  const handleAdd = (tryout: {
    name: string;
    date: string;
    description: string;
  }) => {
    dispatch(
      addTryout({
        id: Date.now(),
        ...tryout,
      })
    );
  };

  const handleDelete = (id: number) => {
    setDeleteId(id);
    setOpenDialog(true);
  };

  const confirmDelete = () => {
    if (deleteId) {
      dispatch(deleteTryout(deleteId));
      setOpenDialog(false);
      setDeleteId(null);
    }
  };

  return (
    <Box className="flex column" sx={{ padding: "10px" }}>
      <AddTryoutForm onAdd={handleAdd} />
      <TryoutsList tryouts={tryouts} onDelete={handleDelete} />
      <ConfirmationDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onConfirm={confirmDelete}
      />
    </Box>
  );
};

export default TryoutsManager;
