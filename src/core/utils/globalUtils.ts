import { AppDispatch, RootState } from "../../redux/store";
import { createSelector } from "@reduxjs/toolkit";

import { fetchUserDetails } from "./fetchDetails";

import {
  addAthletePost,
  setAthleteDetails,
  setAthleteError,
  setAthleteLoading,
} from "../../redux/users/athleteSlice";
import {
  addCoachPost,
  setCoachDetails,
  setCoachError,
  setCoachLoading,
} from "../../redux/users/coachSlice";
import {
  addClubPost,
  setClubDetails,
  setClubError,
  setClubLoading,
} from "../../redux/users/clubSlice";
import {
  addFederationPost,
  setFederationDetails,
  setFederationError,
  setFederationLoading,
} from "../../redux/users/federationSlice";
import { Trophy } from "../../ui/components/Trophy/MyTrophies";

export interface AthleteTryOut {
  id: number;
  status: string;
  trId: number;
  name: string;
  date: string;
  description: string;
  meetingUrl: string;
  club_id: number;
  club_name: string;
  club_user_id: number;
}

export interface Post {
  user_id: number;
  user_name: string;
  id: number;
  description: string;
  likes_count: number;
  comments_count: number;
  images?: string[];
}

export interface BaseUserDetails {
  id: number;
  user_id: number;
  avatar?: string;
  name: string;
  bio: string | null;
  role: ValidRoleType;
}

export interface AthleteDetails extends BaseUserDetails {
  club_id: number | null;
  club: string | null;
  position: string | null;
  age: number | null;
  height: number | null;
  weight: number | null;
  experiences: Experience[] | null;
  tryOuts: AthleteTryOut[] | null;
  posts: Post[] | null;
  trophies: Trophy[] | null;
}

export interface CoachDetails extends BaseUserDetails {
  club_id: number | null;
  club: string | null;
  specialty: string | null;
  experiences: Experience[] | null;
  certificates: Certificate[] | null;
  posts: Post[] | null;
}

export interface ClubDetails extends BaseUserDetails {
  federation_id: number | null;
  federation: string | null;
  location: string | null;
  founded_year: number | null;
  tryouts: Tryout[];
  posts: Post[] | null;
}

export interface FederationDetails extends BaseUserDetails {
  location: string | null;
  country: string | null;
  founded_year: number | null;
  posts: Post[] | null;
  trophies: Trophy[] | null;
}

export type UserDetails =
  | AthleteDetails
  | CoachDetails
  | ClubDetails
  | FederationDetails;

export type ValidRoleType = "Athlete" | "Coach" | "Club" | "Federation";

export interface Experience {
  id: number;
  name: string;
  date: string;
  type: string;
  description: string;
}

export type ExperienceFormData = Omit<Experience, "id">;

export interface Certificate {
  id: number;
  name: string;
  date: string;
  type: string;
  description: string;
}

export type CertificateFormData = Omit<Certificate, "id">;

export interface Tryout {
  id: number;
  name: string;
  date: string;
  description: string;
  meetingUrl: string;
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
  role: ValidRoleType,
  id: number,
  dispatch: AppDispatch
) => {
  if (!["Athlete", "Coach", "Club", "Federation"].includes(role)) {
    throw new Error("Invalid role");
  }
  return dispatch(fetchUserDetails(role, id));
};

type SetterMap = {
  Athlete: {
    setLoading: typeof setAthleteLoading;
    setError: typeof setAthleteError;
    setDetails: (
      details: AthleteDetails
    ) => ReturnType<typeof setAthleteDetails>;
    addPost: (post: Post) => ReturnType<typeof addAthletePost>;
  };
  Coach: {
    setLoading: typeof setCoachLoading;
    setError: typeof setCoachError;
    setDetails: (details: CoachDetails) => ReturnType<typeof setCoachDetails>;
    addPost: (post: Post) => ReturnType<typeof addCoachPost>;
  };
  Club: {
    setLoading: typeof setClubLoading;
    setError: typeof setClubError;
    setDetails: (details: ClubDetails) => ReturnType<typeof setClubDetails>;
    addPost: (post: Post) => ReturnType<typeof addClubPost>;
  };
  Federation: {
    setLoading: typeof setFederationLoading;
    setError: typeof setFederationError;
    setDetails: (
      details: FederationDetails
    ) => ReturnType<typeof setFederationDetails>;
    addPost: (post: Post) => ReturnType<typeof addFederationPost>;
  };
};

export const createSetters = (
  role: ValidRoleType
): SetterMap[ValidRoleType] => {
  const setterMap: SetterMap = {
    Athlete: {
      setLoading: setAthleteLoading,
      setError: setAthleteError,
      setDetails: (details: AthleteDetails) => setAthleteDetails(details),
      addPost: (post: Post) => addAthletePost(post),
    },
    Coach: {
      setLoading: setCoachLoading,
      setError: setCoachError,
      setDetails: (details: CoachDetails) => setCoachDetails(details),
      addPost: (post: Post) => addCoachPost(post),
    },
    Club: {
      setLoading: setClubLoading,
      setError: setClubError,
      setDetails: (details: ClubDetails) => setClubDetails(details),
      addPost: (post: Post) => addClubPost(post),
    },
    Federation: {
      setLoading: setFederationLoading,
      setError: setFederationError,
      setDetails: (details: FederationDetails) => setFederationDetails(details),
      addPost: (post: Post) => addFederationPost(post),
    },
  };

  const setters = setterMap[role];
  if (!setters) throw new Error("Invalid role");
  return setters;
};

export const selectAthleteTryoutIds = createSelector(
  (state: RootState) => state.athlete.details?.tryOuts,
  (tryouts) => tryouts?.map((tryout) => Number(tryout.trId)) || []
);
