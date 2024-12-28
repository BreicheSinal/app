import { FC, useEffect, useState, useCallback } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import { initializeUserData } from "../utils/initialize";
import { getStoredRole } from "../utils/globalUtils";
import { CircularProgress } from "@mui/material";

const ProtectedRoute: FC = () => {
  const token = localStorage.getItem("authToken");

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  
  const [isInitialized, setIsInitialized] = useState(false);

  const role = getStoredRole();
  const details = useSelector((state: RootState) =>
    role === "Athlete"
      ? state.athlete.details
      : role === "Coach"
      ? state.coach.details
      : role === "Club"
      ? state.club.details
      : state.federation.details
  );

  const initialize = useCallback(async () => {
    if (!details) {
      await initializeUserData(navigate, dispatch);
    }
    setIsInitialized(true);
  }, [details, navigate, dispatch]);

  useEffect(() => {
    if (token) {
      initialize();
    }
  }, [token, initialize]);

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (!isInitialized) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;
