import { memo } from "react";
import { Box, Typography, Avatar, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

interface ProfileHeaderProps {
  avatar?: string;
  title: string;
  showEdit?: boolean;
  isLoading?: boolean;
  onEditClick: () => void;
}

const ProfileHeader = memo(
  ({ avatar, title, showEdit, isLoading, onEditClick }: ProfileHeaderProps) => {
    return (
      <>
        <Box className="banner full-width relative-position primary-bg-color">
          <Avatar
            className="absolute-position"
            sx={{
              width: 100,
              height: 100,
              top: "100%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            {avatar}
          </Avatar>
        </Box>

        <Box sx={{ position: "relative", textAlign: "center", mb: 2, pt: 6 }}>
          {showEdit && !isLoading && (
            <IconButton
              onClick={onEditClick}
              size="small"
              sx={{
                position: "absolute",
                right: 0,
                top: 0,
              }}
            >
              <EditIcon className="primary-color" fontSize="small" />
            </IconButton>
          )}
          <Typography variant="h5" className="white-color bold">
            {title}
          </Typography>
        </Box>
      </>
    );
  }
);

export default ProfileHeader;
