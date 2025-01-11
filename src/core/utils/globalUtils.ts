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
}

export interface CoachDetails extends BaseUserDetails {
  club_id: number | null;
  club: string | null;
  specialty: string | null;
  experiences: Experience[] | null;
  certificates: Certificate[] | null;
}

export interface ClubDetails extends BaseUserDetails {
  federation_id: number | null;
  federation: string | null;
  location: string | null;
  founded_year: number | null;
  tryouts: Tryout[];
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

export const getStoredRole = (): ValidRoleType => {
  const role = localStorage.getItem("role");

  return role as ValidRoleType;
};
export const getStoredRoleId = () => {
  const id = localStorage.getItem("specificRoleId");
  return id ? parseInt(id) : null;
};

type SetterMap = {
  Athlete: {
    setLoading: typeof setAthleteLoading;
    setError: typeof setAthleteError;
    setDetails: (
      details: AthleteDetails
    ) => ReturnType<typeof setAthleteDetails>;
  };
  Coach: {
    setLoading: typeof setCoachLoading;
    setError: typeof setCoachError;
    setDetails: (details: CoachDetails) => ReturnType<typeof setCoachDetails>;
  };
  Club: {
    setLoading: typeof setClubLoading;
    setError: typeof setClubError;
    setDetails: (details: ClubDetails) => ReturnType<typeof setClubDetails>;
  };
  Federation: {
    setLoading: typeof setFederationLoading;
    setError: typeof setFederationError;
    setDetails: (
      details: FederationDetails
    ) => ReturnType<typeof setFederationDetails>;
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
    },
    Coach: {
      setLoading: setCoachLoading,
      setError: setCoachError,
      setDetails: (details: CoachDetails) => setCoachDetails(details),
    },
    Club: {
      setLoading: setClubLoading,
      setError: setClubError,
      setDetails: (details: ClubDetails) => setClubDetails(details),
    },
    Federation: {
      setLoading: setFederationLoading,
      setError: setFederationError,
      setDetails: (details: FederationDetails) => setFederationDetails(details),
    },
  };

  const setters = setterMap[role];
  if (!setters) throw new Error("Invalid role");
  return setters;
};
