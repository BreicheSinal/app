import { requestApi } from "./request";

import { setAthleteDetails } from "../../redux/users/athleteSlice";
import { AppDispatch } from "../../redux/store";

export const fetchAthleteDetails =
  (id: number) => async (dispatch: AppDispatch) => {
    try {
      const response = await requestApi(`/athlete/${id}`);
      const athleteData = response.data.athlete[0];

      const parsedAthleteDetails = {
        id: parseInt(athleteData.id, 10),
        user_id: parseInt(athleteData.user.id, 10),
        name: athleteData.user.name,
        bio: athleteData.user.bio,
        role: "Athlete",
        club_id: athleteData.club,
        position: athleteData.position,
        age: athleteData.age,
        height: parseFloat(athleteData.height),
        weight: parseFloat(athleteData.weight),
      };

      dispatch(setAthleteDetails(parsedAthleteDetails));
    } catch (error) {
      console.error("Error fetching athlete details:", error);
      throw error;
    }
  };
