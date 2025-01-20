import { FC } from "react";
import {
  Card,
  CardContent,
  Box,
  Typography,
  Avatar,
  Button,
  CardMedia,
} from "@mui/material";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";

interface PostProps {
  width: number;
  userName: string;
  description: string;
  userAvatar?: string;
  image?: string;
  onLike?: () => void;
  onComment?: () => void;
}

const Post: FC<PostProps> = ({
  width = 600,
  userName,
  description,
  userAvatar,
  image,
  onLike,
  onComment,
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
          backgroundColor: "#1d2125",
          borderRadius: 2,
        }}
      >
        <CardContent
          sx={{
            "&:last-child": {
              pb: 1
            },
          }}
        >
          {/* User Info Section */}
          <Box sx={{ display: "flex", alignItems: "center", mb: 1.5 }}>
            <Avatar
              sx={{
                width: 40,
                height: 40,
                mr: 2,
                backgroundColor: "primary.main",
              }}
            >
              {userAvatar || userName.charAt(0)}
            </Avatar>
            <Box>
              <Typography
                variant="subtitle1"
                sx={{
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                {userName}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "rgba(255, 255, 255, 0.7)",
                }}
              >
                Description
              </Typography>
            </Box>
          </Box>

          {/* Post Content */}
          <Typography
            variant="body1"
            sx={{
              color: "white",
              mb: image ? 2 : 3,
              lineHeight: 1.6,
            }}
          >
            {description}
          </Typography>

          {/* Optional Image */}
          {image && (
            <Box sx={{ mb: 2 }}>
              <CardMedia
                component="img"
                image={image}
                alt="Post image"
                sx={{
                  borderRadius: 1,
                  maxHeight: "400px",
                  objectFit: "cover",
                }}
              />
            </Box>
          )}

          {/* Action Buttons */}
          <Box
            sx={{
              display: "flex",
              gap: 2,
              borderTop: "1px solid rgba(255, 255, 255, 0.1)",
              pt: 2,
            }}
          >
            <Button
              startIcon={<ThumbUpOffAltIcon />}
              onClick={onLike}
              sx={{
                color: "white",
                flex: 1,
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                },
              }}
            >
              Like
            </Button>
            <Button
              startIcon={<ChatBubbleOutlineIcon />}
              onClick={onComment}
              sx={{
                color: "white",
                flex: 1,
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                },
              }}
            >
              Comment
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Post;
