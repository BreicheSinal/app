import { AppDispatch } from "../../redux/store";
import { requestApi } from "./request";
import { fetchAthleteDetails, fetchCoachDetails } from "./fetchDetails";

import { Experience } from "./interfaces";

export const addExperience = async (
  experience: Experience,
  dispatch: AppDispatch,
  user_id: number,
  id: number
) => {
  try {
    const role = localStorage.getItem("role");
    if (!role) throw new Error("User role or ID missing");

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
