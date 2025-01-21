import store, { AppDispatch } from "../../redux/store";
import { requestApi } from "./request";
import { Certificate, Experience, dispatchFetch } from "./globalUtils";
import { addApplication } from "../../redux/users/athleteSlice";

const state = store.getState();
const { role, roleId } = state.auth;

export const addExperience = async (
  experience: Omit<Experience, "id">,
  dispatch: AppDispatch,
  user_id: number
) => {
  try {
    if (!role || !["Athlete", "Coach"].includes(role)) {
      throw new Error("Invalid or missing user role");
    }

    const endpoint = `/user/addExpCert/${user_id}`;
    await requestApi(endpoint, "POST", experience);
    await dispatchFetch(role, roleId!, dispatch);
  } catch (error) {
    console.error("Error adding experience:", error);
    throw error;
  }
};

export const addCert = async (
  certificate: Omit<Certificate, "id">,
  dispatch: AppDispatch,
  user_id: number
) => {
  try {
    if (!role || !["Coach"].includes(role)) {
      throw new Error("Invalid or missing user role");
    }

    const endpoint = `/user/addExpCert/${user_id}`;
    await requestApi(endpoint, "POST", certificate);
    await dispatchFetch(role, roleId!, dispatch);
  } catch (error) {
    console.error("Error adding certification:", error);
    throw error;
  }
};

export const createConnectionRequest = async (
  connectedUserId: number,
  userId: number
) => {
  try {
    if (!connectedUserId || !userId) {
      throw new Error("Invalid or missing user IDs");
    }

    return requestApi(`/user/${connectedUserId}`, "POST", { userId });
  } catch (error) {
    console.error("Error creating connection:", error);
    throw error;
  }
};

export const applyToTryOut = async (
  dispatch: AppDispatch,
  athlete_id: number,
  try_out_id: number
) => {
  try {
    const url = "/athlete/tryout/apply";
    const data = {
      athlete_id,
      try_out_id,
      status: "pending",
    };

    const response = await requestApi(url, "POST", data);

    dispatch(addApplication(response.createdTryOut));

    return response;
  } catch (error) {
    console.error("Error applying to tryout:", error);
    throw error;
  }
};
