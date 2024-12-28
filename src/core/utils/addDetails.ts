import { AppDispatch } from "../../redux/store";
import { requestApi } from "./request";
import { fetchAthleteDetails, fetchCoachDetails } from "./fetchDetails";

import { Experience, getStoredRole } from "./globalUtils";

export const addExperience = async (
  experience: Omit<Experience, "id">,
  dispatch: AppDispatch,
  user_id: number,
  id: number
) => {
  try {
    const role = getStoredRole();
    if (!role) throw new Error("User role missing");

    const endpoint =
      role === "Athlete"
        ? `/athlete/addExperienceCertification/${user_id}`
        : `/coach/addExperienceCertification/${user_id}`;

    await requestApi(endpoint, "POST", experience);

    switch (role) {
      case "Athlete":
        dispatch(fetchAthleteDetails(id));
        break;
      case "Coach":
        dispatch(fetchCoachDetails(id));
        break;
      default:
        throw new Error("Invalid role");
    }
  } catch (error) {
    console.error("Error adding experience:", error);
    throw error;
  }
};
