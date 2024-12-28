import { AppDispatch } from "../../redux/store";
import { requestApi } from "./request";
import {
  Experience,
  dispatchFetch,
  getStoredRole,
  getStoredRoleId,
} from "./globalUtils";

const role = getStoredRole();
const roleId = getStoredRoleId();

export const addExperience = async (
  experience: Omit<Experience, "id">,
  dispatch: AppDispatch,
  user_id: number
) => {
  try {
    if (!role || !["Athlete", "Coach"].includes(role)) {
      throw new Error("Invalid or missing user role");
    }

    const endpoint = `/${role.toLowerCase()}/addExperienceCertification/${user_id}`;
    await requestApi(endpoint, "POST", experience);
    await dispatchFetch(role, roleId!, dispatch);
  } catch (error) {
    console.error("Error adding experience:", error);
    throw error;
  }
};
