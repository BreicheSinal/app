import { FC } from "react";
import { TextField, Avatar, Box } from "@mui/material";

interface PostCardProps {
  width: number;
}

const PostCard: FC<PostCardProps> = ({ width = 600 }) => {
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
          padding: 2,
          backgroundColor: "#1d2125",
        }}
      >
        <Box
          className="flex space-between align-center"
          sx={{ display: "flex", gap: 2 }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Avatar
              sx={{
                bgcolor: "primary.main",
                width: 40,
                height: 40,
              }}
            >
              U
            </Avatar>
          </Box>

          <Box sx={{ flex: 1 }}>
            <TextField
              fullWidth
              onChange={change}
              onFocus={focus}
              placeholder="Start a post...."
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
                    borderRadius: 5,
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
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default PostCard;
