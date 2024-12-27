import { AppDispatch } from "../../redux/store";
import { requestApi } from "./request";
import {
  fetchAthleteDetails,
  fetchCoachDetails,
  fetchClubDetails,
  fetchFederationDetails,
} from "./fetchDetails";

import { Experience } from "../../redux/users/athleteSlice";

export const editExperience = async (
  experience: Experience,
  dispatch: AppDispatch,
  exp_id: number,
  id: number
) => {
  try {
    const role = localStorage.getItem("role");
    if (!role) throw new Error("User role or ID missing");

    console.log(exp_id);
    const endpoint =
      role === "Athlete"
        ? `/athlete/editExpCert/${exp_id}`
        : `/coach/editExpCert/${exp_id}`;

    console.log(experience);
    await requestApi(endpoint, "PUT", experience);

    switch (role) {
      case "Athlete":
        dispatch(fetchAthleteDetails(id));
        break;
      case "Coach":
        dispatch(fetchCoachDetails(id));
        break;
      case "Club":
        dispatch(fetchClubDetails(id));
        break;
      case "Federation":
        dispatch(fetchFederationDetails(id));
        break;
      default:
        throw new Error("Invalid role");
    }
  } catch (error) {
    console.error("Error editing experience:", error);
    throw error;
  }
};
