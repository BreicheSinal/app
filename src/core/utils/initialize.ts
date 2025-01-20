import { dispatchFetch, getStoredRole, getStoredRoleId } from "./globalUtils";
import { NavigateFunction } from "react-router-dom";
import { AppDispatch } from "../../redux/store";

export const initializeUserData = (
  navigate: NavigateFunction,
  dispatch: AppDispatch
) => {
  const role = getStoredRole();
  const roleId = getStoredRoleId();

  if (!role || !roleId) {
    navigate("/login");
    return;
  }

  try {
    const id = roleId;
    return dispatchFetch(role, id, dispatch);
  } catch (error) {
    console.error("Error fetching user details:", error);
    navigate("/login");
  }
};
