import { dispatchFetch } from "./globalUtils";
import { NavigateFunction } from "react-router-dom";
import store, { AppDispatch } from "../../redux/store";

export const initializeUserData = (
  navigate: NavigateFunction,
  dispatch: AppDispatch
) => {
  const state = store.getState();
  const { role, roleId } = state.auth;

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
