import { FC, useEffect, useState } from "react";
import CustomCard, { CardData } from "../CustomCard";
import { requestApi } from "../../../core/utils/request";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Box,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { ConfirmationDialog } from "../TryOutsCard/ConfirmationDialog";
import { dialogStyles } from "../../styles/dialogStyles";

interface User {
  name: string;
}

interface Coach {
  specialty: string;
  user: User;
  id?: number;
}

interface StaffCardProps {
  clubId: number;
  width?: number;
  showEdit?: boolean;
  onEdit?: () => void;
}

const fetchStaffMembers = async (clubId: number) => {
  try {
    const response = await requestApi(`/club/getStaff/${clubId}`, "GET");
    return response.coaches || [];
  } catch (error) {
    console.error("Error fetching staff members:", error);
    return [];
  }
};

const removeCoachFromClub = async (coachId: number) => {
  try {
    await requestApi(`/coach/editProfile/${coachId}`, "PUT", {
      club_id: null,
    });
    return true;
  } catch (error) {
    console.error("Error removing coach from club:", error);
    return false;
  }
};

const StaffCard: FC<StaffCardProps> = ({
  clubId,
  width = 250,
  showEdit = false,
}) => {
  const [staffMembers, setStaffMembers] = useState<Coach[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isRemoveLoading, setIsRemoveLoading] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [selectedCoachId, setSelectedCoachId] = useState<number | null>(null);

  const loadStaffMembers = async () => {
    setIsLoading(true);
    try {
      const members = await fetchStaffMembers(clubId);
      setStaffMembers(members);
    } catch (error) {
      console.error("Error loading staff members:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadStaffMembers();
  }, [clubId]);

  const handleRemoveClick = (coachId: number) => {
    setSelectedCoachId(coachId);
    setIsConfirmDialogOpen(true);
  };

  const handleRemoveConfirm = async () => {
    if (!selectedCoachId) return;

    setIsRemoveLoading(true);
    const success = await removeCoachFromClub(selectedCoachId);
    if (success) {
      await loadStaffMembers();
    }
    setIsRemoveLoading(false);
    setIsConfirmDialogOpen(false);
    setSelectedCoachId(null);
  };

  const handleRemoveCancel = () => {
    setIsConfirmDialogOpen(false);
    setSelectedCoachId(null);
  };

  const handleEditClick = () => {
    setIsDialogOpen(true);
  };

  const staffData: CardData = {
    title: "STAFF",
    sections: [
      {
        type: "list",
        content: isLoading
          ? [{ name: "Loading...", role: "" }]
          : staffMembers.map((coach) => ({
              id: coach.id,
              name: coach.user.name,
              role: coach.specialty,
            })),
      },
    ],
  };

  return (
    <>
      <CustomCard
        width={width}
        data={staffData}
        showEdit={showEdit}
        onEdit={handleEditClick}
      />

      <Dialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        maxWidth="sm"
        fullWidth
        sx={dialogStyles}
      >
        <DialogTitle>
          <Typography
            variant="h6"
            component="div"
            className="tertiary-color bold"
          >
            Manage Staff
          </Typography>
        </DialogTitle>
        <DialogContent>
          <List>
            {staffMembers.map((coach, index) => (
              <ListItem
                key={coach.id || `coach-${index}`}
                secondaryAction={
                  <IconButton
                    edge="end"
                    aria-label="remove"
                    onClick={() => coach.id && handleRemoveClick(coach.id)}
                    sx={{ color: "error.main" }}
                  >
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <Box sx={{ mr: 2 }}>
                  <ListItemText
                    primary={
                      <Typography sx={{ color: "white" }}>
                        {coach.user.name}
                      </Typography>
                    }
                    secondary={
                      <Typography sx={{ color: "rgba(255, 255, 255, 0.7)" }}>
                        {coach.specialty}
                      </Typography>
                    }
                  />
                </Box>
              </ListItem>
            ))}
          </List>
        </DialogContent>
      </Dialog>

      <ConfirmationDialog
        open={isConfirmDialogOpen}
        onClose={handleRemoveCancel}
        onConfirm={handleRemoveConfirm}
        isLoading={isRemoveLoading}
      />
    </>
  );
};

export default StaffCard;
