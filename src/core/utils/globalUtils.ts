import {
  fetchAthleteDetails,
  fetchCoachDetails,
  fetchClubDetails,
  fetchFederationDetails,
} from "./fetchDetails";

import { AppDispatch } from "../../redux/store";

export interface Experience {
  id: number;
  name: string;
  date: string;
  type: string;
  description: string;
}

export interface Club {
  id: number;
  user: {
    name: string;
  };
}

export interface ClubOption {
  id: number;
  name: string;
}

export const dispatchFetch = (
  role: string,
  id: number,
  dispatch: AppDispatch
) => {
  const actions = {
    Athlete: fetchAthleteDetails,
    Coach: fetchCoachDetails,
    Club: fetchClubDetails,
    Federation: fetchFederationDetails,
  };

  const action = actions[role as keyof typeof actions];
  if (!action) throw new Error("Invalid role");
  return dispatch(action(id));
};

export const getStoredRole = () => localStorage.getItem("role");
export const getStoredRoleId = () => {
  const id = localStorage.getItem("specificRoleId");
  return id ? parseInt(id) : null;
};
