import { useState, FC } from "react";
import { Box } from "@mui/material";
import BioHeader from "./BioHeader";
import BioContent from "./BioContent";
import BioDialog from "./BioDialog";

// Main BioCard Component
interface BioCardProps {
  width?: number;
  bioText: string | null;
  showEdit?: boolean;
  onEdit?: (updatedBio: string) => Promise<void>;
  isLoading?: boolean;
}

export const BioCard: FC<BioCardProps> = ({
  width = 600,
  bioText = "",
  showEdit = false,
  onEdit,
  isLoading = false,
}) => {
  const [open, setOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async (newBio: string) => {
    if (!onEdit) return;
    setIsSaving(true);
    try {
      await onEdit(newBio);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <Box className="Box flex align-start">
        <Box
          className="secondary-bg-color"
          sx={{
            width: { xs: "87%", sm: width, md: width },
            minWidth: "300px",
            maxWidth: "600px",
            height: "auto",
            border: "none",
            borderRadius: 2,
            pt: 1.5,
            pb: 2,
            pr: 2,
            pl: 2,
          }}
        >
          <BioHeader
            showEdit={showEdit}
            onEditClick={() => setOpen(true)}
            isLoading={isLoading}
          />
          <BioContent bioText={bioText} isLoading={isLoading} />
        </Box>
      </Box>

      <BioDialog
        open={open}
        onClose={() => setOpen(false)}
        bioText={bioText}
        onSave={handleSave}
        isSaving={isSaving}
      />
    </>
  );
};

interface BioCardViewProps {
  width?: number;
  bioText: string | null;
}

export const BioCardView: FC<BioCardViewProps> = ({
  width = 600,
  bioText = "",
}) => {
  return (
    <Box className="Box flex align-start">
      <Box
        className="secondary-bg-color"
        sx={{
          width: { xs: "87%", sm: width, md: width },
          minWidth: "300px",
          maxWidth: "600px",
          height: "auto",
          border: "none",
          borderRadius: 2,
          pt: 1.5,
          pb: 2,
          pr: 2,
          pl: 2,
        }}
      >
        <BioHeader />
        <BioContent bioText={bioText} />
      </Box>
    </Box>
  );
};
