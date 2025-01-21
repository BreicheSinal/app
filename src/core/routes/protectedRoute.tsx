import { FC, useEffect, useState, useCallback } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import { initializeUserData } from "../utils/initialize";
import { ValidRoleType } from "../utils/globalUtils";
import { CircularProgress } from "@mui/material";
import { fetchTryOuts } from "../utils/fetchDetails";
import { setAuthState, setInitialized } from "../../redux/users/authSlice";

const ProtectedRoute: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);

  const { role, roleId, isInitialized } = useSelector(
    (state: RootState) => state.auth
  );

  const details = useSelector((state: RootState) =>
    role === "Athlete"
      ? state.athlete.details
      : role === "Coach"
      ? state.coach.details
      : role === "Club"
      ? state.club.details
      : state.federation.details
  );

  const initializeAuth = useCallback(async () => {
    try {
      const token = localStorage.getItem("authToken");
      const storedRole = localStorage.getItem("role") as ValidRoleType;
      const storedRoleId = localStorage.getItem("specificRoleId");

      if (!token) {
        throw new Error("No auth token found");
      }

      if (storedRole && storedRoleId) {
        dispatch(
          setAuthState({
            role: storedRole,
            roleId: parseInt(storedRoleId),
          })
        );
      }

      if (!details) {
        await fetchTryOuts(dispatch);
        await initializeUserData(navigate, dispatch);
      }

      dispatch(setInitialized(true));
    } catch (error) {
      console.error("Initialization error:", error);
      localStorage.clear();
      navigate("/login");
    } finally {
      setIsLoading(false);
    }
  }, [dispatch, navigate, details]);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (
        event.key === "role" ||
        event.key === "specificRoleId" ||
        event.key === "authToken"
      ) {
        initializeAuth();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [initializeAuth]);

  if (isLoading || !isInitialized) {
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

  if (!role || !roleId) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
