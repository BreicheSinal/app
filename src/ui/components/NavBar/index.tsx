import { FC, useState, MouseEvent } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Badge,
  Typography,
  Button,
} from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import ChatIcon from "@mui/icons-material/Chat";
import NoteEvent from "@mui/icons-material/EventNote";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MoreIcon from "@mui/icons-material/MoreVert";

import SearchBar from "../SearchBar";
import { getStoredRole, createSetters } from "../../../core/utils/globalUtils";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

import { useNavigate } from "react-router-dom";

import "./style.css";

const NavBar: FC = () => {
  const navigate = useNavigate();

  const role = getStoredRole();
  createSetters(role!);

  const currentUserId = useSelector((state: RootState) => {
    switch (role) {
      case "Athlete":
        return state.athlete.details?.user_id;
      case "Coach":
        return state.coach.details?.user_id;
      case "Club":
        return state.club.details?.user_id;
      case "Federation":
        return state.federation.details?.user_id;
      default:
        return null;
    }
  });

  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    useState<null | HTMLElement>(null);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event: MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const goTo = (path: string) => navigate(path);

  const goToConnections = () => goTo("/");
  const goToMessaging = () => goTo("/");
  const goToTryOuts = () => goTo("/");
  const goToProfile = () => goTo("/profile");
  const goToFeed = () => goTo("/feed");

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
      <MenuItem onClick={goToProfile}>
        <IconButton
          disableRipple
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
          onClick={goToProfile}
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
      <MenuItem onClick={goToConnections}>
        <IconButton
          size="large"
          aria-label="show 4 new mails"
          color="inherit"
          onClick={goToConnections}
        >
          <PeopleIcon />
        </IconButton>
        <p>Connections</p>
      </MenuItem>
      <MenuItem onClick={goToMessaging}>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
          onClick={goToMessaging}
        >
          <Badge badgeContent={17} color="error">
            <ChatIcon />
          </Badge>
        </IconButton>
        <p>Messaging</p>
      </MenuItem>
      <MenuItem onClick={goToTryOuts}>
        <IconButton size="large" color="inherit" onClick={goToTryOuts}>
          <NoteEvent />
        </IconButton>
        <p>Try-Outs</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" className="app-bar">
        <Toolbar>
          <IconButton
            disableRipple
            size="large"
            edge="start"
            aria-label="open drawer"
            className="icon-button"
            onClick={goToFeed}
          >
            <img
              src="../../../../src/assets/icons/AthLink_noBG1.png"
              alt="Logo"
              className="logo"
            />
          </IconButton>

          <SearchBar currentUserId={currentUserId} />

          <Box sx={{ flexGrow: 1 }} />
          <Box
            className="icons-container"
            sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}
          >
            <Box className="icon-container">
              <Button className="button" onClick={goToConnections}>
                <Typography className="icon-text">Connections</Typography>
              </Button>
            </Box>
            <Box className="icon-container">
              <Button className="button" onClick={goToMessaging}>
                <Typography className="icon-text">Messaging</Typography>
              </Button>
            </Box>
            <Box className="icon-container">
              <Button className="button" onClick={goToTryOuts}>
                <Typography className="icon-text">Try-Outs</Typography>
              </Button>
            </Box>
            <Box className="icon-container">
              <IconButton
                disableRipple
                size="large"
                aria-label="account of current user"
                aria-haspopup="true"
                className="icon-button"
                sx={{ color: "white" }}
                onClick={goToProfile}
              >
                <AccountCircle sx={{ fontSize: 35 }} />
              </IconButton>
            </Box>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              disableRipple
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
};

export default NavBar;
