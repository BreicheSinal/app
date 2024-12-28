import { AppDispatch } from "../../redux/store";
import { requestApi } from "./request";
import { Experience, getStoredRole } from "./globalUtils";
import { fetchUserDetails } from "./fetchDetails";

export const addExperience = async (
  experience: Omit<Experience, "id">,
  dispatch: AppDispatch,
  user_id: number,
  id: number
) => {
  try {
    const role = getStoredRole();
    if (!role || !["Athlete", "Coach"].includes(role)) {
      throw new Error("Invalid or missing user role");
    }

    const endpoint = `/${role.toLowerCase()}/addExperienceCertification/${user_id}`;
    await requestApi(endpoint, "POST", experience);
    dispatch(fetchUserDetails(role, id));
  } catch (error) {
    console.error("Error adding experience:", error);
    throw error;
  }
};
