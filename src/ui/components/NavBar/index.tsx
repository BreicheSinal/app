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
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import { Trophy } from "lucide-react";
import { Edit3 } from "lucide-react";

import SearchBar from "../SearchBar";
import { createSetters } from "../../../core/utils/globalUtils";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";

import { resetAthleteState } from "../../../redux/users/athleteSlice";
import { resetCoachState } from "../../../redux/users/coachSlice";
import { resetClubState } from "../../../redux/users/clubSlice";
import { resetFederationState } from "../../../redux/users/federationSlice";
import store, { resetAllState, RootState } from "../../../redux/store";

import "./style.css";

const NavBar: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const state = store.getState();
  const { role } = state.auth;
  createSetters(role!);

  const [profileAnchorEl, setProfileAnchorEl] = useState<null | HTMLElement>(
    null
  );
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    useState<null | HTMLElement>(null);

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

  const isProfileMenuOpen = Boolean(profileAnchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: MouseEvent<HTMLElement>) => {
    setProfileAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setProfileAnchorEl(null);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event: MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const goTo = (path: string) => navigate(path);

  const goToNoteEditor = () => goTo("/editor");
  const goToApprovals = () => goTo("/approvals");
  const goToViewTryOuts = () => goTo("/view/tryouts");
  const goToConnections = () => goTo("/connections");
  const goToMessaging = () => goTo("/messaging");
  const goToTryOuts = () => goTo("/tryouts");
  const goToProfile = () => {
    handleProfileMenuClose();
    goTo("/profile");
  };
  const goToTrophies = () => goTo("/trophies");
  const goToLogin = () => goTo("/login");

  const handleLogout = () => {
    switch (role) {
      case "Athlete":
        dispatch(resetAthleteState());
        break;
      case "Coach":
        dispatch(resetCoachState());
        break;
      case "Club":
        dispatch(resetClubState());
        break;
      case "Federation":
        dispatch(resetFederationState());
        break;
    }

    dispatch(resetAllState());

    localStorage.clear();

    handleProfileMenuClose();
    goToLogin();
  };

  const menuId = "primary-profile-menu";
  const renderProfileMenu = (
    <Menu
      anchorEl={profileAnchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isProfileMenuOpen}
      onClose={handleProfileMenuClose}
      PaperProps={{
        sx: {
          bgcolor: "#1D2125",
          color: "white",
          "& .MuiMenuItem-root": {
            "&:hover": {
              bgcolor: "grey",
            },
          },
        },
      }}
    >
      <MenuItem onClick={goToProfile} sx={{ gap: 1.5 }}>
        <PersonIcon fontSize="small" />
        Profile
      </MenuItem>
      {role == "Athlete" && (
        <MenuItem onClick={goToTrophies} sx={{ gap: 1.5 }}>
          <Trophy size={16} />
          Trophies
        </MenuItem>
      )}
      {role == "Club" && (
        <MenuItem onClick={goToNoteEditor} sx={{ gap: 1.5 }}>
          <Edit3 size={16} />
          Notes Editor
        </MenuItem>
      )}
      <MenuItem onClick={handleLogout} sx={{ gap: 1.5 }}>
        <LogoutIcon fontSize="small" />
        Log out
      </MenuItem>
    </Menu>
  );

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
      PaperProps={{
        sx: {
          bgcolor: "#1D2125",
          color: "white",
          "& .MuiMenuItem-root": {
            fontSize: "0.875rem",
            "&:hover": {
              bgcolor: "grey",
            },
            "& p": {
              fontSize: "0.875rem",
              margin: 0,
            },
          },
        },
      }}
    >
      <MenuItem onClick={goToProfile} sx={{ gap: 1 }}>
        <IconButton
          disableRipple
          size="small"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
          onClick={goToProfile}
        >
          <AccountCircle fontSize="small" />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
      <MenuItem onClick={goToConnections} sx={{ gap: 1 }}>
        <IconButton size="small" color="inherit" onClick={goToConnections}>
          <PeopleIcon fontSize="small" />
        </IconButton>
        <p>Connections</p>
      </MenuItem>
      <MenuItem onClick={goToMessaging} sx={{ gap: 1 }}>
        <IconButton
          size="small"
          aria-label="show 17 new notifications"
          color="inherit"
          onClick={goToMessaging}
        >
          <Badge color="error">
            <ChatIcon fontSize="small" />
          </Badge>
        </IconButton>
        <p>Messaging</p>
      </MenuItem>
      {role == "Club" && (
        <MenuItem onClick={goToTryOuts} sx={{ gap: 1 }}>
          <IconButton size="small" color="inherit" onClick={goToTryOuts}>
            <NoteEvent />
          </IconButton>
          <p>Try-Outs</p>
        </MenuItem>
      )}
      {role == "Athlete" && (
        <MenuItem onClick={goToViewTryOuts} sx={{ gap: 1 }}>
          <IconButton size="small" color="inherit" onClick={goToViewTryOuts}>
            <NoteEvent />
          </IconButton>
          <p>Try-Outs</p>
        </MenuItem>
      )}
      {role == "Club" && (
        <MenuItem onClick={goToNoteEditor} sx={{ gap: 1 }}>
          <IconButton size="small" color="inherit" onClick={goToNoteEditor}>
            <Edit3 size={20} />
          </IconButton>
          <p>Notes Editor</p>
        </MenuItem>
      )}
      {role == "Athlete" && (
        <MenuItem onClick={goToTrophies} sx={{ gap: 1 }}>
          <IconButton size="small" color="inherit" onClick={goToTrophies}>
            <Trophy size={20} />
          </IconButton>
          <p>Trophies</p>
        </MenuItem>
      )}
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
            onClick={() => {
              if (role === "Club") {
                goToNoteEditor();
              } else {
                goToProfile();
              }
            }}
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
            {(role === "Club" ||
              role === "Athlete" ||
              role === "Federation") && (
              <Box className="icon-container">
                {role === "Club" && (
                  <Button className="button" onClick={goToTryOuts}>
                    <Typography className="icon-text">Try-Outs</Typography>
                  </Button>
                )}

                {role === "Athlete" && (
                  <Button className="button" onClick={goToViewTryOuts}>
                    <Typography className="icon-text">Try-Outs</Typography>
                  </Button>
                )}

                {role === "Federation" && (
                  <Button className="button" onClick={goToApprovals}>
                    <Typography className="icon-text">Approvals</Typography>
                  </Button>
                )}
              </Box>
            )}
            <Box className="icon-container">
              <IconButton
                disableRipple
                size="large"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                className="icon-button"
                sx={{ color: "white" }}
                onClick={handleProfileMenuOpen}
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
              color="inherit"
            >
              <MoreIcon className="more-icon" />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderProfileMenu}
    </Box>
  );
};

export default NavBar;
