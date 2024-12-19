import { FC } from "react";
import {
  Card,
  CardContent,
  Box,
  Typography,
  IconButton,
  Avatar,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

import "./style.css";

interface ProfileField {
  label: string;
  value: string | number;
}

interface ProfileData {
  title: string;
  avatar?: string;
  headerColor?: string;
  fields: ProfileField[];
}

interface ProfileCardProps {
  width: number;
  data: ProfileData;
  showEdit?: boolean;
  onEdit?: (field: string) => void;
}

const ProfileCard: FC<ProfileCardProps> = ({
  width,
  data,
  showEdit = false,
  onEdit,
}) => {
  return (
    <Box className="Box flex align-start">
      <Card
        className="Card secondary-bg-color"
        sx={{
          width: { xs: "90%", sm: width, md: width },
          minWidth: "300px",
          maxWidth: "600px",
          height: "auto",
        }}
      >
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
            {data.avatar}
          </Avatar>
        </Box>

        <CardContent sx={{ pt: 6 }}>
          <Typography
            variant="h5"
            gutterBottom
            className="white-color text-center"
            sx={{ mb: 4 }}
          >
            {data.title}
          </Typography>

          {data.fields.map((field) => (
            <Box
              key={field.label}
              className="flex space-between align-center"
              sx={{ mb: 2 }}
            >
              <Box>
                <Typography variant="subtitle2" className="tertiary-color">
                  {field.label}
                </Typography>
                <Typography variant="body2" className="white-color">
                  {field.value}
                </Typography>
              </Box>
              {showEdit && (
                <IconButton
                  onClick={() => onEdit && onEdit(field.label)}
                  size="small"
                >
                  <EditIcon className="primary-color" fontSize="small" />
                </IconButton>
              )}
            </Box>
          ))}
        </CardContent>
      </Card>
    </Box>
  );
};

export default ProfileCard;
