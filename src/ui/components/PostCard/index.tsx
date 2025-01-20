import { FC, useState, ChangeEvent } from "react";
import { IconButton, TextField, Button, Avatar, Box } from "@mui/material";
import {
  Image as ImageIcon,
  EmojiEmotions as EmojiIcon,
} from "@mui/icons-material";

import { getStoredRole } from "../../../core/utils/globalUtils";
import { RootState } from "../../../redux/store";
import { useSelector } from "react-redux";

interface PostCardProps {
  width: number;
}

const PostCard: FC<PostCardProps> = ({ width = 600 }) => {
  const [post, setPost] = useState<string>("");
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const role = getStoredRole();

  const details = useSelector((state: RootState) => {
    switch (role) {
      case "Athlete":
        return state.athlete.details;
      case "Coach":
        return state.coach.details;
      case "Club":
        return state.club.details;
      case "Federation":
        return state.federation.details;
      default:
        return null;
    }
  });

  const getInitial = () => {
    if (!details?.name) return "U";
    return details.name[0].toUpperCase();
  };

  const onFocus = () => {
    setIsExpanded(true);
  };

  const onChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPost(event.target.value);
  };

  const handlePost = () => {
    if (post.trim()) {
      setPost("");
      setIsExpanded(false);
    }
  };

  return (
    <Box className="Box flex align-start">
      <Box
        className="Card secondary-bg-color"
        sx={{
          width: { xs: "90%", sm: width, md: width },
          minWidth: "300px",
          maxWidth: "600px",
          height: "auto",
          borderRadius: 2,
          backgroundColor: "#1d2125",
        }}
      >
        <Box
          className="flex space-between align-center"
          sx={{ display: "flex", gap: 2, p: 1.5 }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Avatar
              sx={{
                bgcolor: "primary.main",
                width: 40,
                height: 40,
              }}
            >
              {getInitial()}
            </Avatar>
          </Box>

          <Box sx={{ flex: 1 }}>
            <TextField
              fullWidth
              value={post}
              onChange={onChange}
              onFocus={onFocus}
              placeholder="Start a post...."
              multiline={isExpanded}
              rows={isExpanded ? 3 : 1}
              variant="outlined"
              sx={{
                "& .MuiInputBase-input": {
                  color: "white",
                },
                "& .MuiInputLabel-root": {
                  color: "white",
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "white",
                    borderRadius: 3.5,
                  },
                  "&:hover fieldset": {
                    borderColor: "white",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "white",
                  },
                },
              }}
            />

            {isExpanded && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mt: 2,
                }}
              >
                <Box sx={{ display: "flex", gap: 1 }}>
                  <IconButton
                    size="small"
                    sx={{
                      color: "primary.main",
                    }}
                  >
                    <ImageIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    size="small"
                    sx={{
                      color: "warning.main",
                    }}
                  >
                    <EmojiIcon fontSize="small" />
                  </IconButton>
                </Box>

                <Button
                  variant="contained"
                  color="primary"
                  onClick={handlePost}
                  disabled={!post.trim()}
                  sx={{
                    borderRadius: "24px",
                    px: 3,
                    "&.Mui-disabled": {
                      backgroundColor: "#404040",
                      color: "rgba(255, 255, 255, 0.3)",
                    },
                  }}
                >
                  Post
                </Button>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default PostCard;
