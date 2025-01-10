import { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";
import { addTryout, deleteTryout } from "../../../redux/users/clubSlice";
import { RootState } from "../../../redux/store";
import { AddTryoutForm } from "./AddTryOut";
import { TryoutsList } from "./TryOutList";
import { ConfirmationDialog } from "./ConfirmationDialog";
import { requestApi } from "../../../core/utils/request";

const TryoutsManager: FC = () => {
  const dispatch = useDispatch();
  const tryouts = useSelector(
    (state: RootState) => state.club.details?.tryouts
  );
  const clubId = useSelector((state: RootState) => state.club.details?.id);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleAdd = async (tryout: {
    name: string;
    date: string;
    description: string;
  }) => {
    try {
      setIsLoading(true);

      const response = await requestApi(`/club/tryouts`, "POST", {
        ...tryout,
        clubId: clubId,
      });

      if (response.tryout) {
        dispatch(
          addTryout({
            id: response.tryout.id,
            meetingUrl: response.tryout.meetingUrl,
            ...tryout,
          })
        );
      }
    } catch (error) {
      console.error("Error adding tryout:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = (id: number) => {
    setDeleteId(id);
    setOpenDialog(true);
  };

  const confirmDelete = async () => {
    if (deleteId) {
      try {
        setIsLoading(true);

        await requestApi(`/club/deleteTr/${deleteId}`, "DELETE");

        dispatch(deleteTryout(deleteId));
        setOpenDialog(false);
        setDeleteId(null);
      } catch (error) {
        console.error("Error deleting tryout:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <Box className="flex column" sx={{ padding: "10px" }}>
      <AddTryoutForm onAdd={handleAdd} isLoading={isLoading} />
      <TryoutsList tryouts={tryouts!} onDelete={handleDelete} />
      <ConfirmationDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onConfirm={confirmDelete}
        isLoading={isLoading}
      />
    </Box>
  );
};

export default TryoutsManager;
