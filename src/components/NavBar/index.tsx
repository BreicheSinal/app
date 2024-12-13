import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import PeopleIcon from "@mui/icons-material/People";
import ChatIcon from "@mui/icons-material/Chat";
import MoreIcon from "@mui/icons-material/MoreVert";
import NoteEvent from "@mui/icons-material/EventNote";
import Typography from "@mui/material/Typography";

import "./style.css";

export default function PrimarySearchAppBar() {
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <PeopleIcon />
        </IconButton>
        <p>Connections</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <ChatIcon />
          </Badge>
        </IconButton>
        <p>Messaging</p>
      </MenuItem>
      <MenuItem>
        <IconButton size="large" color="inherit">
          <NoteEvent />
        </IconButton>
        <p>Try-Outs</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" className="app-bar">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            aria-label="open drawer"
            className="icon-button"
          >
            <img
              src="src/assets/icons/AthLink_NoText.png"
              alt="Logo"
              className="logo"
            />
          </IconButton>
          <div className="search">
            <div className="search-icon-wrapper">
              <SearchIcon className="search-icon" />
            </div>
            <InputBase
              className="search-input"
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </div>
          <Box sx={{ flexGrow: 1 }} />
          <Box
            className="icons-container"
            sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}
          >
            <Box className="icon-container">
              <IconButton size="large" className="icon-button">
                <PeopleIcon />
              </IconButton>
              <Typography className="icon-text">Connections</Typography>
            </Box>
            <Box className="icon-container">
              <IconButton
                size="large"
                aria-label="show 17 new notifications"
                className="icon-button"
              >
                <Badge badgeContent={17} color="error">
                  <ChatIcon />
                </Badge>
              </IconButton>
              <Typography className="icon-text">Messaging</Typography>
            </Box>
            <Box className="icon-container">
              <IconButton size="large" className="icon-button">
                <NoteEvent />
              </IconButton>
              <Typography className="icon-text">Try-Outs</Typography>
            </Box>
            <Box className="icon-container">
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-haspopup="true"
                className="icon-button"
              >
                <AccountCircle />
              </IconButton>
              <Typography className="icon-text">Profile</Typography>
            </Box>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              className="icon-button"
            >
              <MoreIcon className="more-icon" />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </Box>
  );
}
