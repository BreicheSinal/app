import { AppDispatch } from "../../redux/store";

import { fetchUserDetails } from "./fetchDetails";

import {
  setAthleteDetails,
  setAthleteError,
  setAthleteLoading,
} from "../../redux/users/athleteSlice";
import {
  setCoachDetails,
  setCoachError,
  setCoachLoading,
} from "../../redux/users/coachSlice";
import {
  setClubDetails,
  setClubError,
  setClubLoading,
} from "../../redux/users/clubSlice";
import {
  setFederationDetails,
  setFederationError,
  setFederationLoading,
} from "../../redux/users/federationSlice";

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
  experiences: Experience[] | null;
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
  if (!["Athlete", "Coach", "Club", "Federation"].includes(role)) {
    throw new Error("Invalid role");
  }
  return dispatch(fetchUserDetails(role, id));
};

export const getStoredRole = () => localStorage.getItem("role");
export const getStoredRoleId = () => {
  const id = localStorage.getItem("specificRoleId");
  return id ? parseInt(id) : null;
};

export const createSetters = (role: string) => {
  const setterMap = {
    Athlete: {
      setLoading: setAthleteLoading,
      setError: setAthleteError,
      setDetails: setAthleteDetails,
    },
    Coach: {
      setLoading: setCoachLoading,
      setError: setCoachError,
      setDetails: setCoachDetails,
    },
    Club: {
      setLoading: setClubLoading,
      setError: setClubError,
      setDetails: setClubDetails,
    },
    Federation: {
      setLoading: setFederationLoading,
      setError: setFederationError,
      setDetails: setFederationDetails,
    },
  };

  const setters = setterMap[role as keyof typeof setterMap];
  if (!setters) throw new Error("Invalid role");
  return setters;
};
