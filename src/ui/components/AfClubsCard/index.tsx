import { FC, useEffect, useState, useCallback, useMemo, memo } from "react";
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

interface Club {
  id: number;
  name: string;
  user: User;
}

interface ClubsAffiliatedCardProps {
  federationId: number;
  width?: number;
  showEdit?: boolean;
  onEdit?: () => void;
}

const fetchAffiliatedClubs = async (federationId: number) => {
  try {
    const response = await requestApi(
      `/federation/getClubs/${federationId}`,
      "GET"
    );
    return response.clubs || [];
  } catch (error) {
    console.error("Error fetching affiliated clubs:", error);
    return [];
  }
};

const removeClubFromFederation = async (clubId: number) => {
  try {
    await requestApi(`/club/editProfile/${clubId}`, "PUT", {
      federation_id: null,
    });
    return true;
  } catch (error) {
    console.error("Error removing club from federation:", error);
    return false;
  }
};

const ClubListItem = memo(
  ({
    club,
    onRemoveClick,
  }: {
    club: Club;
    onRemoveClick: (id: number) => void;
  }) => (
    <ListItem
      secondaryAction={
        <IconButton
          edge="end"
          aria-label="remove"
          onClick={() => club.id && onRemoveClick(club.id)}
          sx={{ color: "error.main" }}
        >
          <DeleteIcon />
        </IconButton>
      }
    >
      <Box sx={{ mr: 2 }}>
        <ListItemText
          primary={
            <Typography sx={{ color: "white" }}>{club.user.name}</Typography>
          }
        />
      </Box>
    </ListItem>
  )
);

const ClubsAffiliatedCard: FC<ClubsAffiliatedCardProps> = memo(
  ({ federationId, width = 250, showEdit = false }) => {
    const [affiliatedClubs, setAffiliatedClubs] = useState<Club[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isRemoveLoading, setIsRemoveLoading] = useState(false);
    const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
    const [selectedClubId, setSelectedClubId] = useState<number | null>(null);

    const loadAffiliatedClubs = useCallback(async () => {
      setIsLoading(true);
      try {
        const clubs = await fetchAffiliatedClubs(federationId);
        setAffiliatedClubs(clubs);
      } catch (error) {
        console.error("Error loading affiliated clubs:", error);
      } finally {
        setIsLoading(false);
      }
    }, [federationId]);

    useEffect(() => {
      loadAffiliatedClubs();
    }, [loadAffiliatedClubs]);

    const handleRemoveClick = useCallback((clubId: number) => {
      setSelectedClubId(clubId);
      setIsConfirmDialogOpen(true);
    }, []);

    const handleRemoveConfirm = useCallback(async () => {
      if (!selectedClubId) return;

      setIsRemoveLoading(true);
      const success = await removeClubFromFederation(selectedClubId);
      if (success) {
        await loadAffiliatedClubs();
      }
      setIsRemoveLoading(false);
      setIsConfirmDialogOpen(false);
      setSelectedClubId(null);
    }, [selectedClubId, loadAffiliatedClubs]);

    const handleRemoveCancel = useCallback(() => {
      setIsConfirmDialogOpen(false);
      setSelectedClubId(null);
    }, []);

    const handleEditClick = useCallback(() => {
      setIsDialogOpen(true);
    }, []);

    const clubsData: CardData = useMemo(
      () => ({
        title: "CLUBS AFFILIATED",
        sections: [
          {
            type: "list",
            content: isLoading
              ? [{ name: "Loading...", role: "" }]
              : affiliatedClubs.map((club) => ({
                  id: club.id,
                  name: club.user.name,
                  role: "",
                })),
          },
        ],
      }),
      [isLoading, affiliatedClubs]
    );

    const clubsList = useMemo(
      () =>
        affiliatedClubs.map((club) => (
          <ClubListItem
            key={club.id}
            club={club}
            onRemoveClick={handleRemoveClick}
          />
        )),
      [affiliatedClubs, handleRemoveClick]
    );

    return (
      <>
        <CustomCard
          width={width}
          data={clubsData}
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
              Manage Affiliated Clubs
            </Typography>
          </DialogTitle>
          <DialogContent>
            <List>{clubsList}</List>
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
  }
);

export default ClubsAffiliatedCard;
