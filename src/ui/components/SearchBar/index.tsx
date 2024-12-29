import { FC, useState } from "react";
import {
  InputBase,
  Popover,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";

import { useNavigate } from "react-router-dom";
import { UserDetails } from "../../../core/utils/globalUtils";
import { fetchSearchResults } from "../../../core/utils/fetchDetails";

interface SearchProps {
  currentUserId: number | null | undefined;
}

const Search: FC<SearchProps> = ({ currentUserId }) => {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<UserDetails[]>([]);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearchChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setSearchTerm(value);

    if (event.currentTarget.parentElement) {
      setAnchorEl(event.currentTarget.parentElement);
    }

    if (!currentUserId || value.trim().length < 2) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    const results = await fetchSearchResults(currentUserId, value);
    setSearchResults(results);
    setIsSearching(false);
  };

  const handleSearchResultClick = (userId: number, role: string) => {
    setSearchResults([]);
    setSearchTerm("");
    setAnchorEl(null);
    navigate(`/view/${userId}/${role}`);
  };

  const handleCloseResults = () => {
    setAnchorEl(null);
    setSearchResults([]);
  };

  return (
    <div className="search">
      <div className="search-icon-wrapper">
        <SearchIcon className="search-icon" />
      </div>
      <InputBase
        className="search-input"
        placeholder="Search…"
        value={searchTerm}
        onChange={handleSearchChange}
        inputProps={{ "aria-label": "search" }}
      />
      <Popover
        open={Boolean(anchorEl) && searchResults.length > 0}
        anchorEl={anchorEl}
        onClose={handleCloseResults}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        sx={{
          "& .MuiPopover-paper": {
            width: anchorEl?.offsetWidth,
            maxHeight: "300px",
            bgcolor: "background.paper",
          },
        }}
      >
        <List sx={{ bgcolor: "#1d2125", color: "white" }}>
          {isSearching ? (
            <ListItem>
              <ListItemText primary="Searching..." />
            </ListItem>
          ) : (
            searchResults.map((user) => (
              <ListItem
                key={user.id}
                component="div"
                onClick={() => handleSearchResultClick(user.id, user.role)}
                sx={{
                  cursor: "pointer",
                  "&:hover": {
                    bgcolor: "rgba(255, 255, 255, 0.1)",
                  },
                }}
              >
                <ListItemAvatar>
                  <Avatar src={user.avatar}>
                    {!user.avatar && user.name.charAt(0)}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={user.name}
                  secondaryTypographyProps={{
                    sx: { color: "rgba(255, 255, 255, 0.7)" },
                  }}
                />
              </ListItem>
            ))
          )}
        </List>
      </Popover>
    </div>
  );
};

export default Search;
