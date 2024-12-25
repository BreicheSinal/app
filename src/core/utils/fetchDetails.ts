import { requestApi } from "./request";

import { setAthleteDetails } from "../../redux/users/athleteSlice";
import { setCoachDetails } from "../../redux/users/coachSlice";

import { AppDispatch } from "../../redux/store";

export const fetchAthleteDetails =
  (id: number) => async (dispatch: AppDispatch) => {
    try {
      const response = await requestApi(`/athlete/${id}`);
      const athleteData = response.athlete[0];

      const parsedAthleteDetails = {
        id: parseInt(athleteData.id, 10),
        user_id: parseInt(athleteData.user.id, 10),
        name: athleteData.user.name,
        bio: athleteData.user.bio,
        role: "Athlete",
        club_id: athleteData.club.id,
        club: athleteData.club.user.name,
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

export const fetchCoachDetails =
  (id: number) => async (dispatch: AppDispatch) => {
    try {
      const response = await requestApi(`/coach/${id}`);
      const coachData = response.coach[0];

      const parsedCoachDetails = {
        id: parseInt(coachData.id, 10),
        user_id: parseInt(coachData.user.id, 10),
        name: coachData.user.name,
        bio: coachData.user.bio,
        role: "Coach",
        club_id: coachData.club,
        club: coachData.club.user.name,
        specialty: coachData.specialty,
      };

      dispatch(setCoachDetails(parsedCoachDetails));
    } catch (error) {
      console.error("Error fetching coach details:", error);
      throw error;
    }
  };
