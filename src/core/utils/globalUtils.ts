import {
  fetchAthleteDetails,
  fetchCoachDetails,
  fetchClubDetails,
  fetchFederationDetails,
} from "./fetchDetails";

import { AppDispatch } from "../../redux/store";

export interface BaseUserDetails {
  id: number;
  user_id: number;
  name: string;
  bio: string | null;
  role: string;
}

export interface AthleteDetails extends BaseUserDetails {
  club_id: number | null;
  club: string | null;
  position: string | null;
  age: number | null;
  height: number | null;
  weight: number | null;
  experiences: Experience[] | null;
}

export interface CoachDetails extends BaseUserDetails {
  club_id: number | null;
  club: string | null;
  specialty: string | null;
}

export interface ClubDetails extends BaseUserDetails {
  federation_id: number | null;
  federation: string | null;
  location: string | null;
  founded_year: number | null;
}

export interface FederationDetails extends BaseUserDetails {
  location: string | null;
  country: string | null;
  founded_year: number | null;
}

export type UserDetails =
  | AthleteDetails
  | CoachDetails
  | ClubDetails
  | FederationDetails;

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
